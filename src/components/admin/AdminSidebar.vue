<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    width="240"
    class="bg-primary sidebar-fixed"
    :expand-on-hover="false"
    elevation="2"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      :title="rail ? '' : 'Administrador'"
      :subtitle="rail ? '' : 'Panel de control'"
      class="py-2"
      color="white"
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="fa-solid fa-chevron-left"
          @click.stop="toggleRail"
          :class="{'rotate-180': rail}"
          color="white"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider color="rgba(255, 255, 255, 0.2)"></v-divider>

    <v-list density="compact" nav class="py-1">
      <v-list-item
        v-for="(item, i) in menuItems"
        :key="i"
        :value="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="rail ? '' : item.title"
        rounded="lg"
        class="mb-1 mx-1"
        active-color="white"
        color="white"
        :active-class="'bg-primary-darken-1'"
        density="comfortable"
        @click.stop
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          variant="outlined"
          color="white"
          to="/"
          class="mb-2 text-uppercase font-weight-medium"
          prepend-icon="fa-solid fa-store"
          @click.stop
        >
          {{ rail ? '' : 'Ver tienda' }}
        </v-btn>
        <v-btn
          block
          variant="outlined"
          color="white"
          prepend-icon="fa-solid fa-sign-out-alt"
          class="text-uppercase font-weight-medium"
          @click.stop="logout"
        >
          {{ rail ? '' : 'Cerrar sesión' }}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  railValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'update:railValue']);

const router = useRouter();
const drawer = ref(props.modelValue);
const rail = ref(props.railValue);

// Watch for changes and emit events
watch(drawer, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(rail, (newValue) => {
  emit('update:railValue', newValue);
});

function toggleRail() {
  rail.value = !rail.value;
  emit('update:railValue', rail.value);
}

function logout() {
  // Implement logout logic here
  console.log('Logout clicked');
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'fa-solid fa-tachometer-alt',
    to: '/admin'
  },
  {
    title: 'Productos',
    icon: 'fa-solid fa-box',
    to: '/admin/productos'
  },
  {
    title: 'Categorías',
    icon: 'fa-solid fa-tags',
    to: '/admin/categorias'
  },
  {
    title: 'Pedidos',
    icon: 'fa-solid fa-shopping-cart',
    to: '/admin/pedidos'
  },
  {
    title: 'Usuarios',
    icon: 'fa-solid fa-users',
    to: '/admin/usuarios'
  },
  {
    title: 'Configuración',
    icon: 'fa-solid fa-cog',
    to: '/admin/configuracion'
  }
];
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 4px;
}

:deep(.v-list-item__prepend > .v-icon) {
  margin-inline-end: 16px;
}

:deep(.v-navigation-drawer--rail .v-list-item__prepend > .v-icon) {
  margin-inline-start: 8px;
}

:deep(.v-list-item--active) {
  color: white !important;
}

:deep(.v-list-item) {
  min-height: 40px;
  padding: 0 8px;
}

:deep(.v-list) {
  padding: 4px;
}

:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 4px;
}

.sidebar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh !important;
  z-index: 100;
}

:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 4px;
  padding: 8px 4px;
}
</style>