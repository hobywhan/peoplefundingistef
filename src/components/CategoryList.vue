<template>
  <div class="container bg-white">
    <div class="categories">
      <div class="category-add">
        <h3>Ajouter une catégorie : </h3>
        <input class="form-control" type="text" v-model="category" placeholder="category">
        <button class="btn btn-default submit-btn" v-on:click="submit()">Ajouter</button>
      </div>
      <div class="category-list">
        <h3>Catégories : </h3>
        <ul>
          <li class="category-item" v-for="item in categoryList">
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
      categoryList: [],
      category: 'pizza'
    }
  },
  methods: {
    submit() {
      for (var i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i] === this.category) {
          return
        }
      }
      firebase.database().ref('categories').push(this.category)
      VueNotifications.success({message: 'Catégorie ajouté'})
    },
    showList() {
      var _this = this
      LoadingState.$emit('toggle', true)
      firebase.database().ref('categories').on('value', function(snapshot) {
        _this.categoryList = []
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val()
          _this.categoryList.push(childData)
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
