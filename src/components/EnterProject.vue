
<template>
  <div class="enter-project">
    <div class="">
    <h2>Ajouter un projet:</h2>

      <input class="form-control" type="text" v-model="projectTitle" placeholder="projectTitle"><br/>
      <textarea v-model="projectDescription" v-froala="froalaOptions" placeholder="projectDescription"></textarea>
      <!-- <textarea :value="projectDescription" @input="update" placeholder="projectDescription"></textarea>
      <textarea :value="projectDescription" @input="update" v-froala="froalaOptions" placeholder="projectDescription"></textarea>
      <input type="text" @input="update">
      <input type="text" v-model="projectDescription">
      <div v-html="rawHtml">{{ projectDescription }}</div><br/> -->
      <!-- textarea froala
      <textarea v-model="projectDescription" v-froala></textarea><br/>
      input
      <input class="form-control" type="text" v-model="projectDescription" placeholder="projectDescription"><br/>
      input froala
      <input class="form-control" type="text" v-model="projectDescription" placeholder="projectDescription" v-froala><br/>
      <div v-froala="froalaOptions" v-html="rawHtml" @input="update">{{projectDescription}}</div><br/>
      textarea froala placeholder
      <textarea class="form-control" v-model="projectDescription" placeholder="projectDescription" v-froala="froalaOptions"></textarea><br/>
      textarea froala placeholder text
      <textarea class="form-control" v-model="projectDescription" placeholder="projectDescription" v-froala="froalaOptions">{{projectDescription}}</textarea><br/>
      textarea froala text
      <textarea class="form-control" v-froala="froalaOptions">{{projectDescription}}</textarea><br/> -->
      <button  class="btn btn-default submit-btn" v-on:click="submit()">Submit</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      projectTitle: 'Titre du projet',
      projectDescription: 'Description du projet',
      froalaOptions: {
        toolbarButtons: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        toolbarButtonsSM: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
        toolbarButtonsXS: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
        paragraphFormat: {
            n: 'Normal',
            h2: 'Heading 2',
            h3: 'Heading 3',
            h4: 'Heading 4',
            blockquote: 'Quote',
            pre: 'Code'
        },
        codeMirror: true,
        height: 400,
        theme: 'gray'
      }
    }
  },
  computed: {
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
      this.$route.router.go({path: '/projectlist'})
    },
    update: function(e) {
      console.log(e)
      this.projectDescription = e.target.value
    }
   },
  ready: function () {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #FF0000;
}
.star-img{
  cursor: pointer;
}
.stars{
  display: inline-block;
}
.star-title{
  display: inline-block;
}
.submit-btn{
  margin-top: 20px;
}
.fr-counter {
  display: none;
}
</style>
