<template>
  <div class="products-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4 text-dark">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <!-- Título de la página -->
      <div class="mb-6">
        <h1 class="text-h4 font-weight-bold mb-2 text-dark">Productos</h1>
        <p class="text-subtitle-1 text-dark">
          Encuentra todo lo que necesitas para tus proyectos
        </p>
      </div>

      <v-row>
        <!-- Filtros (Sidebar) -->
        <v-col cols="12" md="3" class="pr-md-6">
          <ProductFilters 
            :categories="categories"
            :brands="brands"
            :priceRange="priceRange"
            @filter-change="applyFilters"
          />
        </v-col>

        <!-- Lista de Productos -->
        <v-col cols="12" md="9">
          <!-- Controles superiores: ordenamiento, vista, etc. -->
          <div class="d-flex flex-wrap justify-space-between align-center mb-6 bg-white pa-4 rounded">
            <div class="d-flex align-center mb-3 mb-sm-0">
              <span class="text-body-2 mr-3 text-dark">{{ totalProducts }} productos</span>
            </div>
            
            <div class="d-flex flex-wrap">
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Ordenar por"
                density="compact"
                variant="outlined"
                hide-details
                class="sort-select mr-2"
                bg-color="white"
                @update:model-value="fetchProducts"
              ></v-select>
              
              <div class="d-flex align-center">
                <v-btn
                  icon
                  variant="text"
                  :color="viewMode === 'grid' ? 'primary' : ''"
                  @click="viewMode = 'grid'"
                >
                  <v-icon>fa-solid fa-grip</v-icon>
                </v-btn>
                <v-btn
                  icon
                  variant="text"
                  :color="viewMode === 'list' ? 'primary' : ''"
                  @click="viewMode = 'list'"
                >
                  <v-icon>fa-solid fa-list</v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <!-- Productos -->
          <div v-if="loading" class="d-flex justify-center my-8">
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          </div>

          <div v-else-if="products.length === 0" class="text-center my-8">
            <v-icon icon="fa-solid fa-box-open" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
            <h3 class="text-h5 font-weight-medium mb-2 text-dark">No se encontraron productos</h3>
            <p class="text-body-1 text-dark">
              Intenta con otros filtros o términos de búsqueda
            </p>
          </div>

          <v-row v-else>
            <v-col 
              v-for="product in products" 
              :key="product.id"
              :cols="viewMode === 'grid' ? 12 : 12"
              :sm="viewMode === 'grid' ? 6 : 12"
              :md="viewMode === 'grid' ? 4 : 12"
              class="mb-4"
            >
              <ProductCard 
                :product="product" 
                :view-mode="viewMode"
              />
            </v-col>
          </v-row>

          <!-- Paginación -->
          <div class="d-flex justify-center mt-8">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="7"
              @update:model-value="fetchProducts"
              color="primary"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductFilters from '@/components/Productos/ProductFilters.vue';
import ProductCard from '@/components/Productos/ProductCard.vue';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';

const route = useRoute();

// Estado
const products = ref([]);
const categories = ref([]);
const brands = ref([]);
const loading = ref(true);
const totalProducts = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const viewMode = ref('grid'); // 'grid' o 'list'
const sortBy = ref('newest');
const activeFilters = ref({
  category: null,
  brand: [],
  price: [0, 500000],
  inStock: false
});

// Opciones de ordenamiento
const sortOptions = [
  { title: 'Más recientes', value: 'newest' },
  { title: 'Precio: menor a mayor', value: 'price_asc' },
  { title: 'Precio: mayor a menor', value: 'price_desc' },
  { title: 'Nombre: A-Z', value: 'name_asc' },
  { title: 'Nombre: Z-A', value: 'name_desc' },
  { title: 'Más populares', value: 'popularity' }
];

// Rango de precios
const priceRange = ref([0, 500000]);

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    href: '/',
  },
  {
    title: 'Productos',
    disabled: true,
    href: '/productos',
  },
];

// Computed
const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / itemsPerPage.value);
});

// Métodos
const fetchProducts = async () => {
  loading.value = true;
  try {
    // En un entorno real, aquí se llamaría a la API con los filtros
    const params = {
      page: currentPage.value,
      limit: itemsPerPage.value,
      sort: sortBy.value,
      ...activeFilters.value
    };
    
    const response = await productService.getProducts(params);
    products.value = response.products;
    totalProducts.value = response.total;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Usar datos de ejemplo en caso de error
    products.value = getDefaultProducts();
    totalProducts.value = products.value.length;
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    categories.value = await categoryService.getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    categories.value = getDefaultCategories();
  }
};

const fetchBrands = async () => {
  try {
    brands.value = await brandService.getBrands();
  } catch (error) {
    console.error('Error fetching brands:', error);
    brands.value = getDefaultBrands();
  }
};

const applyFilters = (filters) => {
  activeFilters.value = { ...filters };
  currentPage.value = 1; // Resetear a la primera página al cambiar filtros
  fetchProducts();
};

// Datos por defecto (para desarrollo)
const getDefaultProducts = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Producto de ejemplo ${i + 1}`,
    price: Math.floor(Math.random() * 100000) + 10000,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 150000) + 20000 : null,
    image: `https://picsum.photos/id/${(i % 10) + 10}/500/500`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviewCount: Math.floor(Math.random() * 100),
    badge: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Nuevo' : '-15%') : null,
    badgeType: Math.random() > 0.5 ? 'new' : 'discount',
    inStock: Math.random() > 0.2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Herramientas',
    brand: 'Marca ejemplo',
    link: `/productos/producto-ejemplo-${i + 1}`
  }));
};

const getDefaultCategories = () => {
  return [
    { id: 1, name: 'Herramientas Eléctricas', count: 45 },
    { id: 2, name: 'Herramientas Manuales', count: 32 },
    { id: 3, name: 'Materiales de Construcción', count: 28 },
    { id: 4, name: 'Electricidad', count: 19 },
    { id: 5, name: 'Plomería', count: 23 },
    { id: 6, name: 'Pinturas', count: 17 },
    { id: 7, name: 'Seguridad', count: 12 }
  ];
};

const getDefaultBrands = () => {
  return [
    { id: 1, name: 'DeWalt', count: 24 },
    { id: 2, name: 'Bosch', count: 18 },
    { id: 3, name: 'Makita', count: 15 },
    { id: 4, name: 'Stanley', count: 12 },
    { id: 5, name: 'Black & Decker', count: 10 },
    { id: 6, name: 'Milwaukee', count: 8 }
  ];
};

// Inicialización
onMounted(async () => {
  // Verificar si hay parámetros en la URL
  if (route.query.category) {
    activeFilters.value.category = route.query.category;
  }
  
  await Promise.all([
    fetchCategories(),
    fetchBrands()
  ]);
  
  fetchProducts();
});
</script>

<style scoped>
.products-page {
  background-color: #f8f9fa;
  color: rgba(0, 0, 0, 0.87);
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.bg-white {
  background-color: white !important;
}

.rounded {
  border-radius: 8px;
}

.sort-select {
  max-width: 200px;
}

@media (max-width: 600px) {
  .sort-select {
    max-width: 150px;
  }
}
</style>