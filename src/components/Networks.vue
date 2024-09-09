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
const namespace = "default"
const crd = "cattlenetworkloadouts"
const router = useRouter()

const state = reactive({
    networkItems: [],
    isLoading: true,
    intervalId: ''
});


const deleteNetwork = async (name) => {
    try{
        console.log('hi: ', name);
        const response = await axios.delete("/apiCattleDogs/"+namespace+"/"+crd+"/"+name, config);
        console.log(response);
        await router.push("/networks");
    }catch(err){
        console.log('error: ', err);
    }
}

const fetchData = async () => {
    //router is async so we wait for it to be ready
    await router.isReady()
    //once its ready we can access the query params
    console.log(router.params)
    const response = await axios.get("/apiCattleDogs/"+namespace+"/"+crd, config)
    console.log("hi")
    console.log(response)
    state.networkItems = response.data.items
}

onMounted(async () => {
    try {
        fetchData();
    } catch (error) {
        console.log('error: ', error)
    } finally {
        state.isLoading = false;
        state.intervalId = setInterval(fetchData, 10000);
    }
})

onUnmounted(() => {
  clearInterval(state.intervalId); // Clear interval on component unmount
})


</script>

<template>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Networks</h1>
    </div>
    <div class="container m-auto">
        <div class="mb-6">
            <button class="rounded-lg h-[36px] bg-blue-500 hover:bg-blue-600 text-white text-center text-sm">
                <RouterLink class="mt-6 mb-6 mr-6 ml-6" :to="'/networks/add'">Add Network</RouterLink>
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
                    <th class="border border-slate-300">Network Name</th>
                    <th class="border border-slate-300">Namespace</th>
                    <th class="border border-slate-300">UID</th>
                    <th class="border border-slate-300">Status</th>
                    <th class="border border-slate-300">Audit</th>
                    <th class="border border-slate-300">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="net in state.networkItems" :key="net.metadata.name">
                        <td class="border border-slate-300">{{ net.metadata.name }}</td>
                        <td class="border border-slate-300">{{ net.metadata.namespace }}</td>
                        <td class="border border-slate-300">{{ net.metadata.uid }}</td>
                        <td class="border border-slate-300">{{ net.status.phase }}</td>
                        <td class="border border-slate-300 h-[36px] bg-blue-500 hover:bg-blue-600 text-white text-center text-sm"><RouterLink :to="'/networks/'+net.metadata.name">View Details</RouterLink></td>
                        <td v-on:click="deleteNetwork(net.metadata.name)" class="border border-slate-300 h-[36px] bg-red-500 hover:bg-red-600 text-white text-center text-sm">Delete</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>

</template>