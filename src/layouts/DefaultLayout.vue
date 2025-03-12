<template>
  <div class="default-layout">
    <AppHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/Header.vue';
import AppFooter from '@/components/Footer.vue';
</script>