
<template>
  <div class="container bg-white">
    <div class="enter-account">
      <div v-if="user">
        <form>
          <h2>Modifiez votre compte:</h2>
          <p>{{ user.email}}</p><br />
          <input class="form-control" type="text" v-model="account.displayName" placeholder="account.displayName"><br />
          <input class="form-control" type="text" v-model="account.phone" placeholder="account.phone"><br />
          <textarea v-model="account.address" placeholder="account.address"></textarea><br />

          <input type="file" @change="loadFile" /><br />
          Image chargée (taille limitée): <img :src="account.avatar" width="200" v-if="account.avatar" />
          <span v-if="!account.avatar">Pas image selectionnée<br /></span>
          <button class="btn btn-default submit-btn" :disabled="!canSubmit" @click.prevent="submit">Editer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState, router} from '../main.js'

export default Vue.extend({
  props: ['authenticated'],
  data () {
    return {
      user: firebase.auth().currentUser,
      canSubmit: true,
      account: {}
    }
  },
  components: {
  },
  methods: {
    submit() {
      firebase.database().ref('users/' + this.user.uid).set(this.account)
      router.push({path: '/myaccount'})
    },
    loadFile (e) {
      this.canSubmit = false // FileReader is async, prevent form submit untill image is loaded
      let file = e.target.files[0] || e.dataTransfer.files[0]

      if (!file) {
        return
      }

      let reader = new FileReader()
      reader.onload = (e) => {
        this.account.avatar = e.target.result
        this.canSubmit = true
      }
      reader.readAsDataURL(file) // File as Base64
      // reader.readAsBinaryString(file) // File as raw binary data
      // reader..readAsText(file) // File as raw string
    },
    showAccount() {
      if (!this.user) return
      var _this = this
      LoadingState.$emit('toggle', true)
      return firebase.database()
      .ref('users/' + this.user.uid)
      .once('value', function(snapshot) {
        _this.account = snapshot.val()
        _this.account.displayName = _this.account.displayName ? _this.account.displayName : 'Votre nom d\'utilisateur'
        _this.account.email = _this.account.email ? _this.account.email : 'Votre email'
        _this.account.phone = _this.account.phone ? _this.account.phone : 'Votre numéro de téléphone'
        _this.account.address = _this.account.address ? _this.account.address : 'Votre adresse'
        _this.account.avatar = _this.account.avatar ? _this.account.avatar : ''
      }).then(function() {
        LoadingState.$emit('toggle', false)
      }).catch(function(error) {
        console.log('Get failed: ' + error.message)
        LoadingState.$emit('toggle', false)
      })
    }
   },
  created: function () {
    if (!this.user) {
      router.push({path: '/myaccount'})
      return
    }
    this.showAccount()
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit-btn{
  margin-top: 20px;
}
</style>
