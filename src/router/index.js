import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworksView from '@/views/NetworksView.vue';
import NetworkLoadoutSingle from '@/views/NetworkLoadoutSingle.vue';
import NetworkAddNetwork from '@/views/NetworkAddNetwork.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/networks',
            name: 'networks',
            component: NetworksView,
        },
        {
            path: '/networks/add',
            name: 'networkaddnetwork',
            component: NetworkAddNetwork,
        },
        {
            path: '/networks/:name',
            name: 'networksviewsingle',
            component: NetworkLoadoutSingle,
            params: true
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        },
    ],
});

export default router;