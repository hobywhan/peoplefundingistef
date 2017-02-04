
<template>
  <div class="container bg-white">
    <div class="project-show">
      <div class="">
        <h2 class="title">{{ project.title }}</h2>
        <h3>{{ project.price }}€</h3>
        <h3>{{ project.endDate }}</h3>
        <img :src="project.image" width="200" v-if="project.image" />
        <div v-html="project.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'
import moment from 'moment'

export default Vue.extend({
  components: {
  },
  data () {
    return {
      project: [],
      user: firebase.auth().currentUser,
      projectId: this.$route.params.projectId
    }
  },
  methods: {
  },
  created: function () {
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database().ref('projects/' + this.projectId).on('value', function(snapshot) {
      _this.project = snapshot.val()
      LoadingState.$emit('toggle', false)
    })
    if (this.project.endDate !== undefined) {
      this.project.endDate = moment(this.project.endDate).format('DD/MM/YYYY')
    }
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
