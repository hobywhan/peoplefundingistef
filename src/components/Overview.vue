
<template>
  <div class="overview">
    <h2>Bienvenue sur le site de crowdfunding Peoplefunding</h2>
    <div v-if="authenticated">
      <p>Vous êtes connecté</p>
      <div class="project-list">
        <div class="">
          <h2>Les 5 derniers projets créés:</h2>
          <pulse-loader v-if="isLoading"></pulse-loader>
          <ul class='project-list'>
            <li class="project-item" v-for="item in projectList | orderBy 'time' -1 ">
              <h4 class="project-title">{{ item.projectTitle }}</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p v-else>
      Connectez-vous pour commencer
    </div>
  </p>
</template>

<script>
import firebase from 'firebase'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  props: ['authenticated', 'uifirebase'],
  data () {
    return {
      projectList: [],
      isLoading: true,
      msg: 'Hello World!'
    }
  },
  ready: function () {
    var _this = this
    this.isLoading = true
    firebase.database()
    .ref('projects')
    .orderByChild('time')
    .limitToLast(5)
    .on('value', function(snapshot) {
      _this.projectList = snapshot.val()
      _this.isLoading = false
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
