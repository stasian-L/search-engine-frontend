<template>
    <h3 class="title">Web Crawler</h3>
    <div class="crawl-url-form">
        <form @submit.prevent="handleSubmit" ref="form">
            <div class="input-container">
                <label class="input-label">URL</label>
                <div class="input-wrapper">
                    <input class="input-field" type="url" v-model="url" required/>
                </div>
                <label class="input-label">depth</label>
                <div class="input-wrapper">
                    <input class="input-field" type="number" min="-1" v-model="depth" required/>
                </div>
            </div>
            <div class="buttons">
                <button class="submit-button" type="submit">Submit</button>
                <button class="cancel-button" type="button" @click="handleCancel">Cancel</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: "",
            depth: 0
        };
    },
    methods: {
        async handleSubmit() {
            if (!this.$refs.form.checkValidity()) {
                this.$refs.form.reportValidity()
                return;
            }
            // Handle form submission logic here
            const response = await fetch('http://localhost:8080/api/crawler/crawl/url/depth?url=' + this.url + '&' + 'depth=' + this.depth, {
                method: 'POST',
                mode: 'cors'
            });
            // Reset form fields
            this.url = "";
            this.$emit('close', { message: 'Form closed successfully' });
        },
        handleCancel() {
            this.url = "";
            this.$emit('close', { message: 'Form closed successfully' });
        },
    },
};
</script>
<style scoped>
.title {
    margin-bottom: 5px;
}

.crawl-url-form {
    padding: 20px;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.input-label {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 2px;
    margin-top: 10px;
}

.input-wrapper {
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 4px;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-field {
    flex: 1;
    border: none;
    font-size: 12px;
    color: #333;
    background-color: transparent;
    outline: none;
}

.input-field::placeholder {
    color: #999;
}

.buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
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
}

.submit-button:hover {
    background-color: #242622;
}

.cancel-button {
    background-color: white;
    color: #333;
    border: 2px solid #333;
}

.cancel-button:hover {
    background-color: #eee;
}
</style>