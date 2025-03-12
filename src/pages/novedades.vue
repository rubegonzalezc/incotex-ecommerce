<template>
  <div class="novedades-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <!-- Título de la página -->
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold mb-2">Novedades</h1>
        <p class="text-subtitle-1">Descubre los productos más recientes en nuestra tienda</p>
      </div>

      <!-- Banner de novedades -->
      <v-card class="mb-8 rounded-lg overflow-hidden">
        <v-img
          src="https://via.placeholder.com/1200x300?text=Nuevos+Productos"
          height="300"
          cover
          class="bg-primary"
        >
          <div class="d-flex flex-column justify-center align-center fill-height">
            <div class="text-white text-center px-4">
              <h2 class="text-h4 font-weight-bold mb-2">¡DESCUBRE LO ÚLTIMO!</h2>
              <p class="text-subtitle-1 mb-4">Los productos más nuevos y tendencias del mercado</p>
              <v-btn
                color="white"
                variant="outlined"
                size="large"
                class="text-primary"
                @click="scrollToProducts"
              >
                Ver novedades
              </v-btn>
            </div>
          </div>
        </v-img>
      </v-card>

      <!-- Filtros y productos -->
      <div ref="productsSection">
        <!-- Botón de filtro móvil (visible solo en móviles) -->
        <v-btn
          block
          color="primary"
          variant="elevated"
          prepend-icon="fa-solid fa-filter"
          class="mb-4 d-md-none"
          @click="mobileFilterOpen = true"
        >
          Filtrar Novedades
        </v-btn>
        
        <v-row>
          <!-- Filtros en sidebar (visible solo en escritorio) -->
          <v-col cols="12" md="3" class="d-none d-md-block">
            <v-card class="filter-card rounded-lg" elevation="2">
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
              
              <!-- Filtro por categoría -->
              <div class="px-4 py-3 bg-white">
                <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
                  <v-icon icon="fa-solid fa-tags" size="small" class="mr-2" color="primary" />
                  Categorías
                </h3>
                
                <v-list density="compact" class="pa-0 bg-transparent">
                  <v-list-item
                    value=""
                    @click="toggleCategoryFilter(null)"
                    :active="filters.category === null"
                    active-color="primary"
                    rounded="lg"
                    class="px-2 my-1"
                  >
                    <template v-slot:prepend>
                      <v-icon :color="filters.category === null ? 'primary' : 'grey'" size="small">
                        {{ filters.category === null ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle' }}
                      </v-icon>
                    </template>
                    <v-list-item-title>Todas las categorías</v-list-item-title>
                  </v-list-item>
                  
                  <v-list-item
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    @click="toggleCategoryFilter(category.id)"
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
                  </v-list-item>
                </v-list>
              </div>
              
              <v-divider></v-divider>
              
              <!-- Filtro por marca -->
              <div class="px-4 py-3 bg-white">
                <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
                  <v-icon icon="fa-solid fa-building" size="small" class="mr-2" color="primary" />
                  Marcas
                </h3>
                
                <v-list density="compact" class="pa-0 bg-transparent">
                  <v-list-item
                    v-for="brand in brands"
                    :key="brand.id"
                    @click="toggleBrandFilter(brand.id)"
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
                  </v-list-item>
                </v-list>
              </div>
              
              <v-divider></v-divider>
              
              <!-- Filtro por precio -->
              <div class="px-4 py-3 bg-white">
                <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
                  <v-icon icon="fa-solid fa-tag" size="small" class="mr-2" color="primary" />
                  Precio
                </h3>
                
                <v-range-slider
                  v-model="filters.price"
                  :min="priceRange.min"
                  :max="priceRange.max"
                  :step="1000"
                  color="primary"
                  thumb-label="always"
                  hide-details
                  class="mt-6"
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
              
              <!-- Botón para aplicar filtros en desktop -->
              <div class="px-4 py-3 bg-white d-flex justify-end">
                <v-btn
                  color="primary"
                  variant="elevated"
                  prepend-icon="fa-solid fa-check"
                  @click="applyFilters"
                >
                  Aplicar filtros
                </v-btn>
              </div>
            </v-card>
          </v-col>
          
          <!-- Productos -->
          <v-col cols="12" md="9">            
            <!-- Ordenar y número de resultados -->
            <div class="d-flex align-center justify-space-between mb-4 flex-wrap bg-white pa-4 rounded-lg">
              <p class="text-body-1 mb-0 text-dark">{{ totalProducts }} productos encontrados</p>
              
              <v-select
                v-model="filters.sort"
                :items="sortOptions"
                label="Ordenar por"
                variant="outlined"
                density="compact"
                hide-details
                class="sort-select"
                bg-color="white"
                @update:model-value="applyFilters"
              ></v-select>
            </div>
            
            <!-- Lista de productos -->
            <div v-if="loading" class="d-flex justify-center my-8">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              ></v-progress-circular>
            </div>
            
            <div v-else-if="products.length === 0" class="text-center my-8">
              <v-icon icon="fa-solid fa-search" size="x-large" color="grey-lighten-1" class="mb-4"></v-icon>
              <h3 class="text-h5 font-weight-bold mb-2">No se encontraron productos</h3>
              <p class="text-body-1 mb-4">Intenta con otros filtros o revisa más tarde</p>
              <v-btn
                color="primary"
                @click="resetFilters"
              >
                Limpiar filtros
              </v-btn>
            </div>
            
            <v-row v-else>
              <v-col
                v-for="product in products"
                :key="product.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-card
                  class="h-100 product-card rounded-lg"
                  :to="`/productos/${product.id}`"
                >
                  <div class="position-relative">
                    <v-img
                      :src="product.image"
                      height="250"
                      cover
                      class="bg-grey-lighten-3"
                    ></v-img>
                    
                    <div
                      v-if="product.badge"
                      class="product-badge"
                      :class="`badge-${product.badgeType || 'new'}`"
                    >
                      {{ product.badge }}
                    </div>
                  </div>
                  
                  <v-card-text class="pa-4">
                    <div class="d-flex align-center mb-1">
                      <v-rating
                        :model-value="product.rating"
                        color="amber"
                        density="compact"
                        size="small"
                        readonly
                        half-increments
                      ></v-rating>
                      <span class="text-caption ml-1">({{ product.reviewCount }})</span>
                    </div>
                    
                    <h3 class="text-subtitle-1 font-weight-medium product-name mb-1">
                      {{ product.name }}
                    </h3>
                    
                    <div class="d-flex align-center">
                      <span class="text-h6 font-weight-bold primary--text">${{ formatPrice(product.price) }}</span>
                      <span
                        v-if="product.originalPrice && product.originalPrice > product.price"
                        class="text-decoration-line-through text-caption ml-2"
                      >
                        ${{ formatPrice(product.originalPrice) }}
                      </span>
                    </div>
                  </v-card-text>
                  
                  <v-card-actions class="pa-4 pt-0">
                    <v-btn
                      color="primary"
                      variant="flat"
                      block
                      @click.stop="addToCart(product)"
                    >
                      <v-icon icon="fa-solid fa-cart-plus" class="mr-2"></v-icon>
                      Agregar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            
            <!-- Paginación -->
            <div class="d-flex justify-center mt-8">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="7"
                rounded
                @update:model-value="handlePageChange"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    
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
          <!-- Filtro por categoría -->
          <div class="px-4 py-3 bg-white">
            <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
              <v-icon icon="fa-solid fa-tags" size="small" class="mr-2" color="primary" />
              Categorías
            </h3>
            
            <v-list density="compact" class="pa-0 bg-transparent">
              <v-list-item
                value=""
                @click="toggleCategoryFilter(null)"
                :active="filters.category === null"
                active-color="primary"
                rounded="lg"
                class="px-2 my-1"
              >
                <template v-slot:prepend>
                  <v-icon :color="filters.category === null ? 'primary' : 'grey'" size="small">
                    {{ filters.category === null ? 'fa-solid fa-circle-dot' : 'fa-regular fa-circle' }}
                  </v-icon>
                </template>
                <v-list-item-title>Todas las categorías</v-list-item-title>
              </v-list-item>
              
              <v-list-item
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                @click="toggleCategoryFilter(category.id)"
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
              </v-list-item>
            </v-list>
          </div>
          
          <v-divider></v-divider>
          
          <!-- Filtro por marca -->
          <div class="px-4 py-3 bg-white">
            <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
              <v-icon icon="fa-solid fa-building" size="small" class="mr-2" color="primary" />
              Marcas
            </h3>
            
            <v-list density="compact" class="pa-0 bg-transparent">
              <v-list-item
                v-for="brand in brands"
                :key="brand.id"
                @click="toggleBrandFilter(brand.id)"
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
              </v-list-item>
            </v-list>
          </div>
          
          <v-divider></v-divider>
          
          <!-- Filtro por precio -->
          <div class="px-4 py-3 bg-white">
            <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark d-flex align-center">
              <v-icon icon="fa-solid fa-tag" size="small" class="mr-2" color="primary" />
              Precio
            </h3>
            
            <v-range-slider
              v-model="filters.price"
              :min="priceRange.min"
              :max="priceRange.max"
              :step="1000"
              color="primary"
              thumb-label="always"
              hide-details
              class="mt-6"
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
            Limpiar
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
    
    <!-- Snackbar para mensajes -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';
import { useCartStore } from '@/stores/cartStore';

const router = useRouter();
const cartStore = useCartStore();

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    title: 'Novedades',
    disabled: true,
  },
];

