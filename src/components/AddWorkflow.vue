<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive, defineProps, defineModel, onMounted, ref } from 'vue';
import axios from 'axios';

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

const stateOfLife = reactive({
    availableTemplates: [],
    availableHardwares: []
})

const newWorkflow = reactive({
    apiVersion: 'tinkerbell.org/v1alpha1',
    kind: 'Workflow',
    metadata: {
        name: '',
        namespace: 'tink-system',
    },
    spec: {
        bootOptions: {
            bootMode: "netboot",
            toggleAllowNetboot: true
        },
        templateRef: "",
        hardwareRef: "",
        hardwareMap: {
            device_1: ""
        }
    }

})


const formOnSubmit = async () => {
    try {
        console.log(newWorkflow)
        const response = await axios.post("/apiTinkerbell/"+namespace+"/"+crd, newWorkflow ,config)
        console.log(response);
        await router.push("/workflows");
    }catch (error) {
        console.log('error: ', error)
    }
}


onMounted(async () => {
    try {
        const getAvailableTemplates = await axios.get("/apiTinkerbell/tink-system/templates",config)
        const getAvailableHardwares = await axios.get("/apiTinkerbell/tink-system/hardware", config)
        stateOfLife.availableTemplates = getAvailableTemplates.data.items
        stateOfLife.availableHardwares = getAvailableHardwares.data.items
        console.log(getAvailableHardwares)
        console.log(getAvailableTemplates)
    } catch (error) {
        console.log('error: ', error)
    }
})

</script>

<template>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Add Workflow</h1>
    </div>
    <section class="bg-blue-50 px-4 py-10">

    <form @submit.prevent="formOnSubmit">
    <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base/7 font-semibold text-gray-900">New Workflow To Add</h2>
            <p class="mt-1 text-sm/6 text-gray-600">This form provides the baseline details to add a new workflow. That will commission a machine more or less, this is a prime way to validate your machine has everything it needs before you try to build a harvester cluster - eg: ntp connectivity, proper iops for any disks, & so much much more -based around tinkerbell based templates and the given hardware reference of that piece of hardware.</p>
        </div>

        <div class="border-b border-gray-900/10 pb-12">

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


            <div class="sm:col-span-3">
            <label class="block text-sm/6 font-medium text-gray-900">Template Reference</label>
            <div class="mt-2">
                <select v-model="newWorkflow.spec.templateRef" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                <option v-for="template in stateOfLife.availableTemplates" :value=template.metadata.name>{{ template.metadata.name }}</option>
                </select>
            </div>
            </div>

            <div class="sm:col-span-3">
            <label class="block text-sm/6 font-medium text-gray-900">Hardware Reference</label>
            <div class="mt-2">
                <select v-model="newWorkflow.spec.hardwareRef" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                <option v-for="hardware in stateOfLife.availableHardwares" :value=hardware.metadata.name>{{ hardware.metadata.name }}</option>
                </select>
            </div>
            </div>

            <div class="sm:col-span-4">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
                <input v-model="newWorkflow.metadata.name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
            </div>
            </div>

            <div class="sm:col-span-4" >
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Hardware Map Device 1 MAC Address</label>
            <div class="mt-2">
                <input v-model="newWorkflow.spec.hardwareMap.device_1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
            </div>
            </div>


    </div>
</div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
        <RouterLink :to="'/machines/'"><button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button></RouterLink>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
    </form>
  </section>
</template>