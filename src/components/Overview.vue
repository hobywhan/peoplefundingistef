<template>
  <div class="container bg-white">
    <div class="overview">
      <div class="research bg-yellow row">
        <div class="social">
          <a href="#"><img src="../assets/icon/1484844217_facebook_logo_social_media.svg" width="50"/></a>
          <a href="#"><img src="../assets/icon/1484844227_twitter_logo_social_media.svg" width="50"/></a>
          <a href="#"><img src="../assets/icon/1484844212_google_logo_social_media.svg" width="50"/></a>
        </div>
        <h2 class="title center">Trouvez les projets qui vous intéresse !</h2>
        <div class="input center">
          <input v-model="titleFilter" type="text"/>
          <button class="btn btn-default" v-on:click="goToList()">
            <img src="../assets/icon/1485652515_common-search-lookup-glyph.svg" height="20"/>
          </button>
        </div>
      </div>
      <div class="lastest-project">
        <h2 class="title center">Les projets du moment</h2>
        <div class="project-list">
          <projectli :project="item" v-for="item in projectList"></projectli>
        </div>
      </div>
      <div class="information title center">
        <div class="col-md-4 col-sm-6 col-xs-12 bg-lightgray">
          <h2>Proposez !</h2>
          <img src="../assets/icon/1484844629_miscellaneous-392.svg" width="100"/>
          <h4>Vos projets</h4>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bg-lightgray">
          <h2>Financez !</h2>
          <img src="../assets/icon/1484844627_finance-302.svg" width="100"/>
          <h4>Vos réalisations</h4>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 bg-lightgray">
          <h2>Aidez !</h2>
          <img src="../assets/icon/1484844967_miscellaneous-312.svg" width="100"/>
          <h4>Les acteurs locaux</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState, router} from '../main.js'
import projectli from './OneProject.vue'

export default Vue.extend({
  components: {
    projectli
  },
  props: ['authenticated'],
  data () {
    return {
      projectList: []
    }
  },
  methods: {
    goToList() {
      router.push({
        name: 'listProject',
        params: { titleFilter: this.titleFilter },
        force: true
      })
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

<style>
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
}
.research .input {
  position: absolute;
  bottom: 40px;
  width: 100%;
  margin: auto;
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
.information {
  margin-top: 30px;
}
</style>
