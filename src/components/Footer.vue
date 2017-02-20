
<template>
  <div class="footer container bg-yellow">
    <div class="col-md-4 col-xs-12 categories">
      <h2 class="title">Catégories</h2>
      <ul>
        <li v-for="category in categoryList">
          <a class="hand-cursor" v-on:click="goToList(category.key)">{{category.name}}</a>
        </li>
      </ul>
    </div>
    <div class="col-md-4 col-xs-12 about">
      <h2 class="title">à propos</h2>
      <p>
        People funding est un site de financement participatif centré sur la localité des projets,
        l’entre-aide des personnes et la collaboration. Ce site privilégie les projets au budget
        réduit et à durée courte, le bouche à oreille et les réseaux sociaux seront votre plus grande force !
      </p>
      <router-link to="/">à propos</router-link>
      <router-link to="/">Contact</router-link>
      <router-link to="/">CGU</router-link>
    </div>
    <div class="col-md-4 col-xs-12 social">
      <h2 class="title">Réseaux sociaux</h2>
      <div class="social">
        <a href="#"><img src="../assets/icon/1484844217_facebook_logo_social_media.svg" width="50"/></a>
        <a href="#"><img src="../assets/icon/1484844227_twitter_logo_social_media.svg" width="50"/></a>
        <a href="#"><img src="../assets/icon/1484844212_google_logo_social_media.svg" width="50"/></a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import {LoadingState, router} from '../main.js'
import firebase from 'firebase'

export default Vue.extend({
  data () {
    return {
      categoryList: []
    }
  },
  methods: {
    goToList(item) {
      router.push({
        name: 'listProject',
        params: { categoryFilter: item },
        force: true
      })
    },
    showList() {
      var _this = this
      LoadingState.$emit('toggle', true)
      firebase.database().ref('categories').on('value', function(snapshot) {
        _this.categoryList = []
        snapshot.forEach((childSnapshot) => {
          _this.categoryList.push({
            key: childSnapshot.key,
            name: childSnapshot.val()
          })
        })
        LoadingState.$emit('toggle', false)
      })
    }
  },
  created: function () {
    this.showList()
  }
})

</script>

<style scoped>
.footer {
  margin-bottom: 100px;
}
.hand-cursor {
  cursor: pointer;
}
.social {
  min-height: 100px;
}
</style>
