<template>
    <nav>
        <ul class="posts-nav">
            <li><a href="#accommodations">View posts</a></li>
            <li><a href="#activities">New post</a></li>
        </ul>
        <ul class="connection-nav">
            <li><router-link to="/signup">Sign up</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'NavItem'
    //   props: {
    // msg: String
    //   }
}
</script>