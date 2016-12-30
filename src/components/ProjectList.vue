
<template>
  <div class="project-list">
    <div class="">
      <h2>Tous les projets :</h2>
      <pulse-loader v-if="isLoading"></pulse-loader>
      <ul class='project-list'>
        <li class="project-item" v-for="item in projectList | orderBy 'time' -1 ">
          <h4 class="project-title">{{ item.projectTitle }}</h4>
          <div v-html="item.projectDescription"></div>
          <button v-link="{ name: 'showProject', params: { projectId: item.uid }}">Voir plus</button>
        </li>
      </ul>
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
      projectList: [],
      isLoading: true,
      user: firebase.auth().currentUser
    }
  },
  methods: {
  },
  ready: function () {
    // var user = firebase.auth().currentUser
    var _this = this
    this.isLoading = true
    firebase.database().ref('projects').on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val()
        childData.uid = childSnapshot.key
        _this.projectList.push(childData)
      })
      _this.isLoading = false
    })
  }
}

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
