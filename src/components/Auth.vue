
<template>
  <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/0.4/firebase-ui-auth.css" />
  <div class="auth-wrapper">
    <h4>Connectez-vous pour partager et gérer vos projets</h4>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['authenticated', 'uifirebase'],
  data () {
    return {
    }
  },
  ready: function () {
    if (this.authenticated) {
      this.$route.router.go({path: '/', params: { authenticated: true }})
      return
    }
    var _this = this
    // FirebaseUI config.
    var uiConfig = {
      'callbacks': {
        signInSuccess: function(currentUser, credential, redirectUrl) {
          console.log(currentUser, credential, redirectUrl)
          _this.$route.router.go({path: '/', params: { authenticated: true }})
          window.location.reload()
          _this.fireStatus(true, currentUser)
          return true
        }
      },
      // 'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
      // 'signInFlow': 'popup',
      'signInSuccessUrl': '/#!/',
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
    // _this.uifirebase.reset()
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
