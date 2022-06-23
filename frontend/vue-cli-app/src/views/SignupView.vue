<template>
    <section class="connection">
        <h1> Sign up </h1>
        <form @submit.prevent="onSignup(email, password)">
            <div class="form-group">
                <label for="email">Email</label>
                <input name="email" id="email" type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input name="password" id="password" type="password" class="form-control" v-model="password">
            </div>
            <button :disabled="!validForm">Sign up</button>
            <p v-if="message">{{ message }}</p>
        </form>
    </section>
</template>

<script>

export default {
    name: 'SignupView',
    data() {
        return {
            validForm: true,
            message: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async onSignup(email, password) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                let json = await response.json();

                if (json.error) throw json.error;
                this.message = json.message;
            }
            catch (error) { this.message = error }
        }
    }
}
</script>