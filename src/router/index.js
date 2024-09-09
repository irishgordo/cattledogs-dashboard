import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworksView from '@/views/NetworksView.vue';
import NetworkLoadoutSingle from '@/views/NetworkLoadoutSingle.vue';
import NetworkAddNetwork from '@/views/NetworkAddNetwork.vue';
import MachinesView from '@/views/MachinesView.vue';
import MachinesAdd from '@/views/MachinesAdd.vue';
import MachineView from '@/views/MachineView.vue';
import WorkflowsView from '@/views/WorkflowsView.vue';
import TemplatesView from '@/views/TemplatesView.vue';
import TemplateView from '@/views/TemplateView.vue';
import WorkflowView from '@/views/WorkflowView.vue';
import WorkflowsAdd from '@/views/WorkflowsAdd.vue';
import HardwaresView from '@/views/HardwaresView.vue'
import HardwaresAdd from '@/views/HardwaresAdd.vue';

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
            path: '/machines',
            name: 'machines',
            component: MachinesView,
            params: true
        },
        {
            path: '/machines/add',
            name: 'machinesadd',
            component: MachinesAdd
        },
        {
            path: '/machines/:name',
            name: 'machineview',
            component: MachineView,
            params: true
        },
        {
            path: '/workflows',
            name: 'workflowsview',
            component: WorkflowsView
        },
        {
            path: '/workflows/:name',
            name: 'workflowview',
            component: WorkflowView,
            params: true
        },
        {
            path: '/workflows/add',
            name: 'workflowsadd',
            component: WorkflowsAdd
        },
        {
            path: '/templates',
            name: 'templates',
            component: TemplatesView
        },
        {
            path: '/templates/:name',
            name: 'templateview',
            component: TemplateView,
            params: true
        },
        {
            path: '/hardwares',
            name: 'hardwaresview',
            component: HardwaresView
        },
        {
            path: '/hardwares/add',
            name: 'hardwaresadd',
            component: HardwaresAdd
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        },
    ],
});

export default router;