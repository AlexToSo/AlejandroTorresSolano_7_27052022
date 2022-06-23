<template>
    <section class="posts">
        <h1> Post </h1>
        <div class="posts__list" v-if="post">
            <p v-if="message">{{ message }}</p>
            <PostItem :key="post.id" :postId="post.id" :postName="post.name" :postText="post.text"
                :postImage="post.image_url" :postAuthor="post.email" :showLike="showLike" :liked="post.liked"
                @addReaction="onAddReaction" />
            <div v-if="post.user_id == user_id || user_id == 0">
                <button @click="onDelete()">Delete</button>
                <button @click="onModify()">Modify</button>
            </div>
        </div>
    </section>

</template>

<script>
import PostItem from "../components/PostItem"
import { mapState } from 'vuex'
import router from '@/router'

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
                liked: false,
                image_url: ""
            },
            message: "",
            showLike: true,
        }
    },
    computed: {
        ...mapState(['token', 'user_id'])
    },
    methods: {
        async onDelete() {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${this.token}`);
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
                    method: 'DELETE',
                    headers: myHeaders,
                });
                const json = await response.json();

                if (json.error) throw json.error;
                this.message = json.message;
            }
            catch (error) { this.message = error }
        },
        async onModify() {
            router.push(`/modify-post/${this.post.id}`);
        },
        async onAddReaction(like) {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${this.post.id}/like`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ like })
                });
                let json = await response.json();

                if (json.error) throw json.error;
                this.message = json.message;
                this.onGetPost();
            }
            catch (error) { this.message = error }
        },
        async onGetPost() {
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
    },
    async beforeMount() { this.onGetPost() }

}
</script>

<!-- <style lang="scss">
.posts {
    width: 90%;
    max-width: 40rem;
    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style> -->