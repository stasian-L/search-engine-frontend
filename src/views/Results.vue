<template>
<!--    <div style="position: absolute; top: 10px; right: 10px"><button class="auth-button" @click="this.$router.push('auth')">Sign in</button></div>-->
<!--    <div v-if="isLoggedIn" style="position: absolute; top: 10px; right: 90px"><button class="auth-button" @click="logout">Log out</button></div>-->
    <div style="position: fixed; top: 5px; right: 5px; z-index: 3"><authentication @authorize="onAuthorize" @logout="onLogout"></authentication></div>
<!--    <div class="crawler-button"><crawler></crawler></div>-->
    <div class="header">
        <a
            href="http://localhost:8081/"
            class="header__a"
            style="outline: none"
        ><img
                title="SnailSnailGo"
                class="header__logo"
                src="../assets/logo.png"
                alt="atakata_logo"
            />
        </a>
        <div class="header__search-wrapper">
            <SearchBar @search="search" :suggestions="suggestions"/>
        </div>
    </div>
    <div class="results">
        <template v-for="result in results">
            <Result class="results__result"
                v-bind:title="result.title"
                v-bind:url="result.url"
                v-bind:description="result.description"
            />
        </template>
    </div>
</template>

<script>
    import SearchBar from '@/components/SearchBar'
    import Result from '@/components/Result.vue'
    import Crawler from "@/views/Crawler.vue";
    import Authentication from "@/views/Authentication.vue";


    export default {
        data() {
            return {
                isLoggedIn: false,
                suggestions: [],
                results: null
            }
        },
        methods: {
            search(query) {
                const url = new URL(window.location);
                url.searchParams.set('q', query.q);
                url.searchParams.set('limit', query.limit);
                url.searchParams.set('offset', query.offset);
                url.searchParams.set('location', query.region);
                window.history.pushState({}, '', url);
                this.searchRequest(query);
            },
            logout() {
                localStorage.removeItem('authToken')
                this.suggestions = [];
                this.isLoggedIn = false;
            },
            async searchRequest(query) {
                this.suggestions.unshift(query.q)
                this.suggestions = [...new Set(this.suggestions)];
                localStorage.setItem('suggestions', this.suggestions.toString());
                const headers = { "Content-Type": "application/json", "Authorization": localStorage.getItem('authToken') };
                const response = await fetch('http://localhost:8080/api/search/documents?query=' + query.q, {
                    method: 'GET',
                    headers,
                    mode: 'cors'
                });
                this.results = await response.json();
            },
            onAuthorize() {
                this.suggestions = localStorage.getItem('suggestions').split(',')
            },
            onLogout() {
                this.suggestions = []
            },
        },
        async mounted() {
            this.isLoggedIn = localStorage.getItem('authToken') !== null;
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
            this.suggestions = localStorage.getItem('suggestions').split(',')
            this.searchRequest(this.$route.query)
        },
        components: {
            Authentication,
            Crawler,
            Result,
            SearchBar
        }
        
    }
</script>

<style>
.header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin: -8px -10px;
    padding: 10px 10px;
    background-color: #fefefe;
}

.header__search-wrapper {
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 20px;
    display: block;
    float: none;
    width: 70%;
    height: 2.2em;
}

.header__logo {
    margin-top: 8px;
    margin-left: 10px;
    margin-right: -13px;
    max-height: 60px;
    max-width: 60px;
    object-fit: cover;
    opacity: 0.7;
    /*background-color: white;*/
}

.header__logo:hover {
    opacity: 1;
}

.results {
    margin-top: 120px;
    max-width: 590px;
    padding-left: 100px;
}
.results__result {
    margin-top: 30px;
}

</style>