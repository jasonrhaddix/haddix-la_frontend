<template>
  <div class="text-editor">
    <div v-if="editor" class="menubar">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="format_bold"
        />
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="format_italic"
        />
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="strikethrough_s"
        />
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="code"
        />
      </button>
      <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button> -->
      <!-- <button @click="editor.chain().focus().clearNodes().run()">clear nodes</button> -->
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="notes"
        />
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="format_list_bulleted"
        />
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="format_list_numbered"
        />
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="code"
        />
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="format_quote"
        />
      </button>
      <!-- <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button> -->
      <!-- <button @click="editor.chain().focus().setHardBreak().run()">hard break</button> -->
      <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="undo"
        />
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        <v-icon
          :size="iconOptions.iconSize"
          :color="iconOptions.iconColor.icon"
          icon="redo"
        />
      </button>
    </div>
    <EditorContent v-if="editor"
      v-model="modelValue"
      class="editor__content"
      :editor="editor" />
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, onMounted, onBeforeUnmount, watch } from 'vue'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const modelValue = defineModel()
const emit = defineEmits(['update:modelValue'])

const iconOptions = reactive({
  iconSize: 22,
  iconColor: {
    icon: 'grey darken-1',
    text: 'grey--text text--darken-1'
  }
})

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    content: modelValue.value,
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    }
  })

 /*  setTimeout(() => {
    editor.value?.setContent(modelValue.value)
  }, 100) */
})


onBeforeUnmount(() => {
  editor.value?.destroy()
})

onBeforeUnmount(() => {
  editor.destroy()
})

/* import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder
} from 'tiptap-extensions'

export default {
	name: 'text-editor',

	components: {
		'editor-menu-bar': EditorMenuBar,
		'editor-content': EditorContent
	},

	props: {
		value: {
			type: String
		},
		placeholder: {
			type: String,
			required: false,
			default: null
		}
	},

	data: () => ({
		iconSize: 22,
		iconOptions.iconColor: {
			icon: 'grey darken-1',
			text: 'grey--text text--darken-1'
		},
		editor: null
	}),

	mounted () {
		this.editor = new Editor({
			extensions: [
				new Blockquote(),
				new BulletList(),
				new CodeBlock(),
				new HardBreak(),
				new Heading({ levels: [1, 2, 3] }),
				new HorizontalRule(),
				new ListItem(),
				new OrderedList(),
				new TodoItem(),
				new TodoList(),
				new Link(),
				new Bold(),
				new Code(),
				new Italic(),
				new Strike(),
				new Underline(),
				new History(),
				new Placeholder({
					showOnlyCurrent: false,
					emptyNodeText: 'Write something'
				})
			],
			// content: this.value,
			onUpdate: ({ getHTML }) => {
				this.$emit('input', getHTML())
			}
		})
		this.editor.setContent(this.value)
	},

	beforeDestroy () {
		this.editor.destroy()
	},

	watch: {
		value: {
			deep: true,
			handler (val) {
				if (this.editor && val !== this.value) {
					this.editor.setContent(val, true)
				}
			}
		}
	}
} */
</script>
