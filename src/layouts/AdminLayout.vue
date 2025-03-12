<template>
  <div class="admin-layout">
    <div class="admin-layout-container">
      <!-- Sidebar Component -->
      <AdminSidebar 
        v-model="drawer"
        v-model:railValue="rail"
      />

      <!-- Main content -->
      <div class="main-content-wrapper">
        <v-main class="bg-grey-lighten-4">
          <router-view></router-view>
        </v-main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

const drawer = ref(true);
const rail = ref(false);
</script>

<style scoped>
/* Layout styles */
.admin-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.admin-layout-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.main-content-wrapper {
  flex: 1;
  width: calc(100% - 280px);
  transition: margin-left 0.2s;
  overflow-x: hidden;
}

/* When sidebar is in rail mode */
:deep(.v-navigation-drawer--rail) ~ .main-content-wrapper {
  margin-left: 56px; /* Rail width */
  width: calc(100% - 56px);
}
</style>