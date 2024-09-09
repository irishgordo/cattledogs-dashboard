<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { reactive, defineProps, onMounted } from 'vue';
import axios from 'axios';

const router = useRouter()
const route = useRoute()

const state = reactive({
    networkItemMetadata: '',
    networkItemStatus: '',
    unifiResultsClients: [],
    unifiResultsSites: [],
    unifiResultsUDMS: [],
    unifiResultsUnifiNetworks: [],
    unifiResultsUSWS: [],
    isLoading: true
});

const config = {
    headers: {
        'Authorization': `Bearer token-d6qdb:v89l8vfj4w8nvpt2vqwk9lsmd4pf6m4c5xmspvbcbs6mzc7scf27s8`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

const namespace = "default"
const crd = "cattlenetworkloadouts"

onMounted(async () => {
    try {
          //router is async so we wait for it to be ready
        await router.isReady()
        //once its ready we can access the query params
        console.log(route.params)
        const response = await axios.get("/apiCattleDogs/"+namespace+"/"+crd+"/"+route.params.name, config)
        console.log("hi")
        console.log(response)
        state.networkItemMetadata = response.data.metadata
        state.networkItemStatus = response.data.status
        state.unifiResultsClients = response.data.spec.unifiResults.clients
        state.unifiResultsSites = response.data.spec.unifiResults.sites
        state.unifiResultsUDMs = response.data.spec.unifiResults.udms
        state.unifiResultsUnifiNetworks = response.data.spec.unifiResults.unifinetworks
        state.unifiResultsUSWS = response.data.spec.unifiResults.usws
    } catch (error) {
        console.log('error: ', error)
    }
})

</script>


<template>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Subnets/VLANs</h1>
    </div>
    <section class="bg-blue-50 px-4 py-10">

    <table class="table-auto m-auto container border-separate border-spacing-2 border border-slate-400">
        <thead>
            <tr>
            <th class="border border-slate-300">Name</th>
            <th class="border border-slate-300">DHCP Lease Time</th>
            <th class="border border-slate-300">Purpose</th>
            <th class="border border-slate-300">VLAN Enabled</th>
            <th class="border border-slate-300">VLAN</th>
            <th class="border border-slate-300">IP Subnet</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="availableNetwork in state.unifiResultsUnifiNetworks">
                <td class="border border-slate-300">{{ availableNetwork.name }}</td>
                <td class="border border-slate-300">{{ availableNetwork.dhcpd_leasetime }}</td>
                <td class="border border-slate-300">{{ availableNetwork.purpose }}</td>
                <td class="border border-slate-300">{{ availableNetwork.vlan_enabled }}</td>
                <td class="border border-slate-300">{{ availableNetwork.vlan }}</td>
                <td class="border border-slate-300">{{ availableNetwork.ip_subnet }}</td>
              </tr>
        </tbody>
    </table>
  </section>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Clients</h1>
    </div>
    <section class="bg-blue-50 px-4 py-10">

    <table class="table-auto m-auto container border-separate border-spacing-2 border border-slate-400">
        <thead>
            <tr>
            <th class="border border-slate-300">Hostname</th>
            <th class="border border-slate-300">Mac</th>
            <th class="border border-slate-300">IP</th>
            <th class="border border-slate-300">Name</th>
            <th class="border border-slate-300">Network</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="client in state.unifiResultsClients">
                <td class="border border-slate-300">{{ client.hostname }}</td>
                <td class="border border-slate-300">{{ client.mac }}</td>
                <td class="border border-slate-300">{{ client.ip }}</td>
                <td class="border border-slate-300">{{ client.name }}</td>
                <td class="border border-slate-300">{{ client.network }}</td>
            </tr>
        </tbody>
    </table>
  </section>
      <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">Sites</h1>
    </div>
    <section class="bg-blue-50 px-4 py-10">

    <table class="table-auto m-auto container border-separate border-spacing-2 border border-slate-400">
        <thead>
            <tr>
            <th class="border border-slate-300">id</th>
            <th class="border border-slate-300">Description</th>
            <th class="border border-slate-300">Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="site in state.unifiResultsSites">
                <td class="border border-slate-300">{{ site._id }}</td>
                <td class="border border-slate-300">{{ site.desc }}</td>
                <td class="border border-slate-300">{{ site.name }}</td>
            </tr>
        </tbody>
    </table>
  </section>
    <div class="container m-auto">
        <h1 class="text-5xl font-bold mb-6 mt-6">UDMS (Unifi Dream Machines)</h1>
    </div>
    <section class="bg-blue-50 px-4 py-10">

    <table class="table-auto m-auto container border-separate border-spacing-2 border border-slate-400">
        <thead>
            <tr>
            <th class="border border-slate-300">Public IP</th>
            <th class="border border-slate-300">Lan IP</th>
            <th class="border border-slate-300">Model</th>
            <th class="border border-slate-300">Name</th>
            <th class="border border-slate-300">Kernel Version</th>
            <th class="border border-slate-300">Temperatures</th>
            <th class="border border-slate-300">Arch</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="udm in state.unifiResultsUDMs">
                <td class="border border-slate-300">{{ udm.ip }}</td>
                <td class="border border-slate-300">{{ udm.lan_ip }}</td>
                <td class="border border-slate-300">{{ udm.model }}</td>
                <td class="border border-slate-300">{{ udm.name }}</td>
                <td class="border border-slate-300">{{ udm.kernel_version }}</td>
                <td class="border border-slate-300">{{ udm.temperatures }}</td>
                <td class="border border-slate-300">{{ udm.architecture }}</td>
              </tr>
        </tbody>
    </table>
  </section>
</template>