
<template>
  <div class="auth-wrapper">
  <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/0.4/firebase-ui-auth.css" />
    <h4>Connectez-vous pour partager et gérer vos projets</h4>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {router} from '../main.js'

export default {
  props: ['authenticated', 'uifirebase'],
  data () {
    return {
    }
  },
  mounted: function () {
    if (this.authenticated) {
      router.push({path: '/', params: { authenticated: true }})
      return
    }
    var _this = this
    // FirebaseUI config.
    var uiConfig = {
      'callbacks': {
        signInSuccess: function(currentUser, credential, redirectUrl) {
          router.push({path: '/', params: { authenticated: true }})
          return true
        }
      },
      // 'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
      // 'signInFlow': 'popup',
      'signInSuccessUrl': '/#/',
      'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      'tosUrl': '/#!/terms'
    }
    // The start method will wait until the DOM is loaded.
    _this.uifirebase.start('#firebaseui-auth-container', uiConfig)
  }
}

</script>

<style scoped>
.auth-wrapper {
   width:350px;
   margin-left: 5%;
}
</style>
