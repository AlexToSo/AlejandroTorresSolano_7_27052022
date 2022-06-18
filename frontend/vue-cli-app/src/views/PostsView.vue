<template>
    <section class="posts">
        <h1> Posts </h1>
        <div v-if="postList.length > 0">
            <p v-if="message">{{ message }}</p>
            <PostItem v-for="post in postList" :key="post.id" :postId="post.id" :postName="post.name"
                :postText="post.text" :postAuthor="post.email" />
        </div>
    </section>

</template>

<script>
import PostItem from "../components/PostItem"
import { mapState } from 'vuex'

export default {
    name: 'PostsView',
    components: {
        PostItem
    },
    data() {
        return {
            postList: [],
            message: "",
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
    },
    async beforeMount() {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Token ${this.token}`);
        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'GET',
                headers: myHeaders,
            });
            this.postList = await response.json();
            if (this.postList.error) throw this.postList.error;
        }
        catch (error) { this.message = error }
    }

}
</script>

<style lang="scss">
.posts {
    width: 90%;
    max-width: 40rem;
}
</style>