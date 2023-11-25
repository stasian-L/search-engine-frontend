<template>
    <div class="container">
        <div v-if="isRegister">
            <h2>Registration</h2>
            <form ref="registerForm">
                <div>
                    <label for="username">Username</label>
                    <input type="text" name="username" v-model="registerData.username" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" v-model="registerData.email" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="registerData.password" required>
                </div>
                <div class="error-message" v-if="registerError"><span class="error-text">{{ registerError }}</span></div>
                <div class="buttons">
                    <button class="submit-button" type="submit" @click.prevent="register">Register</button>
                    <button class="cancel-button" type="button" @click="handleCancel">Cancel</button>
                </div>
            </form>
            <p>Already have an account? <a href="#" @click.prevent="toggleForms">Log in here</a></p>
        </div>
        <div v-else>
            <h2>Login</h2>
            <form class="login-form" ref="loginForm">
                <div>
                    <label for="username">Username</label>
                    <input type="text" name="username" v-model="loginData.username" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="loginData.password" required>
                </div>
                <div class="error-message" v-if="loginError"><span class="error-text">{{ loginError }}</span></div>
                <div class="buttons">
                    <button class="submit-button" type="submit" @click.prevent="login">Login</button>
                    <button class="cancel-button" type="button" @click="handleCancel">Cancel</button>
                </div>
            </form>
            <p>Don't have an account? <a href="#" @click.prevent="toggleForms">Register here</a></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isRegister: false,
            loginError: null,
            registerError: null,
            registerData: {
                username: '',
                email: '',
                password: ''
            },
            loginData: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async register() {
            if (!this.$refs.registerForm.checkValidity()) {
                this.$refs.registerForm.reportValidity()
                return;
            }
            const response = await fetch('http://localhost:8080/api/auth/register?username=' + this.registerData.username + '&email=' + this.registerData.email + '&password=' + this.registerData.password, {
                method: 'POST',
                mode: 'cors'
            });

            if(response.status !== 400) {
                localStorage.setItem('authToken', 'Basic ' + btoa(this.registerData.username + ':' + this.registerData.password));
                this.$emit('close', { message: 'Form closed successfully' });
            } else {
                response.text().then((text) => this.registerError = text);
            }
        },
        async login() {
            if (!this.$refs.loginForm.checkValidity()) {
                this.$refs.loginForm.reportValidity()
                return;
            }
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': 'Basic ' + btoa(this.loginData.username + ':' + this.loginData.password)
                }
            });

            console.log('###: ' + JSON.stringify(response));

            if(response.status !== 401) {
                localStorage.setItem('authToken', 'Basic ' + btoa(this.loginData.username + ':' + this.loginData.password));
                this.$emit('close', { message: 'Form closed successfully' });
            } else {
                this.loginError = "Bad credentials"
            }
        },
        toggleForms() {
            this.isRegister = !this.isRegister;
        },
        handleCancel() {
            this.$emit('close', { message: 'Form closed successfully' });
        }
    }
}
</script>

<style scoped>

.container {
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    max-width: 400px;
    margin: auto;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    font-size: 13px;
    font-weight: bold;
    align-self: flex-start;
}

input {
    padding: 10px;
    margin: 2px 10px 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,.1);
    width: 100%;
    font-size: 12px;

}

/*button[type="submit"] {*/
/*    background-color: #7C7C7CB7;*/
/*    color: white;*/
/*    border: none;*/
/*    border-radius: 5px;*/
/*    padding: 10px;*/
/*    cursor: pointer;*/
/*}*/

/*button[type="submit"]:hover {*/
/*    background-color: #4F4F4FFF;*/
/*}*/

a {
    color: #4f4f4f;
    cursor: pointer;
}

.error-message {
    background-color: #fce4e4;
    border: 1px solid #fcc2c3;
    border-radius: 6px;
    float: left;
    padding: 6px 10px;
    width: 60%;
    margin: auto auto 10px;
}

.error-text {
    color: #cc0033;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: bold;
    line-height: 20px;
    text-shadow: 1px 1px rgba(250,250,250,.3);
}
.buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.submit-button,
.cancel-button {
    font-size: 12px;
    font-weight: bold;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.submit-button {
    background-color: #7a9181;
    color: white;
    border: none;
    margin-right: -40px;
}

.submit-button:hover {
    background-color: #242622;
}

.cancel-button {
    background-color: white;
    color: #333;
    border: 2px solid #333;
    margin-left: -40px;
}

.cancel-button:hover {
    background-color: #eee;
}

div:has(> input) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
}

h2 {
    margin-bottom: 20px;
}

p {
    font-size: 12px;
}

</style>