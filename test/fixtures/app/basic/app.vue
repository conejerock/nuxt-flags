<template>
  <div>
    {{ get('feature-name-1').value.description }}
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import {useNuxtFlags} from "#imports";

const state= useState('nuxt-flags:features');
console.log(state.value);
const {get} = useNuxtFlags()
</script>
