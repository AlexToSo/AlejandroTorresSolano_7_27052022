<template>
    <main>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" formControlName="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" formControlName="password">
            </div>
            <button @click="onLogin">Login</button>
            <!-- <p class="text-danger" v-if="errorMsg">{{ errorMsg }}</p> -->
        </form>
    </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'LoginView',
    methods: {
        ...mapActions(["onLogin"]),
    }
}
</script>