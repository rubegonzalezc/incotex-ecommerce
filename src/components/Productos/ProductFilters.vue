<template>
  <div class="product-filters">
    <v-card class="mb-4" elevation="1">
      <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4 bg-white">
        Filtros
        <v-btn
          v-if="hasActiveFilters"
          variant="text"
          density="compact"
          class="ml-auto text-caption"
          color="primary"
          @click="resetFilters"
        >
          Limpiar filtros
        </v-btn>
      </v-card-title>
      
      <v-divider></v-divider>
      
      <!-- Categorías -->
      <div class="px-4 py-3 bg-white">
        <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark">Categorías</h3>
        <v-radio-group v-model="filters.category" @update:model-value="emitFilterChange">
          <v-radio
            label="Todas las categorías"
            value=""
            color="primary"
            hide-details
            class="mb-1"
          ></v-radio>
          <v-radio
            v-for="category in categories"
            :key="category.id"
            :label="`${category.name} (${category.count})`"
            :value="category.id"
            color="primary"
            hide-details
            class="mb-1"
          ></v-radio>
        </v-radio-group>
      </div>
      
      <v-divider></v-divider>
      
      <!-- Marcas -->
      <div class="px-4 py-3 bg-white">
        <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark">Marcas</h3>
        <div class="mb-2">
          <v-text-field
            v-model="brandSearch"
            label="Buscar marca"
            variant="outlined"
            density="compact"
            prepend-inner-icon="fa-solid fa-search"
            hide-details
            class="mb-2"
            bg-color="white"
          ></v-text-field>
        </div>
        <v-checkbox
          v-for="brand in filteredBrands"
          :key="brand.id"
          v-model="filters.brand"
          :label="`${brand.name} (${brand.count})`"
          :value="brand.id"
          color="primary"
          hide-details
          class="mb-1 text-dark"
          @update:model-value="emitFilterChange"
        ></v-checkbox>
      </div>
      
      <v-divider></v-divider>
      
      <!-- Rango de Precio -->
      <div class="px-4 py-3 bg-white">
        <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark">Precio</h3>
        <v-range-slider
          v-model="filters.price"
          :min="priceRange[0]"
          :max="priceRange[1]"
          :step="1000"
          color="primary"
          thumb-label="always"
          hide-details
          class="mt-6"
          @update:model-value="emitFilterChange"
        >
          <template v-slot:thumb-label="{ modelValue }">
            ${{ formatPrice(modelValue) }}
          </template>
        </v-range-slider>
        <div class="d-flex justify-space-between mt-2">
          <span class="text-caption">${{ formatPrice(filters.price[0]) }}</span>
          <span class="text-caption">${{ formatPrice(filters.price[1]) }}</span>
        </div>
      </div>
      
      <v-divider></v-divider>
      
      <!-- Disponibilidad -->
      <div class="px-4 py-3 bg-white">
        <v-checkbox
          v-model="filters.inStock"
          label="Solo productos en stock"
          color="primary"
          hide-details
          class="text-dark"
          @update:model-value="emitFilterChange"
        ></v-checkbox>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  brands: {
    type: Array,
    required: true
  },
  priceRange: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['filter-change']);

// Estado de los filtros
const filters = ref({
  category: '',
  brand: [],
  price: [...props.priceRange],
  inStock: false
});

// Búsqueda de marcas
const brandSearch = ref('');

// Marcas filtradas por búsqueda
const filteredBrands = computed(() => {
  if (!brandSearch.value) return props.brands;
  return props.brands.filter(brand => 
    brand.name.toLowerCase().includes(brandSearch.value.toLowerCase())
  );
});

// Verificar si hay filtros activos
const hasActiveFilters = computed(() => {
  return filters.value.category !== '' || 
         filters.value.brand.length > 0 || 
         filters.value.price[0] !== props.priceRange[0] || 
         filters.value.price[1] !== props.priceRange[1] || 
         filters.value.inStock;
});

// Formatear precio
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Emitir cambios en los filtros
const emitFilterChange = () => {
  emit('filter-change', { ...filters.value });
};

// Resetear filtros
const resetFilters = () => {
  filters.value = {
    category: '',
    brand: [],
    price: [...props.priceRange],
    inStock: false
  };
  emitFilterChange();
};

// Actualizar rango de precios cuando cambie en props
watch(() => props.priceRange, (newRange) => {
  filters.value.price = [...newRange];
}, { deep: true });
</script>

<style scoped>
.product-filters {
  position: sticky;
  top: 20px;
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.bg-white {
  background-color: white !important;
}

@media (max-width: 960px) {
  .product-filters {
    position: static;
  }
}
</style>