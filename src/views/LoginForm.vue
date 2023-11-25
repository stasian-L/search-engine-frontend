<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div>
                <label>Username</label>
                <input type="text" v-model="username" required>
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="password" required>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        async register() {
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });

                console.log('###: ' + JSON.stringify(response));

                localStorage.setItem('auth', 'Basic ' + btoa(this.username + ':' + this.password));

                this.$router.push("/login");
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<style scoped>

</style>