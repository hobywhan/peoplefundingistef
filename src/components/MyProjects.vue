
<template>
  <div class="project-list">
    <h2>Vos projets:</h2>
    <ul class='project-list'>
      <li class="project-item" v-for="(item, key) in projectList">
        <projectli :project="item"></projectli>
        <router-link :to="{ name: 'showProject', params: { projectId: item.uid }}">Voir plus</router-link>
        <router-link :to="{ name: 'editProject', params: { projectId: item.uid }}">Editer</router-link>
        <a v-on:click="deleteItem(item.uid)">Supprimer</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'
import projectli from './OneProject.vue'

export default Vue.extend({
  props: ['authenticated'],
  components: {
    projectli
  },
  data () {
    return {
      projectList: [],
      user: firebase.auth().currentUser,
      prRef: firebase.database().ref('projects')
    }
  },
  methods: {
    deleteItem(key) {
      // var _this = this
      var adaRef = firebase.database().ref('projects/' + key)
        adaRef.remove()
          .then(function() {
            console.log('Remove succeeded.')
            // _this.showList()
          })
          .catch(function(error) {
            console.log('Remove failed: ' + error.message)
          })
    },
    showList() {
      if (!this.user) return
      var _this = this
      LoadingState.$emit('toggle', true)
      return this.prRef
        .orderByChild('creator')
        .startAt(this.user.uid)
        .endAt(this.user.uid)
        .on('value', function(snapshot) {
          _this.projectList = []
          snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val()
            childData.uid = childSnapshot.key
            _this.projectList.push(childData)
          })
          LoadingState.$emit('toggle', false)
        })
    }
  },
  watch: {
    authenticated: function() {
      this.user = firebase.auth().currentUser
      this.showList()
    }
  },
  created: function () {
    this.showList()
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.close-btn{
  display: inline-block;
  margin-left: 10px;
}
.project-title{
  display: inline-block;
}
.project-item{
  border-bottom: 1px dotted #999;
  padding-bottom: 10px;
}
.project-list{
  list-style: none;
  padding-left: 0;
}

</style>
