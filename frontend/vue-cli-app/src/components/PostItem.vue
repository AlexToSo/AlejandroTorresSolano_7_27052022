<template>
    <article class="post-prev">
        <router-link class="link" :to="'/single-post/' + postId">
            <img class="post-prev__image" :src="postImage">
            <div class="post-prev__text">
                <div>
                    <h2>{{ postName }}</h2>
                    <h3 v-if="postAuthor">By {{ postAuthor }}</h3>
                    <p>
                        {{ postText }}
                    </p>
                </div>
                <div v-if="showLike" class="heart">
                    <i v-if="!liked" class="far fa-heart" @click="addReaction(1)"></i>
                    <i v-else class="fas fa-heart red" @click="addReaction(0)"></i>
                </div>
            </div>
        </router-link>
    </article>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'PostItem',
    props: {
        postId: {
            type: Number,
            required: true
        },
        imageSource: {
            type: String,
            required: false
        },
        postName: {
            type: String,
            required: true
        },
        postText: {
            type: String,
            required: true
        },
        postImage: {
            type: undefined,
            required: true
        },
        postAuthor: {
            type: String,
            required: false
        },
        showLike: {
            type: Boolean,
            required: true
        },
        liked: {
            type: Boolean,
            require: false
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        async addReaction(like) {
            this.$emit('addReaction', like)
        }
    }
}
</script>

<style lang="scss">
.post-prev {
    width: 80%;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 25px;

    &__image {
        width: 100%;
    }

    &__text {
        text-align: center;
        padding: 10px 20px;
    }
}

.red {
    color: red;
}
</style>