<template>
    <section class="post-edition">
        <h1> {{ action }} post </h1>
        <form id="postForm" @submit.prevent="onSubmit(name, text)" enctype="multipart/form-data">
            <!-- <form action="http://localhost:3000/api/posts" enctype="multipart/form-data" method="post"> -->
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
export default {
    name: 'PostFormItem',
    data() {
        return {
            validForm: true,
            name: "",
            text: ""
        }
    },
    props: {
        action: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    methods: {
        onSubmit(name, text) {
            this.$emit('submitForm', { name, text })
        }
    }
}
</script>

<style lang="scss">
</style>