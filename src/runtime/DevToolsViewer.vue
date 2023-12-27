<script setup lang="ts">
const {getAll} = useNuxtFlags();
</script>

<template>
  <div>
    <h1 style="font-size: 3rem; font-weight: bold;">
      Nuxt <span style="color: rgb(0, 220, 130)">Flags</span>
    </h1>

    <div v-for="(flag, idx) of getAll().value" :key="idx">
      <h4 style="font-size: 1.5rem; font-weight: bold;}">
        {{ flag.name }}
      </h4>

      <div>
        <span class="font-extrabold">Description:</span> {{ flag.description }}
      </div>

      <div v-for="(strategy, idxStrategy) in flag.strategies" :key="idxStrategy">
        <div v-if="strategy.name !== 'default'">
          <div> {{ strategy.name }}</div>
          <pre>{{ JSON.stringify(strategy.parameters, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
