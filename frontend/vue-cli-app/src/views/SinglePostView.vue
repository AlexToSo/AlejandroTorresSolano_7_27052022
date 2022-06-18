<template>
    <section class="posts">
        <h1> Post </h1>
        <div v-if="post">
            <p v-if="message">{{ message }}</p>
            <PostItem :key="post.id" :postId="post.id" :postName="post.name" :postText="post.text"
                :postAuthor="post.email" />
            <div v-if="post.user_id == user_id">message secret</div>
        </div>
    </section>

</template>

<script>
import PostItem from "../components/PostItem"
import { mapState } from 'vuex'

export default {
    name: 'SinglePostView',
    components: {
        PostItem
    },
    data() {
        return {
            post: {
                id: 0,
                name: "",
                text: "",
            },
            message: "",
        }
    },
    computed: {
        ...mapState(['token', 'user_id'])
    },
    methods: {
    },
    async beforeMount() {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Token ${this.token}`);
        const postId = this.$route.params.id;
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'GET',
                headers: myHeaders,
            });
            this.post = await response.json();
            if (this.post.error) throw this.post.error;
        }
        catch (error) { this.message = error }
    }
}
</script>