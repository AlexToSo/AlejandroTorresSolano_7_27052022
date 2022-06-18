<template>
    <nav>
        <div class="nav-group" v-if="isAuth">
            <router-link to="/posts" class="nav-group__link link">View posts</router-link>
            <router-link to="/new-post" class="nav-group__link link">New post</router-link>
            <router-link to="/" @click="onLogout" class="nav-group__link link">Log out</router-link>
        </div>
        <div class="nav-group" v-else>
            <router-link to="/signup" class="nav-group__link link">Sign up</router-link>
            <router-link to="/login" class="nav-group__link link">Login</router-link>
        </div>
    </nav>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    name: 'NavItem',
    computed: {
        ...mapState(['isAuth'])
    },
    methods: {
        ...mapActions(["onLogout"]),
    }
}
</script>

<style lang="scss">
nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    // text-align: center;
}

.nav-group {
    margin: 1rem;
    &__link {
        margin: 1rem;
    }
}
</style>