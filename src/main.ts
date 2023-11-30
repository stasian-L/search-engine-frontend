import AuthForm from '@/components/AuthForm.vue';
import Crawler from '@/views/Crawler.vue';
import Home from '@/views/Home.vue';
import Results from '@/views/Results.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/search',
        name: 'search',
        component: Results
    },
    {
        path: '/crawler',
        name: 'crawler',
        component: Crawler
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthForm
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app');
