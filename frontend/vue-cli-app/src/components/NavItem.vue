<template>
    <nav>
        <ul class="posts-nav" v-if="isAuth">
            <li>
                <router-link to="/posts">View posts</router-link>
            </li>
            <li>
                <router-link to="/new-post">New post</router-link>
            </li>
            <li>
                <router-link to="/" @click="onLogout">Log out</router-link>
            </li>
        </ul>
        <ul class="connection-nav" v-else>
            <li>
                <router-link to="/signup">Sign up</router-link>
            </li>
            <li>
                <router-link to="/login">Login</router-link>
            </li>
        </ul>
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