<template>
  <div>
    <pre>{{ JSON.stringify(getAll().value, null, 4) }}</pre>
  </div>
</template>

<script setup lang="ts">
const {getAll} = useNuxtFlags()
</script>
