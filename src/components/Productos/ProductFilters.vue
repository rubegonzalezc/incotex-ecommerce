<template>
  <div class="product-filters">
    <!-- Botón de filtro móvil (visible solo en móviles) -->
    <v-btn
      block
      color="primary"
      variant="elevated"
      prepend-icon="fa-solid fa-filter"
      class="mb-4 d-md-none"
      @click="mobileFilterOpen = true"
    >
      Filtrar Productos
    </v-btn>

    <!-- Filtros para escritorio (visible solo en escritorio) -->
    <v-card class="mb-4 rounded-lg d-none d-md-block" elevation="2">
      <v-card-title class="d-flex align-center text-subtitle-1 font-weight-bold py-3 px-4 bg-primary text-white">
        <v-icon icon="fa-solid fa-filter" class="mr-2" />
        Filtros
        <v-btn
          v-if="hasActiveFilters"
          variant="text"
          density="compact"
          class="ml-auto"
          color="white"
          @click="resetFilters"
        >
          <v-icon icon="fa-solid fa-xmark" class="mr-1" />
          Limpiar
        </v-btn>
      </v-card-title>
      
      <!-- Contenido del filtro para escritorio -->
      <div>
        <!-- Categorías -->
        <div class="px-4 py-3 bg-white">
          <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
            <v-icon icon="fa-solid fa-tags" size="small" class="mr-2" color="primary" />
            Categorías
          </h3>
          
          <v-list density="compact" class="pa-0 bg-transparent">
            <v-list-item
              value=""
              @click="selectCategory('')"
              :active="filters.category === ''"
              active-color="primary"
              rounded="lg"
              class="px-2 my-1"
            >
              <template v-slot:prepend>
                <v-icon :color="filters.category === '' ? 'primary' : 'grey'" size="small">
                  {{ filters.category === '' ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle' }}
                </v-icon>
              </template>
              <v-list-item-title>Todas las categorías</v-list-item-title>
            </v-list-item>
            
            <v-list-item
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              @click="selectCategory(category.id)"
              :active="filters.category === category.id"
              active-color="primary"
              rounded="lg"
              class="px-2 my-1"
            >
              <template v-slot:prepend>
                <v-icon :color="filters.category === category.id ? 'primary' : 'grey'" size="small">
                  {{ filters.category === category.id ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle' }}
                </v-icon>
              </template>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
              <template v-slot:append>
                <v-chip size="x-small" color="grey-lighten-3" class="ml-2">{{ category.count }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </div>
        
        <v-divider></v-divider>
        
        <!-- Marcas -->
        <div class="px-4 py-3 bg-white">
          <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
            <v-icon icon="fa-solid fa-building" size="small" class="mr-2" color="primary" />
            Marcas
          </h3>
          
          <v-text-field
            v-model="brandSearch"
            label="Buscar marca"
            variant="outlined"
            density="compact"
            prepend-inner-icon="fa-solid fa-search"
            hide-details
            class="mb-3"
            bg-color="white"
            clearable
          ></v-text-field>
          
          <div class="brand-checkbox-container mt-2">
            <v-list density="compact" class="pa-0 bg-transparent">
              <v-list-item
                v-for="brand in filteredBrands"
                :key="brand.id"
                @click="toggleBrand(brand.id)"
                :active="filters.brand.includes(brand.id)"
                active-color="primary"
                rounded="lg"
                class="px-2 my-1"
              >
                <template v-slot:prepend>
                  <v-icon :color="filters.brand.includes(brand.id) ? 'primary' : 'grey'" size="small">
                    {{ filters.brand.includes(brand.id) ? 'fa-solid fa-square-check' : 'fa-regular fa-square' }}
                  </v-icon>
                </template>
                <v-list-item-title>{{ brand.name }}</v-list-item-title>
                <template v-slot:append>
                  <v-chip size="x-small" color="grey-lighten-3" class="ml-2">{{ brand.count }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </div>
        </div>
        
        <v-divider></v-divider>
        
        <!-- Rango de Precio -->
        <div class="px-4 py-3 bg-white">
          <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
            <v-icon icon="fa-solid fa-tag" size="small" class="mr-2" color="primary" />
            Precio
          </h3>
          
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
            <v-chip size="small" color="grey-lighten-3">${{ formatPrice(filters.price[0]) }}</v-chip>
            <v-chip size="small" color="grey-lighten-3">${{ formatPrice(filters.price[1]) }}</v-chip>
          </div>
        </div>
        
        <v-divider></v-divider>
        
        <!-- Disponibilidad -->
        <div class="px-4 py-3 bg-white">
          <v-list-item
            @click="toggleStock"
            :active="filters.inStock"
            active-color="primary"
            rounded="lg"
            class="px-2"
          >
            <template v-slot:prepend>
              <v-icon :color="filters.inStock ? 'primary' : 'grey'" size="small">
                {{ filters.inStock ? 'fa-solid fa-square-check' : 'fa-regular fa-square' }}
              </v-icon>
            </template>
            <v-list-item-title>Solo productos en stock</v-list-item-title>
          </v-list-item>
        </div>
        
        <!-- Botón aplicar filtros en escritorio (opcional) -->
        <div class="px-4 py-3 bg-white d-flex justify-end d-none d-md-flex">
          <v-btn
            color="primary"
            variant="elevated"
            prepend-icon="fa-solid fa-filter"
            @click="emitFilterChange"
          >
            Aplicar filtros
          </v-btn>
        </div>
      </div>
    </v-card>

    <!-- Drawer para filtros en móvil -->
    <v-navigation-drawer
      v-model="mobileFilterOpen"
      location="bottom"
      temporary
      class="filter-drawer d-md-none"
      height="85vh"
    >
      <v-card flat>
        <v-card-title class="d-flex align-center text-subtitle-1 font-weight-bold py-3 px-4 bg-primary text-white">
          <v-icon icon="fa-solid fa-filter" class="mr-2" />
          Filtros
          <v-btn
            icon
            variant="text"
            color="white"
            class="ml-auto"
            @click="mobileFilterOpen = false"
          >
            <v-icon>fa-solid fa-xmark</v-icon>
          </v-btn>
        </v-card-title>
        
        <div class="filter-drawer-content">
          <!-- Contenido del filtro para móvil (repetido) -->
          <div>
            <!-- Categorías -->
            <div class="px-4 py-3 bg-white">
              <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
                <v-icon icon="fa-solid fa-tags" size="small" class="mr-2" color="primary" />
                Categorías
              </h3>
              
              <v-list density="compact" class="pa-0 bg-transparent">
                <v-list-item
                  value=""
                  @click="selectCategory('')"
                  :active="filters.category === ''"
                  active-color="primary"
                  rounded="lg"
                  class="px-2 my-1"
                >
                  <template v-slot:prepend>
                    <v-icon :color="filters.category === '' ? 'primary' : 'grey'" size="small">
                      {{ filters.category === '' ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle' }}
                    </v-icon>
                  </template>
                  <v-list-item-title>Todas las categorías</v-list-item-title>
                </v-list-item>
                
                <v-list-item
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  @click="selectCategory(category.id)"
                  :active="filters.category === category.id"
                  active-color="primary"
                  rounded="lg"
                  class="px-2 my-1"
                >
                  <template v-slot:prepend>
                    <v-icon :color="filters.category === category.id ? 'primary' : 'grey'" size="small">
                      {{ filters.category === category.id ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle' }}
                    </v-icon>
                  </template>
                  <v-list-item-title>{{ category.name }}</v-list-item-title>
                  <template v-slot:append>
                    <v-chip size="x-small" color="grey-lighten-3" class="ml-2">{{ category.count }}</v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </div>
            
            <v-divider></v-divider>
            
            <!-- Marcas -->
            <div class="px-4 py-3 bg-white">
              <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
                <v-icon icon="fa-solid fa-building" size="small" class="mr-2" color="primary" />
                Marcas
              </h3>
              
              <v-text-field
                v-model="brandSearch"
                label="Buscar marca"
                variant="outlined"
                density="compact"
                prepend-inner-icon="fa-solid fa-search"
                hide-details
                class="mb-3"
                bg-color="white"
                clearable
              ></v-text-field>
              
              <div class="brand-checkbox-container mt-2">
                <v-list density="compact" class="pa-0 bg-transparent">
                  <v-list-item
                    v-for="brand in filteredBrands"
                    :key="brand.id"
                    @click="toggleBrand(brand.id)"
                    :active="filters.brand.includes(brand.id)"
                    active-color="primary"
                    rounded="lg"
                    class="px-2 my-1"
                  >
                    <template v-slot:prepend>
                      <v-icon :color="filters.brand.includes(brand.id) ? 'primary' : 'grey'" size="small">
                        {{ filters.brand.includes(brand.id) ? 'fa-solid fa-square-check' : 'fa-regular fa-square' }}
                      </v-icon>
                    </template>
                    <v-list-item-title>{{ brand.name }}</v-list-item-title>
                    <template v-slot:append>
                      <v-chip size="x-small" color="grey-lighten-3" class="ml-2">{{ brand.count }}</v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </div>
            </div>
            
            <v-divider></v-divider>
            
            <!-- Rango de Precio -->
            <div class="px-4 py-3 bg-white">
              <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
                <v-icon icon="fa-solid fa-tag" size="small" class="mr-2" color="primary" />
                Precio
              </h3>
              
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
                <v-chip size="small" color="grey-lighten-3">${{ formatPrice(filters.price[0]) }}</v-chip>
                <v-chip size="small" color="grey-lighten-3">${{ formatPrice(filters.price[1]) }}</v-chip>
              </div>
            </div>
            
            <v-divider></v-divider>
            
            <!-- Disponibilidad -->
            <div class="px-4 py-3 bg-white">
              <v-list-item
                @click="toggleStock"
                :active="filters.inStock"
                active-color="primary"
                rounded="lg"
                class="px-2"
              >
                <template v-slot:prepend>
                  <v-icon :color="filters.inStock ? 'primary' : 'grey'" size="small">
                    {{ filters.inStock ? 'fa-solid fa-square-check' : 'fa-regular fa-square' }}
                  </v-icon>
                </template>
                <v-list-item-title>Solo productos en stock</v-list-item-title>
              </v-list-item>
            </div>
          </div>
        </div>
        
        <v-card-actions class="px-4 py-3 bg-white d-flex">
          <v-btn
            color="error"
            variant="outlined"
            prepend-icon="fa-solid fa-xmark"
            class="mr-2"
            @click="resetFilters"
            :disabled="!hasActiveFilters"
          >
            Limpiar filtros
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            prepend-icon="fa-solid fa-check"
            class="flex-grow-1"
            @click="applyMobileFilters"
          >
            Aplicar filtros
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
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

// Estado del drawer para móviles
const mobileFilterOpen = ref(false);

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

// Seleccionar categoría
const selectCategory = (categoryId) => {
  filters.value.category = categoryId;
  emitFilterChange();
};

// Toggle marca
const toggleBrand = (brandId) => {
  const index = filters.value.brand.indexOf(brandId);
  if (index === -1) {
    filters.value.brand.push(brandId);
  } else {
    filters.value.brand.splice(index, 1);
  }
  emitFilterChange();
};

// Toggle stock
const toggleStock = () => {
  filters.value.inStock = !filters.value.inStock;
  emitFilterChange();
};

// Emitir cambios en los filtros
const emitFilterChange = () => {
  emit('filter-change', { ...filters.value });
};

// Aplicar filtros desde móvil
const applyMobileFilters = () => {
  emitFilterChange();
  mobileFilterOpen.value = false;
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
  position: relative;
}

@media (min-width: 960px) {
  .product-filters {
    position: sticky;
    top: 20px;
  }
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.bg-white {
  background-color: white !important;
}

.rounded-lg {
  border-radius: 8px !important;
}

.brand-checkbox-container {
  max-height: 200px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

/* Estilos para el drawer de filtros móviles */
.filter-drawer {
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.filter-drawer-content {
  overflow-y: auto;
  max-height: calc(85vh - 140px); /* Altura del drawer menos cabecera y pie */
}

/* Aumentar tamaño de los elementos táctiles en móvil */
@media (max-width: 600px) {
  .v-list-item {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  
  .v-icon {
    font-size: 1.2rem !important;
  }
  
  .brand-checkbox-container {
    max-height: 180px;
  }
}
</style>