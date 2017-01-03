
<template>
  <div class="project-list">
    {{authenticated ? 'true' : 'false'}}
    {{$parent.authenticated ? 'true' : 'false'}}
    <div class="">
      <h2>Vos projets:</h2>
      <ul class='project-list'>
        <li class="project-item" v-for="(item, key) in projectList">
          <h4 class="project-title">{{ item.projectTitle }}</h4><button  class="close-btn btn btn-default btn-xs" v-on:click="deleteItem(item.uid)">X</button>
          <div v-html="item.projectDescription"></div>
          <router-link :to="{ name: 'showProject', params: { projectId: item.uid }}">Voir plus</router-link>
        </li>
      </ul>
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
      authenticated: this.$parent.authenticated,
      projectList: [],
      user: firebase.auth().currentUser
    }
  },
  methods: {
    deleteItem(key) {
      var adaRef = firebase.database().ref('projects/' + key)
        adaRef.remove()
          .then(function() {
            console.log('Remove succeeded.')
          })
          .catch(function(error) {
            console.log('Remove failed: ' + error.message)
          })
    },
    showList() {
      if (!this.user) {
        this.user = firebase.auth().currentUser
      }
      var _this = this
      LoadingState.$emit('toggle', true)
      this.projectList = []
      return firebase.database()
        .ref('projects')
        .orderByChild('creator')
        .startAt(this.user.uid)
        .endAt(this.user.uid)
        .on('value', function(snapshot) {
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
    user: 'showList',
    authenticated: function() {
      this.user = firebase.auth().currentUser
    }
  },
  created: function () {
    this.user = firebase.auth().currentUser
    // this.showList()
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
