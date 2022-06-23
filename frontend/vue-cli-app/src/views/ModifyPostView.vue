<template>
    <PostFormItem :action="action" :message="message" @submitForm="onModify" />
</template>

<script>
import PostFormItem from "../components/PostFormItem"
import { mapState, mapActions } from 'vuex'
import router from '@/router'


export default {
    name: 'ModifyPostView',
    components: {
        PostFormItem
    },
    data() {
        return {
            message: "",
            action: "Modify"
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        ...mapActions(["onLogout"]),
        async onModify(post) {
            const postId = this.$route.params.id;
            try {
                const formData = new FormData();
                formData.append('name', post.name);
                formData.append('text', post.text);
                if (post.image) formData.append('image', post.image);
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.token}`
                    },
                    body: formData
                });

                if (response.status === 401) this.onLogout();
                else {
                    let json = await response.json();

                    if (json.error) throw json.error;
                    this.message = json.message;

                    router.push('posts');
                }

            }
            catch (error) { this.message = error }
        }
    }
}

</script>