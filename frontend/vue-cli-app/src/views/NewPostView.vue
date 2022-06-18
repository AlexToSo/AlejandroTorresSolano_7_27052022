<template>
    <section class="post-edition">
        <h1> New post </h1>
        <!-- <form id="postForm" @submit.prevent="onPost(name, text)" enctype="multipart/form-data"> -->
        <form action="http://localhost:3000/api/posts" enctype="multipart/form-data" method="post">
            <div class="form-group">
                <label for="name">Post name</label>
                <input name="name" id="name" type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label for="text">Post text</label>
                <textarea name="text" id="text" type="text" class="form-control" v-model="text" rows="10" cols="50">
                </textarea>
            </div>
            <div class="form-group">
                <input type="file" name="image" accept="image/*" @change="onChange">
            </div>
            <button :disabled="!validForm">Post</button>
            <p v-if="message">{{ message }}</p>
        </form>
    </section>
</template>

<script>
import { mapState } from 'vuex'
// import router from '@/router'


export default {
    name: 'NewPostView',
    data() {
        return {
            validForm: true,
            message: "",
            image: undefined,
            name: "",
            text: "",
            postForm: undefined
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        // async onPost(name, text) {
        // // async onPost() {
        //     try {
        //         // const formData = new FormData(this.postForm);
        //         const formData = new FormData();
        //         formData.append('name', JSON.stringify(name));
        //         formData.append('text', JSON.stringify(text));
        //         if (this.image) formData.append('image', this.image);
        //         console.log(formData)
        //         const response = await fetch('http://localhost:3000/api/posts', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //                 'Authorization': `token ${this.token}`
        //             },
        //             // body: JSON.stringify({ name, text, user_id })
        //             body: formData
        //         });
        //         let json = await response.json();

        //         console.log(json);
        //         if (json.error) throw json.error;
        //         this.message = json.message;

        //         router.push('posts');
        //     }
        //     catch (error) { this.message = error }
        // },
        onChange(e) {
            this.image = e.target.files;
        }
    }
}

</script>