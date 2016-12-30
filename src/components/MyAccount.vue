
<template>
  <div class="user-show">
    <div class="">
      <pulse-loader v-if="isLoading"></pulse-loader>
      <h2 class="user-title">{{ user.displayName }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {LoadingState} from '../main.js'

export default {
  components: {
  },
  data () {
    return {
      user: firebase.auth().currentUser
    }
  },
  methods: {
  },
  mounted: function () {
    let userId = this.user.uid
    // var user = firebase.auth().currentUser
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database().ref('users/' + userId).on('value', function(snapshot) {
      console.log(snapshot.val())
      _this.user = snapshot.val()
      LoadingState.$emit('toggle', false)
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-title{
  display: inline-block;
}
</style>
