<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { reactive, defineProps, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import {parse, stringify} from 'yaml'


const router = useRouter()
const route = useRoute()

const state = reactive({
    foundTemplate: '',
    isLoading: true,
    intervalId: '',
    smeeLogs: '',
});

const config = {
    headers: {
        'Authorization': `Bearer token-d6qdb:v89l8vfj4w8nvpt2vqwk9lsmd4pf6m4c5xmspvbcbs6mzc7scf27s8`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
    }
}
const namespace = "tink-system"
const crd = "templates"
const fetchData = async () => {
    //router is async so we wait for it to be ready
    await router.isReady()
    //once its ready we can access the query params
    const response = await axios.get("/apiTinkerbell/"+namespace+"/"+crd+"/"+route.params.name, config)
    console.log("Template")
    console.log(response)
    state.foundTemplate = response.data
}

onMounted(async () => {
    try {
        fetchData();
    } catch (error) {
        console.log('error: ', error)
    } finally {
        state.isLoading = false;
    }
})



</script>


<template>

    <div v-if="state.isLoading">
        <p>loading...</p>
    </div>
    <div v-else>
        <article class="bg-blue-50 pt-6 pb-6 pl-6 pr-6 space-y-4 container mt-6 ml-12">
            <section>
                <h3 class="text-left font-bold text-3xl">
                    {{ state.foundTemplate.metadata.name }}
                </h3>
            </section>
            <section>
                <div class="sm:col-span-4">
                    <label class="block text-sm/6 font-xs text-red-900"><em>Namespace:</em></label>
                    <div class="mt-2">
                        <span class="font-large">{{ state.foundTemplate.metadata.namespace }}</span>
                    </div>
                </div>
            </section>
            <section class="space-y-6 m-auto container">
                <label class="block text-sm/6 font-xs text-red-900"><em>Data:</em></label>
                <div class="md:col-span-4 whitespace-pre block bg-black-900">
                    {{ parse(stringify(state.foundTemplate.spec.data)) }}
                </div>
            </section>
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <RouterLink :to="'/templates/'"><button type="button" class="text-sm/6 font-semibold text-gray-900">Back</button></RouterLink>
            </div>
        </article>
    </div>


</template>