<template>
  <div class="one-project">
    <h4 class="project-title">{{ project.title }}</h4>
    <p>{{ project.description }}</p>
    <div class="tags">
      <span v-for="item in tags">{{item}}</span>
    </div>
    <div class="categories">
      <span v-for="item in project.categories" v-if="item.name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project'],
  data () {
    return {
      tags: []
    }
  },
  created: function () {
    if (this.project.tags !== undefined) {
      for (var i = 0; i < this.project.tags.split(';').length; i++) {
        this.tags.push(this.project.tags.split(';')[i])
      }
    }
  }
}
</script>

<style>
.one-project .tags span {
  background-color: #2ecc71;
  margin-right: 5px;
  padding: 3px;
  display: inline-block;
}
.one-project .categories span {
  background-color: #3498db;
  margin-right: 5px;
  padding: 3px;
  display: inline-block;
}
</style>
