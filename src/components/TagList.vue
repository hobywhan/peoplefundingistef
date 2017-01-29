<template>
  <div class="container bg-white">
    <div class="tags">
      <div class="tag-add">
        <h3>{{msg}}</h3>
        <input class="form-control" type="text" v-model="tag" placeholder="tag">
        <button class="btn btn-default submit-btn" v-on:click="submit()">Ajouter</button>
      </div>
      <div class="tag-list">
        <h3>{{msg2}}</h3>
        <ul>
          <li class="tag-item" v-for="item in tagList">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'
import VueNotifications from 'vue-notifications'

export default Vue.extend({
  components: {
  },
  data () {
    return {
      msg: 'Ajouter un tag : ',
      msg2: 'Tags : ',
      tagList: [],
      tag: 'bière'
    }
  },
  methods: {
    submit() {
      for (var i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i] === this.tag) {
          return
        }
      }
      firebase.database().ref('tags').push(this.tag)
      VueNotifications.success({message: 'Tag ajouté'})
    },
    showList() {
      var _this = this
      LoadingState.$emit('toggle', true)
      firebase.database().ref('tags').on('value', function(snapshot) {
        _this.tagList = []
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val()
          _this.tagList.push(childData)
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

<style>
</style>
