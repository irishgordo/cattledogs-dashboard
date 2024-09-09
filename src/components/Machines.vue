<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive, defineProps, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import NetworkItem from './NetworkItem.vue'

const config = {
    headers: {
        'Authorization': `Bearer token-d6qdb:v89l8vfj4w8nvpt2vqwk9lsmd4pf6m4c5xmspvbcbs6mzc7scf27s8`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
    }
}
const namespace = "tink-system"
const crd = "machines"
const router = useRouter()

const state = reactive({
    machines: [],
    isLoading: true,
    intervalId: ''
});


const deleteMachine = async (name) => {
    try{
        console.log('hi: ', name);
        const response = await axios.delete("/apiTinkerbellBmc/"+namespace+"/"+crd+"/"+name, config);
        console.log(response);
        await router.push("/machines");
    }catch(err){
        console.log('error: ', err);
    }
}

const fetchData = async () => {
    //router is async so we wait for it to be ready
    await router.isReady()
    //once its ready we can access the query params
    console.log(router.params)
    const response = await axios.get("/apiTinkerbellBmc/"+namespace+"/"+crd, config)
    console.log("hi")
    console.log(response)
    state.machines = response.data.items
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
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Machines</h1>
    </div>
    <div class="container m-auto">
        <div class="mb-6">
            <button class="rounded-lg h-[36px] bg-blue-500 hover:bg-blue-600 text-white text-center text-sm">
                <RouterLink class="mt-6 mb-6 mr-6 ml-6" :to="'/machines/add'">Add Machine</RouterLink>
            </button>
        </div>
    </div>
    <div v-if="state.isLoading">
        <h4 class="text-3xl font-bold mb-6 mt-6">loading...</h4>
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
                    <th class="border border-slate-300">Audit</th>
                    <th class="border border-slate-300">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="machine in state.machines" :key="machine.metadata.name">
                        <td class="border border-slate-300">{{ machine.metadata.name }}</td>
                        <td class="border border-slate-300">{{ machine.metadata.namespace }}</td>
                        <td class="border border-slate-300">{{ machine.metadata.uid }}</td>
                        <td class="border border-slate-300">{{ machine.spec.connection.host }}</td>
                        <td class="border border-slate-300">{{ machine.spec.connection.port }}</td>
                        <td class="border border-slate-300">{{ machine.spec.connection.insecureTLS }}</td>
                        <td class="border border-slate-300">{{ machine.status.conditions }}</td>
                        <td class="border border-slate-300">{{ machine.status.powerState }}</td>
                        <td class="border border-slate-300 h-[36px] bg-blue-500 hover:bg-blue-600 text-white text-center text-sm"><RouterLink :to="'/machines/'+machine.metadata.name">View Details</RouterLink></td>
                        <td v-on:click="deleteMachine(machine.metadata.name)" class="border border-slate-300 h-[36px] bg-red-500 hover:bg-red-600 text-white text-center text-sm">Delete</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>


</template>