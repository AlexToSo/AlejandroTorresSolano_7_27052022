<template>
    <PostFormItem :action="action" :message="message" @submitForm="onPost" />
</template>

<script>
import PostFormItem from "../components/PostFormItem"
import { mapState, mapActions } from 'vuex'
import router from '@/router'


export default {
    name: 'NewPostView',
    components: {
        PostFormItem
    },
    data() {
        return {
            message: "",
            // image: undefined,
            action: "New"
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        ...mapActions(["onLogout"]),
        async onPost(post) {
            try {
                const formData = new FormData();
                formData.append('name', post.name);
                formData.append('text', post.text);
                if (post.image) formData.append('image', post.image);
                const response = await fetch('http://localhost:3000/api/posts', {
                    method: 'POST',
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