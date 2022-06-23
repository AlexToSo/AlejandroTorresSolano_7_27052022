<template>
    <section class="posts">
        <h1> Posts </h1>
        <div class="posts__list" v-if="postList.length > 0">
            <p v-if="message">{{ message }}</p>
            <PostItem v-for="post in postList" :key="post.id" :postId="post.id" :postName="post.name"
                :postText="post.text" :postImage="post.image_url" :postAuthor="post.email" :showLike="showLike" />
        </div>
    </section>

</template>

<script>
import PostItem from "../components/PostItem"
import { mapState, mapActions } from 'vuex'

export default {
    name: 'PostsView',
    components: {
        PostItem
    },
    data() {
        return {
            postList: [],
            message: "",
            showLike: false
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        ...mapActions(["onLogout"]),
    },
    async beforeMount() {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Token ${this.token}`);
        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'GET',
                headers: myHeaders,
            });

            if (response.status === 401) this.onLogout();
            else {
                this.postList = await response.json();
                if (this.postList.error) throw this.postList.error;
            }
        }
        catch (error) { this.message = error }
    }

}
</script>

<style lang="scss">
.posts {
    width: 90%;
    max-width: 40rem;

    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>