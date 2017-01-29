<template>
  <div class="tinymceeditor">
    <textarea :id="id" v-model="editorContent" placeholder="Contenu"></textarea>
    <p class="content-view" v-html="editorContent"></p>
  </div>
</template>

<script>
// import theme from 'tinymce/themes/modern/theme.js'
// import tinymce from 'tinymce/tinymce.min.js'
// import tinymce from 'https:////cdn.tinymce.com/4/tinymce.min.js'
// import tinymce from '../helpers/tinymce.min.js'

export default {
  props: [
    'value'
  ],
  components: {
    // theme,
    // tinymce
  },
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

<style scoped>
.content-view {
  padding: 15px;
  background-color: #eee;
  border: 1px solid #cacaca;
}
</style>
