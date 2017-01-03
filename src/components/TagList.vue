<template>
  <div class="tag-list">
    {{msg}}
    <form>
      <input class="form-control" type="text" v-model="tag.name" placeholder="tag.name">
      <button class="btn btn-default submit-btn" v-on:click="submit()">Ajouter</button>
    </form>
    {{msg2}}
    <ul class='tag-list'>
      <li class="tag-item" v-for="item in tagList">
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
      msg: 'Tags : ',
      tagList: [],
      tag: {
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
    firebase.database().ref('tags').on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val()
        childData.uid = childSnapshot.key
        _this.tagList.push(childData)
      })
      LoadingState.$emit('toggle', false)
    })
  }
})
</script>

<style>
</style>
