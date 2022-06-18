<template>
    <main>
        <form @submit.prevent="onLogin(email, password)">
            <div class="form-group">
                <label for="email">Email</label>
                <input name="email" id="email" type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input name="password" id="password" type="password" class="form-control" v-model="password">
            </div>
            <button :disabled="!validForm">Login</button>
            <p v-if="message">{{ message }}</p>
        </form>
    </main>
</template>

<script>
// import { mapActions } from 'vuex'
import router from '@/router'

export default {
    name: 'LoginView',
    data() {
        return {
            validForm: true,
            message: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async onLogin(email, password) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                let json = await response.json();

                if (json.error) throw json.error;

                this.message = "";
                this.$store.commit('SAVE_AUTH', [json.token, json.user_id]);

                router.push('posts');
            }
            catch (error) { this.message = error }

            // input type = field ==> vue input field
            // regex email
        }
    }
}
</script>