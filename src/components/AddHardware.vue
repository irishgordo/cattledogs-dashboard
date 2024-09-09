<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive, defineProps, defineModel, onMounted, ref } from 'vue';
import axios from 'axios';
import {parse, stringify} from 'yaml'


const config = {
    headers: {
        'Authorization': `Bearer token-d6qdb:v89l8vfj4w8nvpt2vqwk9lsmd4pf6m4c5xmspvbcbs6mzc7scf27s8`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
    }
}
const namespace = "tink-system"
const crd = "hardwares"
const router = useRouter()

const stateOfLife = reactive({
    availableMachines: []
})

const newHardware = reactive({
    apiVersion: "tinkerbell.org/v1alpha1",
    kind: "Hardware",
    metadata: {
        name: '',
        namespace: 'tink-system'
    },
    spec: {
        bmcRef: {
            apiGroup: 'bmc.tinkerbell.org/v1alpha1',
            name: '',
            kind: 'Machine'
        },
        disks: [],
        interfaces: [
            {
                dhcp: {
                    arch: "x86_64",
                    hostname: '',
                    ip: {
                        address: '',
                        gateway: '',
                        netmask: ''
                    },
                    lease_time: 0,
                    mac: '',
                    name_servers: [],
                    uefi: false,
                },
                netboot: {
                    allowPXE: true,
                    allowWorkflow: true
                }
            }
        ]
    }

})




const formOnSubmit = async () => {
    try {
        console.log(newHardware)
        // const response = await axios.post("/apiTinkerbell/"+namespace+"/"+crd, newHardware ,config)
        // console.log(response);
        // await router.push("/hardwares");
    }catch (error) {
        console.log('error: ', error)
    }
}


onMounted(async () => {
    try {
        console.log('howdy')
        //router is async so we wait for it to be ready
        await router.isReady()
        //once its ready we can access the query params
        console.log(router.params)
        // https://rancher.192.168.104.141.sslip.io/k8s/clusters/c-m-qkhcrhkb/apis/bmc.tinkerbell.org/v1alpha1/namespaces/tink-system/machines?limit=500
        const getAvailableMachines = await axios.get("/apiTinkerbellBmc/tink-system/machines", config)
        stateOfLife.availableMachines = getAvailableMachines.data.items
        console.log(getAvailableMachines)
    } catch (error) {
        console.log('error: ', error)
    }
})

</script>

<template>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Add Hardware</h1>
    </div>
    <section class="bg-blue-50 px-4 py-10">

    <form @submit.prevent="formOnSubmit">
    <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base/7 font-semibold text-gray-900">New Hardware To Add (MACHINE MUST BE BUILT FIRST)</h2>
            <p class="mt-1 text-sm/6 text-gray-600">This form provides the baseline details to add a new hardware.</p>
        </div>

        <div class="border-b border-gray-900/10 pb-12">

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div class="sm:col-span-3">
            <label class="block text-sm/6 font-medium text-gray-900">Machine Reference</label>
            <div class="mt-2">
                <select v-model="newHardware.spec.bmcRef.name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                <option v-for="machine in stateOfLife.availableMachines" :value=machine.metadata.name>{{ machine.metadata.name }}</option>
                </select>
            </div>
            </div>

            <div class="sm:col-span-4">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
                <input v-model="newHardware.metadata.name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
            </div>
            </div>

            <div class="sm:col-span-4">
                <label class="block text-sm/6 font-xs text-red-900"><em>Spec.disks.0.device:</em></label>
                <input v-model="newHardware.spec.disks[0]" type="text" lass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                <!-- <textarea v-model="newHardware.spec" class="h-full overflow-y-auto min-h-[100px] w-full rounded-md border">
                </textarea> -->
            </div>


    </div>
</div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
        <RouterLink :to="'/hardwares/'"><button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button></RouterLink>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
    </form>
  </section>
</template>