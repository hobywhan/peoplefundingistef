
<template>
  <div class="auth-wrapper">
    <h1>Connectez-vous pour partager et gérer vos projets</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {
  data () {
    return {
    }
  },
  ready: function () {
    // FirebaseUI config.
    var uiConfig = {
      'signInSuccessUrl': '/index.html#!/projectlist',
      'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      'tosUrl': 'tos.html',
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auth-wrapper {
   width:350px;
   margin-left: 5%;
}
</style>
