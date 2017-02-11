
<template>
  <div class="container bg-white">
    <div class="">
      <h2 class="title">Tous les projets :</h2>
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
      <div class="project-list">
        <projectli :project="item" v-for="item in projectList"></projectli>
        <div class="clearfix visible-xs-block"></div>
      </div>
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
  props: [],
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
      },
      titleFilter: this.$route.params.titleFilter
    }
  },
  watch: {
    filter: {
      handler: function(val, oldVal) {
        this.filterList(val)
      },
      deep: true,
      immediate: true
    },
    titleFilter: {
      handler: function(val, oldVal) {
        this.filter.title = val
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

          if (filter.title !== '' && filter.title !== undefined) {
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
  mounted: function () {
    this.showList()
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.filter-projects {
  margin-bottom: 20px;
}
.project-list {
    -moz-column-count: 3;
    -moz-column-gap: 15px;
    -webkit-column-count: 3;
    -webkit-column-gap: 15px;
    column-count: 3;
    column-gap: 15px;
    width: 100%;
}

.project-list .one-project {
    display: inline-block;
    width: 100%;
}
</style>
