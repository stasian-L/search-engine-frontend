<template>
    <div class="buttons">
        <button
            v-if="!isLoggedIn"
            class="auth-button"
            @click="onLogin">
            Sign in
        </button>
        <div class="acc-drop" v-if="isLoggedIn">
            <Dropdown>
                <template #trigger>
                    <button class="btn auth-button">Account</button>
                </template>
                <ul class="menu-list">
                    <li>
                        <div class="menu-item">Account: <b>{{ username }}</b></div>
                    </li>
                    <li>
                        <div 
                        class="menu-item"
                        @click="logout">
                        Log out
                    </div>
                    </li>
                </ul>
            </Dropdown>
        </div>
    </div>
</template>

<script>
import Dropdown from 'v-dropdown'
export default {
    components: {
        Dropdown
    },
    name: 'AuthenticationForm',
    data() {
        return {
            showModal: false,
            isLoggedIn: false,
            username: null
        };
    },
    methods: {
        onLogin() {
            this.$router.push({name:'auth'})
        },
        logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('suggestions');
            this.suggestions = [];
            this.isLoggedIn = false;
            this.username = null;
            this.$emit('logout');
        },
        async closeForm() {
            this.showModal = false;
            this.isLoggedIn = localStorage.getItem('authToken') !== null;
            if (this.isLoggedIn) {
                this.username = window.atob(localStorage.getItem('authToken')?.substring(6))?.split(':')[0];
                const headers = { Authorization: localStorage.getItem('authToken') };
                const response = await fetch('http://localhost:8080/api/search/history', {
                    method: 'GET',
                    headers,
                    mode: 'cors'
                });
                const jsonData = await response.json();
                localStorage.setItem(
                    'suggestions',
                    jsonData.map(a => a.text)
                );
                this.$emit('authorize');
            }
        }
    },
    async mounted() {
        this.isLoggedIn = localStorage.getItem('authToken') !== null;
        this.username = atob(localStorage.getItem('authToken')?.substring(6)).split(':')[0];
        if (this.isLoggedIn) {
            const headers = { Authorization: localStorage.getItem('authToken') };
            const response = await fetch('http://localhost:8080/api/search/history', {
                method: 'GET',
                headers,
                mode: 'cors'
            });
            const jsonData = await response.json();
            localStorage.setItem(
                'suggestions',
                jsonData.map(a => a.text)
            );
        }
    },
};
</script>

<style scoped>
.auth-button {
    width: 70px;
    height: 25px;
    border: 1px solid #242622;
    border-radius: 15px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
    background-color: white;
}

.auth-button:hover,
.auth-button:active {
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
    gap: 5px;
}

.menu-item {
    display: block;
    padding: 5px 0;
    color: #333;
    font-size: 12px;
    text-decoration: none;
    text-align: left;
    font-family:Arial, Helvetica, sans-serif;
}

.menu-item:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.menu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

}
</style>
