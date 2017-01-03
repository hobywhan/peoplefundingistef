
<template>
  <div class="project-show">
    <div class="">
      <h2 class="project-title">{{ project.projectTitle }}</h2>
      <div v-html="project.projectDescription"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'

export default Vue.extend({
  components: {
  },
  data () {
    return {
      project: [],
      user: firebase.auth().currentUser,
      projectId: $route.params.projectId
    }
  },
  methods: {
  },
  mounted: function () {
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database().ref('projects/' + this.projectId).on('value', function(snapshot) {
      _this.project = snapshot.val()
      LoadingState.$emit('toggle', false)
    })
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-title{
  display: inline-block;
}
</style>
