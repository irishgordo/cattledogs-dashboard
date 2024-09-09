<script setup>
</script>

<template>
    <div class="container m-auto">
        <main>
            <section class="mt-12">
                <h1 class="text-7xl font-bold mb-6">Home Info</h1>
                <p class="text-2xl">
                    Birds-eye view, to leverage cattledogs in providing info not only on Harvester setups but overall
                    infrastructure.
                </p>
            </section>
            <section class="mt-12 text-xl">
                <h1 class="text-5xl font-bold mb-6">Links</h1>
                <ul class="list-disc">
                    <li>What the Comissioning Scripts Use to Prove Node Viability Prior to Cluster Generation:
                        <a class="text-blue-600 visited:text-purple-600"
                            href="https://github.com/irishgordo/cattledogs-tink-helpers">Cattledogs Tink Helpers</a>
                    </li>
                    <li>Kubebuilder Based Cloud Native Backend (we communicate to):
                        <a class="text-blue-600 visited:text-purple-600"
                            href="https://github.com/irishgordo/cattledogs-backend">Cattledogs Backend</a>
                    </li>
                    <li>This Vue.js + Tailwind based Front-End:
                        <a class=" text-blue-600 visited:text-purple-600"
                            href="https://github.com/irishgordo/cattledogs-dashboard">Cattledogs Dashboard</a>
                    </li>
                </ul>
            </section>
            <section class="text-xl">
                <h1 class="text-4xl mt-6 mb-6">Additional Info:</h1>
                <p class="text-2xl">
                    The gist is that we'll leverage a mixture of Seeder, Tinkerbell, Cattledogs-Backend and other
                    entities to provide us a better view of our systems.
                    We could ultimately also eventually set out ways to tag equipment or have it reserved.
                    We can have intermittent ways to validate setups if hardware changes.
                    We can view the iLO experience directly from the Node listings.
                    We are gearing up for providing a single-pane-of-glass to get a view of the landscape so that
                    Harvester can be deployed on bare-metal with the most ease of use.
                </p>
            </section>
        </main>
    </div>
</template>