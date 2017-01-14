
<template>
  <div class="project-list">
    <div class="">
      <h2>Tous les projets :</h2>
      <div class="filter-projects">
        <label>Titre : </label>
        <input type="text" v-model="filter.title">
        <label>Tags : </label>
        <input type="text" v-model="filter.tags">
        <label>Categories : </label>
        <select v-model="filter.categories" v-if="categoryList.length > 0" multiple>
          <option v-for="category in categoryList" v-bind:value="category.key">{{category.name}}</option>
        </select>
      </div>
      <ul class='project-list'>
        <li class="project-item" v-for="item in projectList">
          <projectli :project="item"></projectli>
          <router-link :to="{ name: 'showProject', params: { projectId: item.uid }}">Voir plus</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {LoadingState} from '../main.js'
import _ from 'underscore'
import projectli from './OneProject.vue'

export default Vue.extend({
  components: {
    projectli
  },
  data () {
    return {
      prRef: firebase.database().ref('projects'),
      projectList: [],
      categoryList: [],
      filter: {
        title: '',
        tags: '',
        categories: []
      }
    }
  },
  watch: {
    filter: {
      handler: function(val, oldVal) {
          this.filterList(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    showList() {
      LoadingState.$emit('toggle', true)
      firebase.database().ref('categories').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.categoryList.push({
            key: childSnapshot.key,
            name: childSnapshot.val()
          })
        })
        LoadingState.$emit('toggle', false)
      }).catch(() => {
        LoadingState.$emit('toggle', false)
      })
    },
    filterList(filter) {
      var _this = this
      LoadingState.$emit('toggle', true)
      this.prRef.once('value', function(snapshot) {
        _this.projectList = []
        snapshot.forEach(function(childSnapshot) {
          var isFiltered = true
          var childData = childSnapshot.val()
          childData.uid = childSnapshot.key
          var i

          if (filter.title !== '') {
              isFiltered = childData.title.includes(filter.title)
          }

          if (filter.tags !== '' && isFiltered) {
            if (childData.tags === undefined || childData.tags === '') {
              isFiltered = false
            } else {
              var childTags = childData.tags.split(';')
              var filterTags = filter.tags.split(';')
              for (i = 0; i < filterTags.length; i++) {
                if (!_.contains(_.map(childTags, tag => tag.trim()), filterTags[i].trim())) {
                  isFiltered = false
                  break
                }
              }
            }
          }

          if (filter.categories.length > 0 && isFiltered) {
            if (childData.categories === undefined || childData.categories.length < 1) {
              isFiltered = false
            } else {
              for (i = 0; i < filter.categories.length; i++) {
                if (!_.contains(_.map(childData.categories, cat => cat.key), filter.categories[i])) {
                  isFiltered = false
                  break
                }
              }
            }
          }

          if (isFiltered) {
            _this.projectList.push(childData)
          }
        })
        LoadingState.$emit('toggle', false)
      }).catch(() => {
        LoadingState.$emit('toggle', false)
      })
    }
  },
  created: function () {
    this.showList()
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.close-btn{
  display: inline-block;
  margin-left: 10px;
}
.project-title{
  display: inline-block;
}
.project-item{
  border-bottom: 1px dotted #999;
  padding-bottom: 10px;
}
.project-list{
  list-style: none;
  padding-left: 0;
}

</style>
