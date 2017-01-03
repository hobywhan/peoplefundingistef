
<template>
  <div class="overview">
    <h2>Bienvenue sur le site de crowdfunding Peoplefunding</h2>
    <div v-if="authenticated">
      <p>Vous êtes connecté</p>
      <div class="project-list">
        <div class="">
          <h2>Les 5 derniers projets créés:</h2>
          <ul class='project-list'>
            <!-- TODO : sort by time desc, change all for with (key, item) -->
            <li class="project-item" v-for="item in projectList">
              <h4 class="project-title">{{ item.projectTitle }}</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p v-else>
      Connectez-vous pour commencer
  </p>
</div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'

export default Vue.extend({
  components: {
  },
  props: ['authenticated', 'uifirebase'],
  data () {
    return {
      projectList: [],
      msg: 'Hello World!'
    }
  },
  created: function () {
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database()
    .ref('projects')
    .orderByChild('time')
    .limitToLast(5)
    .on('value', function(snapshot) {
      _this.projectList = snapshot.val()
      LoadingState.$emit('toggle', false)
    })
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
