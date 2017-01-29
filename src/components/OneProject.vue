<template>
  <div class="one-project">
    <div class="col-md-4">
      <div class="project-item col-md-12">
        <div class="row">
          <img :src="project.image" v-if="project.image" />
          <img src="../assets/image/Drapeau_Chaoui.jpg" v-else />
        </div>
        <div class="item-info row">
          <h4 class="project-title">{{ project.title }}</h4>
          <p>{{ project.description }}</p>
          <div class="tags">
            <span v-for="item in project.tags">{{item}}</span>
          </div>
          <div class="categories">
            <span v-for="item in project.categories" v-if="item.name">{{item.name}}</span>
          </div>
          <router-link :to="{ name: 'showProject', params: { projectId: project.uid }}">Voir plus</router-link>
          <router-link :to="{ name: 'editProject', params: { projectId: project.uid }}" v-if="isuserproject">Editer</router-link>
          <a v-on:click="deleteItem(project.uid)" v-if="isuserproject">Supprimer</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'

export default Vue.extend({
  props: ['project', 'isuserproject'],
  data () {
    return {
    }
  },
  created: function () {
    if (this.project.tags !== undefined) {
      var filterTags = this.project.tags.split(';')
      for (var i = 0; i < filterTags.length; i++) {
        filterTags[i] = filterTags[i].trim()
      }
      this.project.tags = filterTags
    }
  }
})
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
.project-item {
  border: 2px solid #000;
}
.project-item .item-info {
  padding: 15px;
}
.project-item img {
  width: 100%;
}
</style>
