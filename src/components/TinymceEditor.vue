<template>
  <div class="tinymceeditor">
    <textarea :id="id" v-model="editorContent" placeholder="Contenu"></textarea>
    <p class="content-view" v-html="editorContent"></p>
  </div>
</template>

<script>
export default {
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

<style scoped>
.fr-counter {
  display: none;
}
.content-view {
  padding: 15px;
  background-color: #eee;
  border: 1px solid #cacaca;
}
</style>
