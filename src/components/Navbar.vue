<script setup>
import { RouterLink, useRoute } from 'vue-router';
const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath;
};
</script>

<template>
    <nav class="bg-blue-700 border-b border-blue-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">Cattledogs</span>
                    </RouterLink>
                    <div class="md:ml-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/" :class="[
                                isActiveLink('/')
                                    ? 'bg-blue-900'
                                    : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3',
                                'py-2',
                                'rounded-md',
                            ]">Home</RouterLink>
                            <RouterLink to="/networks" :class="[
                                isActiveLink('/networks')
                                    ? 'bg-blue-900'
                                    : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3',
                                'py-2',
                                'rounded-md',
                            ]">Networks</RouterLink>
                            <RouterLink to="/clusters" :class="[
                                isActiveLink('/clusters')
                                    ? 'bg-blue-900'
                                    : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3',
                                'py-2',
                                'rounded-md',
                            ]">Seeder Clusters</RouterLink>
                            <RouterLink to="/templates" :class="[
                                isActiveLink('/templates')
                                    ? 'bg-blue-900'
                                    : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3',
                                'py-2',
                                'rounded-md',
                            ]">Templates</RouterLink>
                            <RouterLink to="/workflows" :class="[
                                isActiveLink('/workflows')
                                    ? 'bg-blue-900'
                                    : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3',
                                'py-2',
                                'rounded-md',
                            ]">Workflows</RouterLink>
                            <RouterLink to="/machines" :class="[
                                isActiveLink('/machines')
                                    ? 'bg-blue-900'
                                    : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3',
                                'py-2',
                                'rounded-md',
                            ]">Machines</RouterLink>
                            <RouterLink to="/hardwares" :class="[
                                isActiveLink('/hardwares')
                                    ? 'bg-blue-900'
                                    : 'hover:bg-gray-900 hover:text-white',
                                'text-white',
                                'px-3',
                                'py-2',
                                'rounded-md',
                            ]">Hardwares</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>