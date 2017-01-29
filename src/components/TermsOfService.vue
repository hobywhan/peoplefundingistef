<template>
  <div class="container bg-white">
    <div class="tos">{{msg}}</div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
export default Vue.extend({
  data () {
    return {
      msg: 'Les services :'
    }
  },
  mounted: function () {
  }
})

</script>

<style scoped>
</style>
