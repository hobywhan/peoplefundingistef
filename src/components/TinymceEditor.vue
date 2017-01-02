<template>
  <textarea :id="id" v-model="editorContent"></textarea>
</template>

<script>
import tinymce from 'tinymce/tinymce.min'

export default {
  template: '<textarea :id="id" v-model="editorContent"></textarea>',
  props: [
    'value'
  ],
  data () {
    return {
      id: ''
    }
  },
  computed: {
    editorContent: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal)
      }
    }
  },
  created () {
    const d = new Date()
    this.id = 'id_' + d.getTime()
    tinymce.init({
      selector: '#' + this.id,
      setup: (editor) => {
        // 'change' can be used instead of 'keyup' to only update once you click outside the editor
        editor.on('keyup', () => {
          this.$emit('input', editor.getContent())
        })
      }
    })
  }
}
</script>

<style>
</style>
