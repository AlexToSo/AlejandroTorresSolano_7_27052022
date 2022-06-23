<template>
    <PostFormItem :action="action" :message="message" @submitForm="onModify" />
</template>

<script>
import PostFormItem from "../components/PostFormItem"
import { mapState } from 'vuex'
import router from '@/router'


export default {
    name: 'ModifyPostView',
    components: {
        PostFormItem
    },
    data() {
        return {
            message: "",
            image: undefined,
            action: "Modify"
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        async onModify(post) {
            const postId = this.$route.params.id;
            try {
                const formData = new FormData();
                formData.append('name', JSON.stringify(post.name));
                formData.append('text', JSON.stringify(post.text));
                if (this.image) formData.append('image', this.image);
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.token}`
                    },
                    body: formData
                });
                let json = await response.json();

                if (json.error) throw json.error;
                this.message = json.message;

                router.push('posts');
            }
            catch (error) { this.message = error }
        },
        onChange(e) {
            this.image = e.target.files;
        }
    }
}

</script>