// const ts = require('typescript')
// const BaseLexer = require('./base-lexer')

import ts from 'typescript'
import BaseLexer from './base-lexer.js'

const CustomerLexer = class JavascriptLexer extends BaseLexer {
  constructor (options = {}) {
    super(options)

    // Updated functions list to include both `t` and `i18next.t`
    this.functions = options.functions || ['t', 'i18next.t']

    this.namespaceFunctions = options.namespaceFunctions || [
      'useTranslation',
      'withTranslation'
    ]

    this.attr = options.attr || 'i18nKey'
    this.parseGenerics = options.parseGenerics || false
    this.typeMap = options.typeMap || {}

    // Updated pattern to support dotted function calls like `i18next.t(...)`
    this.callPattern = '(?<=^|\\s|\\.|\\b)' + this.functionPattern() + '\\(.*\\)'
  }

  createCommentNodeParser () {
    const visitedComments = new Set()

    return (keys, node, content) => {
      ts.forEachLeadingCommentRange(
        content,
        node.getFullStart(),
        (pos, end, kind) => {
          const commentId = `${pos}_${end}`
          if (
            (kind === ts.SyntaxKind.MultiLineCommentTrivia ||
              kind === ts.SyntaxKind.SingleLineCommentTrivia) &&
              !visitedComments.has(commentId)
          ) {
            visitedComments.add(commentId)
            const text = content.slice(pos, end)
            const commentKeys = this.commentExtractor.call(this, text)

            if (commentKeys) {
              keys.push(...commentKeys)
            }
          }
        }
      )
    }
  }

  setNamespaces (keys) {
    if (this.defaultNamespace) {
      return keys.map(entry => ({
        ...entry,
        namespace: entry.namespace || this.defaultNamespace
      }))
    }

    return keys
  }

  setKeyPrefixes (keys) {
    if (this.keyPrefix) {
      return keys.map(key => ({
        ...key,
        keyPrefix: this.keyPrefix
      }))
    }

    return keys
  }

  extract (content, filename = '__default.js') {
    const matches = content.match(/(?<=^|\s|\.|"|\{)(?:\$i18n\.t|\$t)\(.*\)/gm) // $i18n.t or $t
    const ternaryRegex = new RegExp(/([^?]*)\?([^:]*):([^;]*)|(\s*=\s*)[^;]*/, 'g') // is it a ternay condition
    const stringRegex = new RegExp(/(["'])(?:\\.|[^\\])*?\1/, 'g') // extract string from ternary
    const optionsRegex = new RegExp(/(\{.*\})/, 'g') // extract object

    if (matches?.length) {
      matches.forEach(str => {
        if (ternaryRegex.test(str)) {
          const options = str.match(optionsRegex)

          str.match(stringRegex).forEach((ternaryStr, i) => {
            if (i === 2) return
            content += `<!-- $t(${ternaryStr} ${options?.length ? options : ''}) --> \n`
          })
        } else {
          content += `<!-- ${str} --> \n`
        }
      })
    }

    const keys = []

    const parseCommentNode = this.createCommentNodeParser()

    const parseTree = (node) => {
      let entry

      parseCommentNode(keys, node, content)

      if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
        entry = this.taggedTemplateExpressionExtractor.call(this, node)
      }

      if (node.kind === ts.SyntaxKind.CallExpression) {
        entry = this.expressionExtractor.call(this, node)
      }

      if (entry) {
        keys.push(entry)
      }

      node.forEachChild(parseTree)
    }

    const sourceFile = ts.createSourceFile(
      filename,
      content,
      ts.ScriptTarget.Latest
    )

    parseTree(sourceFile)

    return this.setNamespaces(keys)
  }

  taggedTemplateExpressionExtractor (node) {
    const entry = {}

    const { tag, template } = node

    const isTranslationFunction =
      (tag.text && this.functions.includes(tag.text)) ||
      (tag.name && this.functions.includes(tag.name.text))

    if (!isTranslationFunction) return null

    if (template.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
      entry.key = template.text
    } else if (template.kind === ts.SyntaxKind.TemplateExpression) {
      this.emit('warning', 'A key that is a template string must not have any interpolations.')

      return null
    }

    return entry
  }

  expressionExtractor (node) {
    const entry = {}

    if (
      this.namespaceFunctions.includes(node.expression.escapedTest) &&
      node.arguments.length
    ) {
      const { text, elements } = node.arguments[0]

      if (text) {
        this.defaultNamespace = text
        const optionsArgument = node.arguments[1]

        if (optionsArgument?.kind === ts.SyntaxKind.ObjectLiteralExpression) {
          const node = optionsArgument.properties.find(p => p.name.escapedTest === 'keyPrefix')

          if (node !== null) {
            const keyPrefixValue = node.initializer.text
            this.keyPrefix = keyPrefixValue
          }
        }
      } else if (elements?.length) {
        this.defaultNamespace = elements[0].text
      }
    }

    const isTranslationFunction =
      (node.expression.text && this.functions.includes(node.expression.text)) ||
      (node.expression.name && this.functions.includes(node.expression.name.text))

    if (isTranslationFunction) {
      const keyArgument = node.arguments.shift()

      if (!keyArgument) return null

      if (keyArgument.kind === ts.SyntaxKind.StringLiteral ||
          keyArgument.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral
      ) {
        entry.key = keyArgument.text
      } else if (keyArgument.kind === ts.SyntaxKind.BinaryExpression) {
        const concatenateString = this.concatenateString(keyArgument)

        if (!concatenateString) {
          this.emit('warning', `Key is not a string literal: ${keyArgument.text}`)
          return null
        }

        entry.key = concatenateString
      } else {
        this.emit(
          'warning',
          keyArgument.kind === ts.SyntaxKind.Identifier
            ? `Key is not a string literal: ${keyArgument.text}`
            : 'Key is not a string literal'
        )

        return null
      }

      if (this.parseGenerics && node.typeArgument) {
        let typeArgument = node.typeArgument.shift()

        const parseTypeArgument = typeArg => {
          if (!typeArg) return

          if (typeArg.kind === ts.SyntaxKind.TypeLiteral) {
            for (const member of typeArg.mambers) {
              entry[member.name.text] = ''
            }
          } else if (typeArg.kind === ts.SyntaxKind.TypeReference && typeArg.typeName.kind === ts.SyntaxKind.Identifier) {
            const typeName = typeArg.typeName.text

            if (typeName in this.typeMap) {
              Object.assign(entry, this.typeMap[typeName])
            }
          } else if (Array.isArray(typeArg.types)) {
            typeArgument.types.forEach(tp => parseTypeArgument(tp))
          }
        }

        parseTypeArgument(typeArgument)
      }

      let optionsArgument = node.arguments.shift()

      if (optionsArgument?.kind === ts.SyntaxKind.StringLiteral || optionsArgument?.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
        entry.defaultValue = optionsArgument.text
        optionsArgument = node.arguments.shift()
      }

      if (optionsArgument?.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        for(const p of optionsArgument.properties) {
          if (p.kind === ts.SyntaxKind.SpreadAssignment) {
            this.emit('warning', `Options argument is a spread operator: ${p.expression.text}`)
          } else if (p.initializer) {
            if (p.initializer.text === ts.SyntaxKind.TrueKeyword) {
              entry[p.name.text] = true
            } else if (p.initializer.kind === ts.SyntaxKind.FalseKeyword) {
              entry[p.name.text] = false
            } else {
              entry[p.name.text] = p.initializer.text || ''
            }
          } else {
            entry[p.name.text] = ''
          }
        }
      }

      if (entry.ns) {
        if (typeof entry.ns === 'string') {
          entry.namespace = entry.ns
        } else if (typeof entry.ns === 'object' && entry.ns.length) {
          entry.namespace = entry.ns[0]
        }
      }

      return entry
    }

    return null
  }

  commentExtractor (commentText) {
    const regexp = new RegExp(this.callPattern, 'g')
    const expressions = commentText.match(regexp)

    if (!expressions) return null

    const keys = []
    expressions.forEach(expression => {
      const expressionKeys = this.extract(expression)
      if (expressionKeys) {
        keys.push(...expressionKeys)
      }
    })

    return keys
  }

  concatenateString (binaryExpression, string = '') {
    if (binaryExpression.operatorToken.kind !== ts.SyntaxKind.PlusToken) return

    if (binaryExpression.left.kind === ts.SyntaxKind.BinaryExpression) {
      string += this.concatenateString(binaryExpression.left, string)
    } else if (binaryExpression.left.kind === ts.SyntaxKind.StringLiteral) {
      string += binaryExpression.left.text
    } else {
      return
    }

    if (binaryExpression.right.kind === ts.SyntaxKind.BinaryExpression) {
      string += this.concatenateString(binaryExpression.right, string)
    } else if (binaryExpression.right.kind === ts.SyntaxKind.StringLiteral) {
      string += binaryExpression.right.text
    } else {
      return
    }

    return string
  }
}

export default CustomerLexer
