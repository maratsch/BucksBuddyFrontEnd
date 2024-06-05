// src/router/index.ts

import { createRouter, createWebHashHistory } from 'vue-router';
import NewJourney from '@/views/NewJourney.vue';
import User from '@/views/User.vue';
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/newjourney',
            name: 'newjourney',
            component: NewJourney
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/user',
            name: 'user',
            component: User
        }
    ]
});

export default router;

