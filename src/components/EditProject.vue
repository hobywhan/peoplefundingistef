
<template>
  <div class="container bg-white">
    <div class="enter-project" v-if="authenticated">
      <form>
        <h2 class="title">Editer un projet:</h2>

        <div class="form-group">
          <label>Titre : </label>
          <input class="form-control" type="text" v-model="project.title" placeholder="Titre du projet">
        </div>

        <div class="form-group">
          <label>Résumé de présentation (max 255 caractères) : </label>
          <textarea class="form-control" v-model="project.description" placeholder="Description du projet"></textarea>
        </div>

        <div class="form-group">
          <label>Contenu html : </label>
          <tinymce-editor v-model="project.content"></tinymce-editor>
        </div>

        <div class="form-group">
          <label>Image de présentation : </label>
          <input type="file" @change="loadFile" accept="image/*" />
          Image chargée (taille limitée): <img :src="project.image" width="200" v-if="project.image" />
          <span v-if="!project.image">Pas image selectionnée</span><br />
        </div>

        <div class="form-group">
          <label>Tags : </label>
          <input class="form-control" type="text" v-model="project.tags" placeholder="Ajouter des tags, séparés de ';'">
        </div>

        <div class="form-group">
          <label>Categories : </label><br />
          <select v-model="project.categories" v-if="categoryList.length > 0" multiple>
            <option v-for="category in categoryList" v-bind:value="category">{{category.name}}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Objectif financier (en €) : </label>
          <input class="form-control" type="number" v-model="project.price" placeholder="10000">
        </div>

        <div class="form-group">
          <label>Date de fin de financement (max 2 mois) : </label>
          <datepicker v-model="project.endDate" name="endDate" language="fr" :disabled="state.disabled" format="dd/MM/yyyy"></datepicker>
        </div>
        <button class="btn btn-default submit-btn" :disabled="!canSubmit" @click.prevent="submit">Editer</button>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {router, LoadingState} from '../main.js'
import tinymceeditor from './TinymceEditor.vue'
import VueNotifications from 'vue-notifications'

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
    'tinymce-editor': tinymceeditor
  },
  methods: {
    submit() {
      firebase.database().ref('projects/' + this.projectId).set(this.project)
      VueNotifications.success({message: 'Projet modifié'})
      router.push({path: '/projectlist'})
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
      firebase.database().ref('projects/' + this.projectId).once('value', function(snapshot) {
        _this.project = snapshot.val()
      }).then(() => {
        firebase.database().ref('categories').once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            this.categoryList.push({
              key: childSnapshot.key,
              name: childSnapshot.val()
            })
          })
          LoadingState.$emit('toggle', false)
        })
      })
      .catch(() => {
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
