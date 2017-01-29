
<template>
  <div class="main-menu bg-white">
    <div class="container">
      <div class="right-menu">

        <!-- <nav class="navbar navbar-default">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/"><img src="../assets/logo.png" width="250"/></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav navbar-right">
                <router-link role="presentation" tag="li" v-for="item in arrNav" v-if="item.auth != authenticated" :to="{ name: item.name }" exact>
                  <a class="title2">{{ item.title }}</a>
                </router-link>
                <li>
                  <a v-if="authenticated" class="title2" v-on:click="logout()">Déconnexion</a>
                  <a v-else class="title2" v-on:click="login()">Connexion</a>
                </li>
              </ul>
            </div>
          </div>
        </nav> -->

        <router-link class="logo" to="/">
          <img src="../assets/logo.png" width="250"/>
        </router-link>
        <ul class="nav nav-pills row">
          <router-link role="presentation" tag="li" v-for="item in arrNav" v-if="item.auth != authenticated" :to="{ name: item.name }" exact>
            <a class="title2">{{ item.title }}</a>
          </router-link>
          <li>
            <a v-if="authenticated" class="title2" v-on:click="logout()">Déconnexion</a>
            <a v-else class="title2" v-on:click="login()">Connexion</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue'
import firebase from 'firebase'
import {router, AuthenticatedState} from '../main.js'

export default Vue.extend({
  props: ['authenticated'],
  data () {
    return {
      arrNav: [
      {
        'title': 'Explorer',
        'id': '/projectlist',
        'name': 'listProject',
        'auth': true
      },
      {
        'title': 'Explorer',
        'id': '/projectlist',
        'name': 'listProject',
        'auth': false
      },
      {
        'title': 'Mes projets',
        'id': '/myprojects',
        'name': 'userProject',
        'auth': false
      },
      {
        'title': 'Proposer',
        'id': '/login',
        'name': 'login',
        'auth': true
      },
      {
        'title': 'Proposer',
        'id': '/enterproject',
        'name': 'newProject',
        'auth': false
      },
      {
        'title': 'Mon compte',
        'id': '/myaccount',
        'name': 'account',
        'auth': false
      }],
      cur: ' '
    }
  },
  methods: {
    login() {
      router.push({path: '/login'})
    },
    logout() {
      firebase.auth().signOut().then(function() {
        AuthenticatedState.$emit('toggle', false)
        router.push({path: '/'})
      }, function(error) {
        console.log(error)
      })
    }
   },
  mounted: function () {
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .main-menu {
    height: 200px;
  }
  li .title2 {
    font-size: 18px;
  }
  .nav-pills > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
    color: #000;
    background-color: transparent;
    border-bottom: 5px solid #FDB719;
  }
  .nav-pills > li > a {
    border-radius: 0px;
  }
  .right-menu {
    position: relative;
    min-height: 200px;
  }
  .nav.nav-pills {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  .logo {
    position: absolute;
    bottom: 40px;
    left: 40px;
  }
</style>
