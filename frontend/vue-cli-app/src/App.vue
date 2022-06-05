<template>

  <!-- <head> -->
    <!-- <title>Groupomania</title> -->
    <!-- <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <!-- <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
  <!-- </head> -->

  <!-- <body> -->
    <HeaderItem />
    <NavItem />
    <router-view />
  <!-- </body> -->

</template>

<script>

import HeaderItem from '@/components/HeaderItem.vue'
import NavItem from '@/components/NavItem.vue'

export default {
  name: 'App',
  components: {
    HeaderItem,
    NavItem
  }
}
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
