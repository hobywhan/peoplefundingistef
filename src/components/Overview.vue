
<template>
  <div class="container bg-white">
    <div class="overview">
      <div class="research bg-yellow row">
        <div class="social">
          <a href="#"><img src="../assets/icon/1484844217_facebook_logo_social_media.svg" width="50"/></a>
          <a href="#"><img src="../assets/icon/1484844227_twitter_logo_social_media.svg" width="50"/></a>
          <a href="#"><img src="../assets/icon/1484844212_google_logo_social_media.svg" width="50"/></a>
        </div>
        <h2 class="title">Trouvez les projets qui vous intéresse !</h2>
        <div class="input">
          <input v-model="filterTitle" type="text"/>
          <button class="btn btn-default" v-on:click="goToList()">
            <img src="../assets/icon/1485652515_common-search-lookup-glyph.svg" height="20"/>
          </button>
        </div>
      </div>
      <div class="project-list">
        <h2 class="title">Les projets du moment</h2>
        <div class="col-md-4" v-for="item in projectList">
          <div class="project-item col-md-12">
            <h4 class="project-title">{{ item.title }}</h4>
            <router-link :to="{ name: 'showProject', params: { projectId: item.uid }}">Voir plus</router-link>
          </div>
        </div>
      </div>
      <div class="information bg-lightgray col-md-12">
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
    .limitToLast(3)
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

<style scoped>
.research {
  height: 300px;
  position: relative;
}
.research .social a {
  margin-left: 50px;
}
.research h2 {
  position: absolute;
  top: 40%;
  width: 100%;
  text-align: center;
}
.research .input {
  position: absolute;
  bottom: 40px;
  width: 100%;
  margin: auto;
  text-align: center;
}
.research .input > * {
  border-radius: 20px;
  border: 1px solid black;
  height: 40px;
  padding: 10px;
}
.research .input input {
  width: 50%;
  font-size: 16px;
}

.project-list {
  list-style: none;
  padding-left: 0;
}
.project-list h2 {
  text-align: center;
}
.project-item {
  padding: 10px;
  border: 1px solid #999;
}
</style>
