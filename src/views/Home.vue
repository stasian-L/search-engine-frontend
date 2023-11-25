<template>
    <div class="content">
        <div style="position: absolute; top: 10px; left: 5px"><authentication @authorize="onAuthorize" @logout="onLogout"></authentication></div>
        <div class="crawler-button"><crawler></crawler></div>
        <div class="logo-wrap">
            <img
                title="SnailSnailGo"
                class="logo-wrap__image"
                src="../assets/logo.png"
                alt="atakata_logo"
                style="object-fit: contain;"
            />
            <img
                title="SnailSnailGo"
                class="logo-wrap__text"
                src="../assets/logo_text.png"
                alt="atakata_logo"
                style="object-fit: contain;"
            />
        </div>
        <div class="search-wrapper">
            <SearchBar @search="search" :suggestions="suggestions"/>
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import Crawler from "@/views/Crawler.vue";
import Authentication from "@/views/Authentication.vue";
export default {
    data() {
        return {
            suggestions: [],
        }
    },
    methods: {
        search(query) {
            this.suggestions.unshift(query.q)
            this.suggestions = [...new Set(this.suggestions)];
            localStorage.setItem('suggestions', this.suggestions.toString());

            this.$router.push({name: 'search', query: query}) 
        },
        onAuthorize() {
            this.suggestions = localStorage.getItem('suggestions').split(',')
        },
            onLogout() {
                this.suggestions = []
            },
    },
    async mounted() {
        let isLoggedIn = localStorage.getItem('authToken') !== null;
        if(isLoggedIn) {
            this.suggestions = localStorage.getItem('suggestions').split(',')
        }
    },
    components: {
        Authentication,
        Crawler,
        SearchBar
    }
}
</script>

<style>
.content {
    position: absolute;
    font: inherit;
    height: 91%;
    width: 100%;
    font-size: 100%;
    vertical-align: baseline;
    padding-top: 60px;
    margin: -8px;
    background-color: #fefefe;
}

.crawler-button {
    position: absolute;
    top: 10px;
    right: 10px;
    margin: 5px;
}

.logo-wrap {
    position: relative;
    display: block;
    max-width: 300px;
    margin: auto;
    margin-bottom: -1.2em;
    margin-top: -1.25em;
}
.logo-wrap__image {
    width: 120px;
    display: block;
    position: relative;
    margin: 0px auto;
    margin-top: 70px;
}
.logo-wrap__text {
    width: 200px;
    display: block;
    position: relative;
    margin: 0px auto;
    margin-bottom: 30px;
    margin-top: 15px;
}
.search-wrapper {
    padding: 1.3em 0.8em 1em;
    margin-left: auto;
    margin-right: auto;
    display: block;
    float: none;
    width: 70%;
    height: 2.5em;
    max-width: 1000px;
}
</style>