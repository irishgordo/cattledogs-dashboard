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
const crd = "machines"
const router = useRouter()

const newMachine = reactive({
    apiVersion: 'bmc.tinkerbell.org/v1alpha1',
    kind: 'Machine',
    metadata: {
        name: '',
        namespace: 'tink-system',
    },
    spec: {
        connection: {
            host: '',
            port: 623,
            insecureTLS: true,
            authSecretRef: {
                name: 'ilo-secret',
                namespace: 'tink-system'
            }
        }
    }

})


const formOnSubmit = async () => {
    try {
        const response = await axios.post("/apiTinkerbellBmc/"+namespace+"/"+crd, newMachine ,config)
        console.log(response);
        await router.push("/machines");
    }catch (error) {
        console.log('error: ', error)
    }
}


onMounted(async () => {
    try {
        console.log('howdy')
    } catch (error) {
        console.log('error: ', error)
    }
})

</script>

<template>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Add Machine</h1>
    </div>
    <section class="bg-blue-50 px-4 py-10">

    <form @submit.prevent="formOnSubmit">
    <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base/7 font-semibold text-gray-900">New Machine To Add</h2>
            <p class="mt-1 text-sm/6 text-gray-600">This form provides the baseline details to add a new machine.</p>
        </div>

        <div class="border-b border-gray-900/10 pb-12">

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div class="sm:col-span-4">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
                <input v-model="newMachine.metadata.name" id="name" name="name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
            </div>
            </div>

            <div class="sm:col-span-4" >
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Host IP</label>
            <div class="mt-2">
                <input v-model="newMachine.spec.connection.host" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
            </div>
            </div>

            <div class="sm:col-span-4">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Host Port</label>
            <div class="mt-2">
                <input v-model="newMachine.spec.connection.port" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
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