<template>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />

  <div class="page">
    <HeaderItem />
    <NavItem />
    <main>
      <router-view />
    </main>
  </div>

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
  font-family: Lato, sans-serif;
  color: #4E5166;
}

.link {
  color: black;
  text-decoration: none;
}

.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  color: #FD2D01;
}

main {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
