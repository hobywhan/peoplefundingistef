<template>
  <div class="category-list">
    {{msg}}
    <form>
      <input class="form-control" type="text" v-model="category.name" placeholder="category.name">
      <button class="btn btn-default submit-btn" v-on:click="submit()">Ajouter</button>
    </form>
    {{msg2}}
    <ul class='category-list'>
      <li class="category-item" v-for="item in categoryList">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'

export default Vue.extend({
  components: {
  },
  data () {
    return {
      msg: 'Ajouter une catégorie : ',
      msg2: 'Catégories : ',
      categoryList: [],
      category: {
        name: ''
      }
    }
  },
  methods: {
    submit() {
      firebase.database().ref('categories').push(this.category)
    }
  },
  mounted: function () {
    var _this = this
    LoadingState.$emit('toggle', true)
    firebase.database().ref('categories').on('value', function(snapshot) {
      _this.categoryList = []
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val()
        childData.uid = childSnapshot.key
        _this.categoryList.push(childData)
      })
      LoadingState.$emit('toggle', false)
    })
  }
})
</script>

<style>
</style>
