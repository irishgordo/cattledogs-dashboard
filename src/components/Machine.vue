<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { reactive, defineProps, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const router = useRouter()
const route = useRoute()

const state = reactive({
    machine: '',
    isLoading: true,
    iframeSrc: '',
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
const crd = "machines"
const fetchData = async () => {
    //router is async so we wait for it to be ready
    await router.isReady()
    //once its ready we can access the query params
    console.log(route.params)
    const response = await axios.get("/apiTinkerbellBmc/"+namespace+"/"+crd+"/"+route.params.name, config)
    state.machine = response.data
    state.iframeSrc = 'https://'+response.data.spec.connection.host
    console.log("MACHINE")
    console.log(response)
}

onMounted(async () => {
    try {
        fetchData();
    } catch (error) {
        console.log('error: ', error)
    } finally {
        state.isLoading = false;
        state.intervalId = setInterval(fetchData, 15000);
    }
})

onUnmounted(() => {
  clearInterval(state.intervalId); // Clear interval on component unmount
})

</script>


<template>

    <div v-if="state.isLoading">
        <p>loading...</p>
    </div>
    <div v-else>
        <section class="bg-blue-50 px-4 py-10">
        <table class="table-auto m-auto container border-separate border-spacing-2 border border-slate-400">
            <thead>
                <tr>
                <th class="border border-slate-300">Machine Name</th>
                <th class="border border-slate-300">Namespace</th>
                <th class="border border-slate-300">UID</th>
                <th class="border border-slate-300">Host IP</th>
                <th class="border border-slate-300">Host Port</th>
                <th class="border border-slate-300">Host Insecure</th>
                <th class="border border-slate-300">Status Conditions</th>
                <th class="border border-slate-300">Status Power State</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border border-slate-300">{{ state.machine.metadata.name }}</td>
                    <td class="border border-slate-300">{{ state.machine.metadata.namespace }}</td>
                    <td class="border border-slate-300">{{ state.machine.metadata.uid }}</td>
                    <td class="border border-slate-300">{{ state.machine.spec.connection.host }}</td>
                    <td class="border border-slate-300">{{ state.machine.spec.connection.port }}</td>
                    <td class="border border-slate-300">{{ state.machine.spec.connection.insecureTLS }}</td>
                    <td class="border border-slate-300">{{ state.machine.status.conditions }}</td>
                    <td class="border border-slate-300">{{ state.machine.status.powerState }}</td>
                </tr>
            </tbody>
        </table>
        <div class="mt-6 flex items-center justify-end gap-x-6">
            <RouterLink :to="'/machines/'"><button type="button" class="text-sm/6 font-semibold text-gray-900">Back</button></RouterLink>
        </div>
        </section>
        <div class="m-auto container">
            <h1 class="text-3xl">TODO: <a class="h-[36px] hover:bg-yellow-600 text-black text-center" href="https://github.com/mildsunrise/ilo-protocol/tree/main">https://github.com/mildsunrise/ilo-protocol/tree/main</a></h1>
        </div>
        <div class="m-auto container mt-12">
            <h1 class="text-3xl">Machine iLO: <a class="h-[36px] hover:bg-yellow-600 text-black text-center" v-bind:href="state.iframeSrc">iLO</a></h1>
        </div>
        <!-- <div>
            <h1 class="text-3xl font-bold mt-12 mb-12">SMEE Active Logs...</h1>
        </div> -->

    </div>

</template>