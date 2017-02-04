
<template>
  <div class="container bg-white">
    <div class="user-show">
      <div v-if="user">
        <h2 class="title">{{ user.displayName }}</h2>
        <img :src="user.avatar" width="200" v-if="user.avatar" />
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
        <p>{{ user.address }}</p>
        <router-link :to="{ name: 'editAccount'}">Modifier vos données</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'

export default Vue.extend({
  props: ['authenticated'],
  components: {
  },
  data () {
    return {
      user: firebase.auth().currentUser
    }
  },
  methods: {
    showAccount() {
      if (!this.user) return
      var _this = this
      LoadingState.$emit('toggle', true)
      return firebase.database()
      .ref('users/' + this.user.uid)
      .once('value', function(snapshot) {
        _this.user = snapshot.val()
      }).then(function() {
        LoadingState.$emit('toggle', false)
      }).catch(function(error) {
        console.log('Get failed: ' + error.message)
        LoadingState.$emit('toggle', false)
      })
    }
  },
  watch: {
    authenticated: function() {
      this.user = firebase.auth().currentUser
      this.showAccount()
    }
  },
  created: function () {
    this.showAccount()
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
