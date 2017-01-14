
<template>
  <div class="overview">
    <h2>Bienvenue sur le site de crowdfunding Peoplefunding</h2>
    <div class="project-list">
      <div class="">
        <h2>Les 5 derniers projets créés:</h2>
        <ul class='project-list'>
          <!-- TODO : sort by time desc, change all for with (key, item) -->
          <li class="project-item" v-for="item in projectList">
            <h4 class="project-title">{{ item.title }}</h4>
            <router-link :to="{ name: 'showProject', params: { projectId: item.uid }}">Voir plus</router-link>
          </li>
        </ul>
      </div>
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
  props: ['authenticated'],
  data () {
    return {
      projectList: []
    }
  },
  created: function () {
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database()
    .ref('projects')
    .orderByChild('time')
    .limitToLast(5)
    .once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val()
        childData.uid = childSnapshot.key
        _this.projectList.push(childData)
      })
    }).then(function() {
      LoadingState.$emit('toggle', false)
    }).catch(function(error) {
      console.log('Get failed: ' + error.message)
      LoadingState.$emit('toggle', false)
    })
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.project-list{
  list-style: none;
  padding-left: 0;
}
.project-item {
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #999;
}
</style>