// Referencias
const productsSection = ref(null);
const mobileFilterOpen = ref(false);

// Estado
const loading = ref(true);
const products = ref([]);
const totalProducts = ref(0);
const currentPage = ref(1);
const totalPages = ref(1);
const categories = ref([]);
const brands = ref([]);
const priceRange = reactive({
  min: 0,
  max: 500000,
});

// Filtros
const filters = reactive({
  category: null,
  brand: [],
  price: [0, 500000],
  sort: 'newest',
});

// Opciones de ordenamiento
const sortOptions = [
  { title: 'Más recientes', value: 'newest' },
  { title: 'Menor precio', value: 'price_asc' },
  { title: 'Mayor precio', value: 'price_desc' },
  { title: 'Más populares', value: 'popularity_desc' },
  { title: 'A-Z', value: 'name_asc' },
  { title: 'Z-A', value: 'name_desc' },
];

// Snackbar para mensajes
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000,
});

// Verificar si hay filtros activos
const hasActiveFilters = computed(() => {
  return filters.category !== null || 
         filters.brand.length > 0 || 
         filters.price[0] !== priceRange.min || 
         filters.price[1] !== priceRange.max ||
         filters.sort !== 'newest';
});

// Cargar datos iniciales
onMounted(async () => {
  try {
    await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchBrands(),
    ]);
  } catch (error) {
    console.error('Error loading initial data:', error);
    showMessage('Error al cargar los datos. Por favor, intenta nuevamente.', 'error');
  }
});

