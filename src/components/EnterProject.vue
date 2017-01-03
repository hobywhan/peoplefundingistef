
<template>
  <div class="enter-project">
    <div class="">
      <form>
    <h2>Ajouter un projet:</h2>
      <input class="form-control" type="text" v-model="project.title" placeholder="project.title"><br />

      <textarea v-model="project.description" placeholder="project.description"></textarea><br />

      <div id="xxx">
        <tinymce content='project.content' :options="options" @change="update"></tinymce>
      </div>

      <tinymce-editor v-model="project.content"></tinymce-editor><br />

      <input type="file" @change="loadFile" accept="image/*" /><br />
      Image chargée (taille limitée): <img :src="project.image" width="200" v-if="project.image" />
      <span v-if="!project.image">Pas image selectionnée</span><br />

      <!-- <textarea id="newProjectDescription" v-model="projectDescription" placeholder="projectDescription"></textarea> -->
      <!-- <vue-html5-editor :content="projectDescription" :height="500" @change="update"></vue-html5-editor> -->

      <p v-html="project.content"></p><br />

      <button class="btn btn-default submit-btn" :disabled="!canSubmit" @click.prevent="submit">Ajouter</button>
    </div>
  </form>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
// import tinymce from 'vue-tinymce/src/vue-tinymce'
import {router} from '../main.js'
import tinymceeditor from './TinymceEditor.vue'

// var tinymceeditor = Vue.component('tinymce-editor', {
//   template: '<textarea :id="id" v-model="editorContent"></textarea>',
//   props: [
//     'value'
//   ],
//   data () {
//     return {
//       id: ''
//     }
//   },
//   computed: {
//     editorContent: {
//       get () {
//         return this.value
//       },
//       set (newVal) {
//         this.$emit('input', newVal)
//       }
//     }
//   },
//   created () {
//     const d = new Date()
//     this.id = 'id_' + d.getTime()
//     tinymce.init({
//       selector: '#' + this.id,
//       setup: (editor) => {
//         // 'change' can be used instead of 'keyup' to only update once you click outside the editor
//         editor.on('keyup', () => {
//           this.$emit('input', editor.getContent())
//         })
//       }
//     })
//   }
// })
export default Vue.extend({
  data () {
    return {
      canSubmit: false,
      project: {
        title: 'Titre du projet',
        description: 'Description du projet',
        content: 'Contenu du projet',
        image: ''
      }
    }
  },
  components: {
    // 'tinymce': tinymce,
    'tinymce-editor': tinymceeditor
  },
  methods: {
    submit() {
      console.log(this.project)
      var _this = this
      var user = firebase.auth().currentUser
      firebase.database().ref('projects').push({
        title: _this.project.title,
        description: _this.project.description,
        image: _this.project.image,
        time: Date.now(),
        creator: user.uid
      })
      router.push({path: '/projectlist'})
    },
    update: function(e) {
      console.log(e)
      this.project.description = e.target.value
    },
    loadFile (e) {
      this.canSubmit = false // FileReader is async, prevent form submit untill image is loaded
      let file = e.target.files[0] || e.dataTransfer.files[0]

      if (!file) {
        return
      }

      let reader = new FileReader()
      reader.onload = (e) => {
        this.project.image = e.target.result
        this.canSubmit = true
      }
      reader.readAsDataURL(file) // File as Base64
      // reader.readAsBinaryString(file) // File as raw binary data
      // reader..readAsText(file) // File as raw string
    }
   },
  mounted: function () {
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit-btn{
  margin-top: 20px;
}
.fr-counter {
  display: none;
}
</style>
