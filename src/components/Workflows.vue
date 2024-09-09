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
const crd = "workflows"
const router = useRouter()

const state = reactive({
    workflows: [],
    isLoading: true,
    intervalId: '',
    smeeLogs: 'logs TBD: (kubectl -v=9 logs deployment/smee -n tink-system --follow) - @kubernetes/client-node issues :sweat_smile_emoji:'
});


const deleteWorkflow = async (name) => {
    try{
        console.log('hi: ', name);
        const response = await axios.delete("/apiTinkerbell/"+namespace+"/"+crd+"/"+name, config);
        console.log(response);
        await router.push("/workflows");
    }catch(err){
        console.log('error: ', err);
    }
}

const newFetch = async() => {
    const url = 'https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/api/v1/namespaces/tink-system/pods/smee-b57cf6587-78wpn/log';
    const headers = {
        'Authorization': `Bearer token-d6qdb:v89l8vfj4w8nvpt2vqwk9lsmd4pf6m4c5xmspvbcbs6mzc7scf27s8`,
        'Access-Control-Allow-Origin': 'https://rancher.192.168.104.141.sslip.io/',
        'Content-Type': 'text/plain;charset=UTF-8'
    }
    await axios.get(url, {headers: headers})
}

const fetchData = async () => {
    //router is async so we wait for it to be ready
    await router.isReady()
    //once its ready we can access the query params
    console.log(router.params)
    const response = await axios.get("/apiTinkerbell/"+namespace+"/"+crd, config)
    console.log("hi")
    console.log(response)
    //const otherResponse = await newFetch()
    state.workflows = response.data.items
}

onMounted(async () => {
    try {
        fetchData();
    } catch (error) {
        console.log('error: ', error)
    } finally {
        state.isLoading = false;
        state.intervalId = setInterval(fetchData, 2000);
    }
})

onUnmounted(() => {
  clearInterval(state.intervalId); // Clear interval on component unmount
})

</script>

<template>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Workflows</h1>
    </div>
    <div class="container m-auto">
        <div class="mb-6">
            <button class="rounded-lg h-[36px] bg-blue-500 hover:bg-blue-600 text-white text-center text-sm">
                <RouterLink class="mt-6 mb-6 mr-6 ml-6" :to="'/workflows/add'">Add Workflows</RouterLink>
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
                    <th class="border border-slate-300">BootMode</th>
                    <th class="border border-slate-300">AllowNetBoot</th>
                    <th class="border border-slate-300">Hardware Map</th>
                    <th class="border border-slate-300">State</th>
                    <th class="border border-slate-300">Current Action</th>
                    <th class="border border-slate-300">Audit</th>
                    <th class="border border-slate-300">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="workflow in state.workflows" :key="workflow.metadata.name">
                        <td class="border border-slate-300">{{ workflow.metadata.name }}</td>
                        <td class="border border-slate-300">{{ workflow.metadata.namespace }}</td>
                        <td class="border border-slate-300">{{ workflow.metadata.uid }}</td>
                        <td class="border border-slate-300">{{ workflow.spec.bootOptions.bootMode }}</td>
                        <td class="border border-slate-300">{{ workflow.spec.bootOptions.toggleAllowNetboot }}</td>
                        <td class="border border-slate-300">{{ workflow.spec.hardwareMap}}</td>
                        <td class="border border-slate-300">{{ workflow.status.state}}</td>
                        <td class="border border-slate-300">{{ workflow.status.currentAction}}</td>
                        <td class="border border-slate-300 h-[36px] bg-blue-500 hover:bg-blue-600 text-white text-center text-sm"><RouterLink :to="'/workflows/'+workflow.metadata.name">View Details</RouterLink></td>
                        <td v-on:click="deleteWorkflow(workflow.metadata.name)" class="border border-slate-300 h-[36px] bg-red-500 hover:bg-red-600 text-white text-center text-sm">Delete</td>
                    </tr>
                </tbody>
            </table>
        </section>
        <div class="container m-auto">
            <h1 class="text-3xl font-bold mb-6 mt-6">SMEE Logs...</h1>
            <textarea readonly v-model="state.smeeLogs" class="h-full overflow-y-auto min-h-[100px] w-full rounded-md border">
            </textarea>
        </div>
    </div>


</template>