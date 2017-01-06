
<template>
  <div class="enter-project">
    <div class="">
      <form>
    <h2>Ajouter un projet:</h2>
      <input class="form-control" type="text" v-model="project.title" placeholder="project.title"><br />

      <textarea v-model="project.description" placeholder="project.description"></textarea><br />
      <textarea v-model="project.content" placeholder="project.content"></textarea><br />
      <p v-html="project.content">

      <input type="file" @change="loadFile" /><br />
      Image chargée (taille limitée): <img :src="project.image" width="200" v-if="project.image" />
      <span v-if="!project.image">Pas image selectionnée<br /></span>

      <button  class="btn btn-default submit-btn" v-on:click="submit()" :disabled="!canSubmit" @click.prevent="submitForm">Ajouter</button>
    </div>
  </form>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
// import tinymce from 'vue-tinymce/src/vue-tinymce'
import {router, LoadingState} from '../main.js'
// import tinymceeditor from './TinymceEditor.vue'

export default Vue.extend({
  data () {
    return {
      canSubmit: true,
      projectId: this.$route.params.projectId,
      project: {},
      categoryList: []
    }
  },
  components: {
    // 'tinymce': tinymce,
    // 'tinymce-editor': tinymceeditor
  },
  methods: {
    submit() {
      firebase.database().ref('projects/' + this.projectId).set(this.project)
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
    },
    showProject() {
      var _this = this
      LoadingState.$emit('toggle', true)
      firebase.database().ref('projects/' + this.projectId).on('value', function(snapshot) {
        _this.project = snapshot.val()
        LoadingState.$emit('toggle', false)
      })
    }
  },
  created: function () {
    this.showProject()
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
