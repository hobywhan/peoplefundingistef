
<template>
  <div class="enter-project">
    <div class="">
      <form>
    <h2>Ajouter un projet:</h2>
      <input class="form-control" type="text" v-model="project.title" placeholder="project.title">

      <textarea class="form-control" v-model="project.description" placeholder="project.description"></textarea>

      <textarea class="form-control" v-model="project.content" placeholder="project.content"></textarea>
      <p v-html="project.content"></p>

      <!-- <div id="xxx">
        <tinymce content='project.content' :options="options" @change="update"></tinymce>
      </div> -->

      <!-- <tinymce-editor v-model="project.content"></tinymce-editor> -->

      <input type="file" @change="loadFile" accept="image/*" />
      Image chargée (taille limitée): <img :src="project.image" width="200" v-if="project.image" />
      <span v-if="!project.image">Pas image selectionnée</span>


      <input class="form-control" type="text" v-model="project.tags" placeholder="project.tags">
      <select v-model="project.categories" multiple>
        <option v-for="category in categoryList" v-if="category.key" v-bind:value="category.key">{{category.key}}-{{category.name}}</option>
      </select>
      {{project.categories | json}}

      <button class="btn btn-default submit-btn" :disabled="!canSubmit" @click.prevent="submit">Ajouter</button>
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
      canSubmit: false,
      project: {
        title: 'Titre du projet',
        description: 'Description du projet',
        content: 'Contenu du projet',
        image: '',
        tags: 'Ajouter des tags, séparé de ";"',
        cartegories: []
      },
      categoryList: []
    }
  },
  components: {
    // 'tinymce': tinymce,
    // 'tinymce-editor': tinymceeditor
  },
  methods: {
    submit() {
      console.log(this.project)
      var user = firebase.auth().currentUser
      this.project.creator = user.uid
      this.project.time = Date.now()
      firebase.database().ref('projects').push(this.project)
      VueNotifications.success({message: 'Projet ajouté'})
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
  created: function () {
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database().ref('categories').once('value', function(snapshot) {
      _this.categoryList = []
      snapshot.forEach(function(childSnapshot) {
        _this.categoryList.push({
          key: childSnapshot.key,
          name: childSnapshot.val()
        })
      })
      LoadingState.$emit('toggle', false)
      console.log(_this.categoryList)
    }).then(() => {
      LoadingState.$emit('toggle', false)
    }).catch(() => {
      LoadingState.$emit('toggle', false)
    })
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
