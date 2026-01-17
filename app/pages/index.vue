<script setup lang="ts">
const config = useRuntimeConfig();
const base = config.public.apiBase;
</script>

<template>
  <main>
    <h1>Test !!!</h1>
    <NuxtLink :to="{ name: 'catalogos' }"> Catalogo </NuxtLink>
    <div>Nuxt Docker Test TEST</div>
    <div>{{ config }}</div>
    <div>{{ base }}</div>
  </main>
</template>

<style lang="scss" scoped></style>
