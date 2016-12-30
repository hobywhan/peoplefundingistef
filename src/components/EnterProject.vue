
<template>
  <div class="enter-project">
    <div class="">
    <h2>Ajouter un projet:</h2>

      <input class="form-control" type="text" v-model="projectTitle" placeholder="projectTitle"><br/>
      <!-- <div id="xxx">
        <tinymce content='{{projectDescription}}' :options='options' @change="update"></tinymce>
      </div> -->
      <textarea id="newProjectDescription" v-model="projectDescription" placeholder="projectDescription"></textarea>
      <!-- <vue-html5-editor :content="projectDescription" :height="500" @change="update"></vue-html5-editor> -->
      <p v-html="projectDescription"></div>
      <button  class="btn btn-default submit-btn" v-on:click="submit()">Submit</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import tinymce from 'vue-tinymce/src/tinymce.vue'
import {router} from '../main.js'

export default {
  data () {
    return {
      projectTitle: 'Titre du projet',
      projectDescription: 'Description du projet'
    }
  },
  computed: {
  },
  components: {
    'tinymce': tinymce
  },
  methods: {
    submit() {
      console.log(this.projectTitle)
      var user = firebase.auth().currentUser
      var d = Date.now()
      firebase.database().ref('projects').push({
        projectTitle: this.projectTitle,
        projectDescription: this.projectDescription,
        rating: this.rating,
        time: d,
        creator: user.uid
      })
      router.push({path: '/projectlist'})
    },
    update: function(e) {
      console.log(e)
      this.projectDescription = e.target.value
    }
   },
  mounted: function () {
  }
}

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
