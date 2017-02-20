
<template>
  <div class="main-menu bg-white">
    <div class="container">
      <div class="right-menu-head row">
        <router-link class="logo" to="/">
          <img src="../assets/logo.png" width="250"/>
        </router-link>
        <ul class="nav nav-pills right-menu">
          <li class="col-md-2 col-sm-6 col-xs-12">
            <a v-if="authenticated" class="title2" v-on:click="logout()">Déconnexion</a>
          </li>
          <router-link role="presentation" tag="li" class="col-md-2 col-sm-6 col-xs-12" v-for="item in arrNav" v-if="item.auth != authenticated" :to="{ name: item.name }" exact>
            <a class="title2">{{ item.title }}</a>
          </router-link>
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
        'title': 'Connexion',
        'id': '/login',
        'name': 'login',
        'auth': true
      },
      {
        'title': 'Mon compte',
        'id': '/myaccount',
        'name': 'account',
        'auth': false
      },
      {
        'title': 'Proposer',
        'id': '/enterproject',
        'name': 'newProject',
        'auth': true
      },
      {
        'title': 'Proposer',
        'id': '/enterproject',
        'name': 'newProject',
        'auth': false
      },
      {
        'title': 'Explorer',
        'id': '/projectlist',
        'name': 'listProject',
        'auth': false
      },
      {
        'title': 'Explorer',
        'id': '/projectlist',
        'name': 'listProject',
        'auth': true
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
    /*height: 200px;*/
  }
  li .title2 {
    font-size: 18px;
  }
  .right-menu > li {
    float: right;
  }
  .right-menu > li.active > a, .right-menu > li.active > a:focus, .right-menu > li.active > a:hover {
    color: #000;
    background-color: transparent;
    border-bottom: 5px solid #FDB719;
  }
  .nav-pills > li > a {
    border-radius: 0px;
  }
  .right-menu-head {
    position: relative;
    min-height: 200px;
  }
  .right-menu {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    text-align: center;
  }
  .logo {
    position: absolute;
    bottom: 40px;
    left: 40px;
  }

  @media (max-width: 768px) {
    .right-menu {
      position: relative;
      width: 100%;
      text-align: center;
    }
    .logo {
      position: relative;
      text-align: center;
      display: block;
      margin-left: auto;
      margin-right: auto;
      bottom: 0px;
      left: 0px;
    }
  }
</style>
