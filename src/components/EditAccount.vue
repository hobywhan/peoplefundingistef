
<template>
  <div class="enter-account">
    <div class="">
      <form>
        <h2>Modifiez votre compte:</h2>
        <p>{{ user.email}}</p><br />
        <input class="form-control" type="text" v-model="account.displayName" placeholder="account.displayName"><br />

        <input class="form-control" type="text" v-model="account.phone" placeholder="account.phone"><br />

        <textarea v-model="account.address" placeholder="account.address"></textarea><br />

        <input type="file" @change="loadFile" /><br />
        Image chargée (taille limitée): <img :src="account.avatar" width="200" v-if="account.avatar" />
        <span v-if="!account.avatar">Pas image selectionnée<br /></span>

        <button  class="btn btn-default submit-btn" v-on:click="submit()" :disabled="!canSubmit" @click.prevent="submitForm">Editer</button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {router} from '../main.js'

export default Vue.extend({
  data () {
    return {
      user: firebase.auth().currentUser,
      canSubmit: true,
      account: {
        displayName: user.displayName,
        email: 'Description du projet',
        phone: 'Contenu du projet',
        address: 'Contenu du projet',
        avatar: ''
      }
    }
  },
  components: {
  },
  methods: {
    submit() {
      this.user.name = this.account.name
      this.user.phone = this.account.phone
      this.user.address = this.account.address
      this.user.avatar = this.account.avatar
      firebase.database().ref('users/' + this.user.uid).set(this.user)
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
        this.account.image = e.target.result
        this.canSubmit = true
      }
      reader.readAsDataURL(file) // File as Base64
      // reader.readAsBinaryString(file) // File as raw binary data
      // reader..readAsText(file) // File as raw string
    }
   },
  mounted: function () {
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit-btn{
  margin-top: 20px;
}
</style>
