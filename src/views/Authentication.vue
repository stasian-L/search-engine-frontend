<template>
    <div class="buttons">
        <button class="auth-button" @click="this.showModal = true">Sign in</button>
        <button v-if="isLoggedIn" class="auth-button" @click="logout">Log out</button>
    </div>
    <div v-if="username" style="font-size: 12px; position: absolute; left: 10px">Account: {{username}}</div>
    <div v-if="showModal" class="modal-background">
        <div class="modal-container">
            <auth-form @close="closeForm" />
        </div>
    </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
export default {
    name: "Authentication",
    data() {
        return {
            showModal: false,
            isLoggedIn: false,
            username: null
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('authToken')
            localStorage.removeItem('suggestions')
            this.suggestions = []
            this.isLoggedIn = false;
            this.username = null;
            this.$emit('logout');
        },
        async closeForm() {
            this.showModal = false
            this.isLoggedIn = localStorage.getItem('authToken') !== null;
            if(this.isLoggedIn) {
                this.username = atob(localStorage.getItem('authToken').substring(6)).split(':')[0]
                const headers = {"Authorization": localStorage.getItem('authToken') };
                const response = await fetch('http://localhost:8080/api/search/history', {
                    method: 'GET',
                    headers,
                    mode: 'cors'
                });
                const jsonData = await response.json();
                localStorage.setItem('suggestions', jsonData.map(a => a.text));
                this.$emit('authorize');
            }
        },
    },
    async mounted() {
        this.isLoggedIn = localStorage.getItem('authToken') !== null;
        this.username = atob(localStorage.getItem('authToken').substring(6)).split(':')[0]
        if(this.isLoggedIn) {
            const headers = {"Authorization": localStorage.getItem('authToken') };
            const response = await fetch('http://localhost:8080/api/search/history', {
                method: 'GET',
                headers,
                mode: 'cors'
            });
            const jsonData = await response.json();
            localStorage.setItem('suggestions', jsonData.map(a => a.text));
        }
    },
    components: {
        AuthForm
    }
}
</script>

<style scoped>
.auth-button {
    width: 70px;
    height: 25px;
    border: 1px solid #242622;
    border-radius: 15px;
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.2);
    background-color: white;
}

.auth-button:hover, .auth-button:active {
    background-color: #333333;
    color: white;
}
.modal-background {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-container {
    position: absolute;
    top: 25%;
    width: 400px;
    z-index: 99999;
    background-color: #f2f2f2;
    border-radius: 5px;

}

.buttons {
    display: flex;
}
.buttons > button {
    margin: 5px;
}
</style>