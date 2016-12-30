
<template>
  <div class="project-show">
    <div class="">
      <pulse-loader v-if="isLoading"></pulse-loader>
      <h2 class="project-title">{{ project.projectTitle }}</h2>
      <div v-html="project.projectDescription"></div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  data () {
    return {
      project: [],
      isLoading: true,
      user: firebase.auth().currentUser
    }
  },
  methods: {
  },
  ready: function () {
    let projectId = this.$route.params.projectId
    // var user = firebase.auth().currentUser
    var _this = this
    this.isLoading = true
    firebase.database().ref('projects/' + projectId).on('value', function(snapshot) {
      _this.project = snapshot.val()
      _this.isLoading = false
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-title{
  display: inline-block;
}
</style>
