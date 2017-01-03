
<template>
  <div class="project-list">
    <div class="">
      <h2>Tous les projets :</h2>
      <ul class='project-list'>
        <li class="project-item" v-for="item in projectList">
          <h4 class="project-title">{{ item.title }}</h4>
          <p>{{ item.description }}</p>
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
      projectList: []
    }
  },
  methods: {
  },
  created: function () {
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database().ref('projects').on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val()
        childData.uid = childSnapshot.key
        _this.projectList.push(childData)
      })
      LoadingState.$emit('toggle', false)
    })
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
