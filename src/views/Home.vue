<template>
    <div class="content">
        <header>
            <crawler></crawler>
            <authentication
                @authorize="onAuthorize"
                @logout="onLogout"></authentication>
        </header>   
        <div class="logo-wrap">
            <img
                title="SnailSnailGo"
                class="logo-wrap__image"
                src="../assets/logo.png"
                alt="atakata_logo"
                style="object-fit: contain" />
            <img
                title="SnailSnailGo"
                class="logo-wrap__text"
                src="../assets/logo_text.png"
                alt="atakata_logo"
                style="object-fit: contain" />
        </div>
        <div class="search-wrapper">
            <SearchBar
                @search="search"
                :suggestions="suggestions" />
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import Authentication from '@/views/Authentication.vue';
import Crawler from '@/views/Crawler.vue';
export default {
    data() {
        return {
            suggestions: []
        };
    },
    methods: {
        search(query) {
            this.suggestions?.unshift(query.q);
            this.suggestions = [...new Set(this.suggestions)];
            localStorage.setItem('suggestions', this.suggestions.toString());

            this.$router.push({ name: 'search', query: query });
        },
        onAuthorize() {
            this.suggestions = localStorage.getItem('suggestions').split(',');
        },
        onLogout() {
            this.suggestions = [];
        }
    },
    async mounted() {
        let isLoggedIn = localStorage.getItem('authToken') !== null;
        if (isLoggedIn) {
            this.suggestions = localStorage.getItem('suggestions')?.split(',');
        }
    },
    components: {
        Authentication,
        Crawler,
        SearchBar
    }
};
</script>

<style scoped>
.content {
    font: inherit;
    width: 100%;
}

header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.logo-wrap {
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
    max-width: 1000px;
}
</style>
