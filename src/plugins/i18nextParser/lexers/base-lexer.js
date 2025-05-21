// const EventEmitter = require('events')
import EventEmitter from 'events'

const BaseLexer = class BaseLexer extends EventEmitter {
  constructor (options = {}) {
    super()

    this.keys = []
    this.functions = options.functions || ['t']
  }

  validateString (string) {
    const regex = new RegExp('^' + BaseLexer.stringPattern + '$', 'i')
    return regex.test(string)
  }

  functionPattern () {
    return '(?:' + this.functions.join('|').replace('.', '\\.') + ')'
  }

  static get singleQuotePattern () {
    return "'(?:[^'].*?[^\\\\])?"
  }

  static get doubleQuotePattern () {
    return '"(?:[^"].*?[^\\\\])?'
  }

  static get backQuotePattern () {
    return '`(?:[^`].*?[^\\\\])?'
  }

  static get variablePattern () {
    return (
      '(?:' +
      [BaseLexer.singleQuotePattern, BaseLexer.doubleQuotePattern].join('|') +
      ')'
    )
  }

  stringOrVariablePattern () {
    return (
      '(?:' +
      [
        BaseLexer.singleQuotePattern,
        BaseLexer.doubleQuotePattern,
        BaseLexer.variablePattern
      ].join('|') +
      ')'
    )
  }
}

export default BaseLexer
