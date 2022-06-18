<template>
    <article class="post-prev">
        <router-link class="link" :to="'/single-post/' + postId">
            <!-- <a :href="werwer"> -->
            <!-- <a :href="'/api/posts/single-post/' + postId"> -->
            <div class="post-prev__image">
                <!-- <img :src="imageSource"> -->
            </div>
            <div class="post-prev__text">
                <div>
                    <h2>{{ postName }}</h2>
                    <h3 v-if="postAuthor">By {{ postAuthor }}</h3>
                    <p>
                        {{ postText }}
                    </p>
                </div>
                <!-- <div class="heart">
                    <i class="far fa-heart"></i>
                    <i class="fas fa-heart heart__bg"></i>
                </div> -->
            </div>
            <!-- </a> -->

        </router-link>
    </article>
</template>

<script>
import router from '@/router'

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
        postAuthor: {
            type: String,
            required: false
        }
    },
    methods: {
        // ...mapActions(["onLogin"]),
        // ...mapActions(['setToken']),

        onClick(postId) {
            console.log(postId)
            // router.push({ name: 'single-post', params: {id: postId}});
            router.push({ path: `/single-post/${postId}` });

            // input type = field ==> vue input field
            // regex email
        }
    }
}
</script>

<style lang="scss">
.post-prev {
    margin: 3rem 0 3rem 0;
    background-color: white;
    overflow: hidden;
    border-radius: 1rem;
    border: 0.5rem solid #FFD7D7;
    box-shadow: 0 0.5rem 2rem #656565;

    // &__image {
    //     height: 30rem;
    //     @include img-ratio;
    // }

    &__text {
        padding: 2rem;
        position: relative;
        overflow: hidden;
        h2,
        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>