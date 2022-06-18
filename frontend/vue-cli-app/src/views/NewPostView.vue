<template>
    <main>
        <form id="postForm" @submit.prevent="onPost(name, text)">
            <div class="form-group">
                <label for="name">Post name</label>
                <input name="name" id="name" type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label for="text">Post text</label>
                <textarea name="text" id="text" type="text" class="form-control" v-model="text" rows="10" cols="50">
                </textarea>
            </div>
            <input type="file" name="picture" accept="image/*" @change="onChange">
            <button :disabled="!validForm">Post</button>
            <p v-if="message">{{ message }}</p>
        </form>
    </main>
</template>

<script>
import { mapState } from 'vuex'
import router from '@/router'


export default {
    name: 'NewPostView',
    data() {
        return {
            validForm: true,
            message: "",
            picture: undefined,
            name: "",
            text: "",
            postForm: undefined
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        async onPost(name, text) {
            try {
                // const formData = new FormData(this.postForm);
                const formData = new FormData();
                formData.append('name', JSON.stringify(name));
                formData.append('text', JSON.stringify(text));
                if (this.picture) formData.append('image', this.picture);
                const response = await fetch('http://localhost:3000/api/posts', {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${this.token}`
                    },
                    // body: JSON.stringify({ name, text, user_id })
                    body: formData
                });
                let json = await response.json();

                console.log(json);
                if (json.error) throw json.error;
                this.message = json.message;

                router.push('posts');
            }
            catch (error) { this.message = error }
        },
        onChange(e) {
            this.picture = e.target.files;
        }
    }
}

</script>