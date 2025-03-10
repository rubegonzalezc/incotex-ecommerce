<template>
  <v-app>
    <Header />
    
    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.v-main {
  background-color: #f5f5f5;
}
</style>
