<template>
    <div>
        <div class="header">
            <div>
                <a
                    href="http://localhost:8080/"
                    class="header__a"
                    style="outline: none">
                    <img
                        title="SnailSnailGo"
                        class="header__logo"
                        src="../assets/logo.png"
                        alt="atakata_logo" />
                </a>

            </div>
            <div class="header__search-wrapper">
                    <SearchBar
                        @search="search"
                        :suggestions="suggestions" />
            </div>
            <authentication
                @authorize="onAuthorize"
                @logout="onLogout"></authentication>
        </div>
    </div>
    <main class="main">
        <div class="results">
            <template v-for="(result, index) in results" :key="index">
                <Result
                    class="results__result"
                    v-bind:title="result?.title"
                    v-bind:url="result?.url"
                    v-bind:description="result?.description" />
            </template>
        </div>
    </main>
</template>

<script>
import Result from '@/components/Result.vue';
import SearchBar from '@/components/SearchBar';
import Authentication from '@/views/Authentication.vue';

export default {
    data() {
        return {
            isLoggedIn: false,
            suggestions: [],
            results: null
        };
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
            localStorage.removeItem('authToken');
            this.suggestions = [];
            this.isLoggedIn = false;
        },
        async searchRequest(query) {
            this.suggestions?.unshift(query.q);
            this.suggestions = [...new Set(this.suggestions)];
            localStorage.setItem('suggestions', this.suggestions.toString());
            const headers = { 'Content-Type': 'application/json', Authorization: localStorage.getItem('authToken') };
            const response = await fetch('http://localhost:8080/api/search/documents?query=' + query.q, {
            method: 'GET',
            headers,
            mode: 'cors'
            });
            this.results = await response.json();
                    },
        onAuthorize() {
            this.suggestions = localStorage.getItem('suggestions')?.split(',');
        },
        onLogout() {
            this.suggestions = [];
        }
    },
    async mounted() {
        this.isLoggedIn = localStorage.getItem('authToken') !== null;
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
        this.suggestions = localStorage.getItem('suggestions')?.split(',');
        this.searchRequest(this.$route.query);
    },
    components: {
        Authentication,
        Result,
        SearchBar
    }
};
</script>

<style scoped>
.header {
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
    left: 0;
    min-width: 600px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    background-color: #effaea;
}

.header .search {
    display: flex;
    flex: 1;
}

.header > * {
    padding: 10px;
}

.header__search-wrapper {
    margin: 20px;
    display: block;
    float: none;
    width: 60%;
}

.header__logo {
    margin-top: 8px;
    margin-left: 10px;
    margin-right: -13px;
    max-height: 60px;
    max-width: 60px;
    object-fit: cover;
    opacity: 0.7;
}

.header__logo:hover {
    opacity: 1;
}

.main {
    box-sizing: border-box;
    min-width: 600px;
    min-height: 100%;
    position: relative;
    padding-top: 120px;
    padding-bottom: 6px;
}

.results {
    max-width: 590px;
    padding-left: 100px;
    margin: auto;
}
</style>