// Método para obtener productos
const fetchProducts = async () => {
  loading.value = true;
  console.log('Aplicando filtros:', {
    page: currentPage.value,
    limit: 12,
    sort: filters.sort,
    category: filters.category,
    brand: filters.brand,
    price: filters.price
  });
  
  try {
    const response = await productService.getNewProducts({
      page: currentPage.value,
      limit: 12,
      sort: filters.sort,
      category: filters.category,
      brand: filters.brand,
      price: filters.price,
    });
    
    console.log('Productos recibidos:', response);
    products.value = response.products;
    totalProducts.value = response.total;
    totalPages.value = response.totalPages;
  } catch (error) {
    console.error('Error fetching products:', error);
    showMessage('Error al cargar los productos. Por favor, intenta nuevamente.', 'error');
  } finally {
    loading.value = false;
  }
};

// Método para obtener categorías
const fetchCategories = async () => {
  try {
    categories.value = await categoryService.getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Método para obtener marcas
const fetchBrands = async () => {
  try {
    brands.value = await brandService.getBrands();
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
};

// Método para aplicar filtros
const applyFilters = () => {
  currentPage.value = 1;
  fetchProducts();
};

// Aplicar filtros desde móvil
const applyMobileFilters = () => {
  mobileFilterOpen.value = false;
  applyFilters();
};

// Método para resetear filtros
const resetFilters = () => {
  filters.category = null;
  filters.brand = [];
  filters.price = [priceRange.min, priceRange.max];
  filters.sort = 'newest';
  currentPage.value = 1;
  
  if (mobileFilterOpen.value) {
    mobileFilterOpen.value = false;
  }
  
  fetchProducts();
};

// Método para cambiar de página
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchProducts();
  
  // Scroll al inicio de la sección de productos
  if (productsSection.value) {
    productsSection.value.scrollIntoView({ behavior: 'smooth' });
  }
};

// Método para alternar filtro de categoría
const toggleCategoryFilter = (categoryId) => {
  filters.category = categoryId;
  applyFilters(); // Ahora aplicamos los filtros inmediatamente
};

// Método para alternar filtro de marca
const toggleBrandFilter = (brandId) => {
  const index = filters.brand.indexOf(brandId);
  if (index === -1) {
    filters.brand.push(brandId);
  } else {
    filters.brand.splice(index, 1);
  }
  applyFilters(); // Ahora aplicamos los filtros inmediatamente
};

// Método para formatear precio
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL').format(Math.round(price));
};

// Método para agregar al carrito
const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
  });
  
  showMessage(`${product.name} agregado al carrito`);
};

// Método para mostrar mensajes
const showMessage = (text, color = 'success') => {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
};

// Método para desplazarse a la sección de productos
const scrollToProducts = () => {
  if (productsSection.value) {
    productsSection.value.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.novedades-page {
  background-color: #f8f9fa;
  min-height: 100vh;
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

.product-card {
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.product-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.5em;
}

.position-relative {
  position: relative;
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}

.badge-discount {
  background-color: #f44336;
}

.badge-new {
  background-color: #4caf50;
}

.badge-featured {
  background-color: #2196f3;
}

.sort-select {
  max-width: 200px;
}

/* Estilos para filtros */
.filter-card {
  position: sticky;
  top: 20px;
}

.brand-list-container {
  max-height: 200px;
  overflow-y: auto;
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
  .sort-select {
    width: 100%;
    max-width: none;
    margin-top: 8px;
  }
  
  .v-list-item {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  
  .v-icon {
    font-size: 1.2rem !important;
  }
}
</style> 