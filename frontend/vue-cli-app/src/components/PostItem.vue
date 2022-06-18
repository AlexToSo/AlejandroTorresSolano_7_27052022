<template>
    <!-- <article class="post-prev" @click="onClick(postId)"> -->
    <router-link :to="'/single-post/' + postId">
        <!-- <a :href="werwer"> -->
        <!-- <a :href=`product.html?id=${article._id}`> -->
        <div class="post-prev__image">
            <!-- <img :src="imageSource"> -->
        </div>
        <div class="post-prev__text">
            <div>
                <h3>{{ postName }}</h3>
                <strong v-if="postAuthor">By {{ postAuthor }}</strong>
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
        <!-- </article> -->
    </router-link>
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
</style>