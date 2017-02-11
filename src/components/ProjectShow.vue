
<template>
  <div class="container bg-white">
    <div class="project-show">
      <div class="col-sm-8">
        <img class="presentation" :src="project.image" v-if="project.image" />
        <div class="title-line">
          <h2 class="title pull-left">{{ project.title }}</h2>
          <button class="help pull-right bg-black title">Soutenir !</button>
        </div>
        <div class="content" v-html="project.content"></div>
      </div>
      <div class="right-column col-sm-4 bg-lightgray">
        <div class="title-line">
          <img src="../assets/icon/1484923436_coin-euro.svg" width="50"/>
          <h3 class="pull-right title">{{ project.price }}€</h3>
        </div>
        <div class="title-line">
          <img src="../assets/icon/1484923433_bird.svg" width="50"/>
          <h3 class="pull-right title">Nb contributeurs</h3>
        </div>
        <div class="title-line">
          <img src="../assets/icon/1484923435_calendar.svg" width="50"/>
          <h3 class="pull-right title">{{ project.endDate }}</h3>
        </div>
        <div class="title-line">
          <img src="../assets/icon/1484855557_location-24.svg" width="50"/>
          <h3 class="pull-right title">{{ project.address }}</h3>
        </div>
        <div class="social">
          <a href="#"><img src="../assets/icon/1484844217_facebook_logo_social_media.svg" width="50"/></a>
          <a href="#"><img src="../assets/icon/1484844227_twitter_logo_social_media.svg" width="50"/></a>
          <a href="#"><img src="../assets/icon/1484844212_google_logo_social_media.svg" width="50"/></a>
        </div>
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
img.presentation {
  width: 100%;
}
.title-line {
  position: relative;
  height: 80px;
}
button.help {
  color: white;
  border: none;
  height: 50px;
  width: 200px;
  font-size: 24px;position: absolute;
  right: 0px;
  margin-top: 15px;
}
.right-column {
  padding-top: 15px;
  padding-bottom: 15px;
}
.project-show .content {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
