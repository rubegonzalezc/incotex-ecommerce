<template>
  <div class="offers-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <!-- Título de la página -->
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold mb-2">Ofertas Especiales</h1>
        <p class="text-subtitle-1">Descubre nuestros mejores productos con descuentos increíbles</p>
      </div>

      <!-- Banner de ofertas -->
      <v-card class="mb-8 rounded-lg overflow-hidden">
        <v-img
          src="https://via.placeholder.com/1200x300?text=Ofertas+Especiales"
          height="300"
          cover
          class="bg-primary"
        >
          <div class="d-flex flex-column justify-center align-center fill-height">
            <div class="text-white text-center px-4">
              <h2 class="text-h4 font-weight-bold mb-2">¡HASTA 50% DE DESCUENTO!</h2>
              <p class="text-subtitle-1 mb-4">Ofertas por tiempo limitado. ¡No te las pierdas!</p>
              <v-btn
                color="white"
                variant="outlined"
                size="large"
                class="text-primary"
                @click="scrollToProducts"
              >
                Ver ofertas
              </v-btn>
            </div>
          </div>
        </v-img>
      </v-card>

      <!-- Filtros y productos -->
      <div ref="productsSection">
        <v-row>
          <!-- Filtros en sidebar -->
          <v-col cols="12" md="3" class="d-none d-md-block">
            <v-card class="pa-4 rounded-lg">
              <h3 class="text-h6 font-weight-bold mb-4">Filtros</h3>
              
              <!-- Filtro por categoría -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">Categorías</h4>
                <v-list density="compact">
                  <v-list-item
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    @click="toggleCategoryFilter(category.id)"
                    :active="filters.category === category.id"
                    active-color="primary"
                  >
                    <template v-slot:prepend>
                      <v-checkbox-btn
                        :model-value="filters.category === category.id"
                        density="compact"
                        color="primary"
                      ></v-checkbox-btn>
                    </template>
                    <v-list-item-title>{{ category.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
              
              <!-- Filtro por marca -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">Marcas</h4>
                <v-list density="compact">
                  <v-list-item
                    v-for="brand in brands"
                    :key="brand.id"
                    :value="brand.id"
                    @click="toggleBrandFilter(brand.id)"
                    :active="filters.brand.includes(brand.id)"
                    active-color="primary"
                  >
                    <template v-slot:prepend>
                      <v-checkbox-btn
                        :model-value="filters.brand.includes(brand.id)"
                        density="compact"
                        color="primary"
                      ></v-checkbox-btn>
                    </template>
                    <v-list-item-title>{{ brand.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
              
              <!-- Filtro por precio -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">Precio</h4>
                <v-range-slider
                  v-model="filters.price"
                  :min="priceRange.min"
                  :max="priceRange.max"
                  :step="1000"
                  thumb-label="always"
                  color="primary"
                  class="mt-6"
                  @end="applyFilters"
                >
                  <template v-slot:thumb-label="{ modelValue }">
                    ${{ formatPrice(modelValue) }}
                  </template>
                </v-range-slider>
                <div class="d-flex justify-space-between">
                  <span>${{ formatPrice(filters.price[0]) }}</span>
                  <span>${{ formatPrice(filters.price[1]) }}</span>
                </div>
              </div>
              
              <!-- Botones de acción -->
              <div class="d-flex flex-column">
                <v-btn
                  color="primary"
                  variant="outlined"
                  class="mb-2"
                  @click="applyFilters"
                >
                  Aplicar filtros
                </v-btn>
                <v-btn
                  variant="text"
                  @click="resetFilters"
                >
                  Limpiar filtros
                </v-btn>
              </div>
            </v-card>
          </v-col>
          
          <!-- Productos -->
          <v-col cols="12" md="9">
            <!-- Filtros móviles -->
            <v-card class="mb-4 d-md-none rounded-lg">
              <v-expansion-panels variant="accordion">
                <v-expansion-panel title="Filtros">
                  <v-expansion-panel-text>
                    <!-- Filtro por categoría -->
                    <div class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Categorías</h4>
                      <v-select
                        v-model="filters.category"
                        :items="categories"
                        item-title="name"
                        item-value="id"
                        label="Selecciona una categoría"
                        variant="outlined"
                        density="compact"
                        clearable
                        @update:model-value="applyFilters"
                      ></v-select>
                    </div>
                    
                    <!-- Filtro por marca -->
                    <div class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Marcas</h4>
                      <v-select
                        v-model="filters.brand"
                        :items="brands"
                        item-title="name"
                        item-value="id"
                        label="Selecciona marcas"
                        variant="outlined"
                        density="compact"
                        multiple
                        chips
                        clearable
                        @update:model-value="applyFilters"
                      ></v-select>
                    </div>
                    
                    <!-- Filtro por precio -->
                    <div class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Precio</h4>
                      <v-range-slider
                        v-model="filters.price"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        :step="1000"
                        thumb-label="always"
                        color="primary"
                        class="mt-6"
                        @end="applyFilters"
                      >
                        <template v-slot:thumb-label="{ modelValue }">
                          ${{ formatPrice(modelValue) }}
                        </template>
                      </v-range-slider>
                      <div class="d-flex justify-space-between">
                        <span>${{ formatPrice(filters.price[0]) }}</span>
                        <span>${{ formatPrice(filters.price[1]) }}</span>
                      </div>
                    </div>
                    
                    <!-- Botones de acción -->
                    <div class="d-flex justify-end">
                      <v-btn
                        variant="text"
                        class="mr-2"
                        @click="resetFilters"
                      >
                        Limpiar
                      </v-btn>
                      <v-btn
                        color="primary"
                        @click="applyFilters"
                      >
                        Aplicar
                      </v-btn>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
            
            <!-- Ordenar y número de resultados -->
            <div class="d-flex align-center justify-space-between mb-4 flex-wrap">
              <p class="text-body-1 mb-0">{{ totalProducts }} productos encontrados</p>
              
              <v-select
                v-model="filters.sort"
                :items="sortOptions"
                label="Ordenar por"
                variant="outlined"
                density="compact"
                hide-details
                class="sort-select"
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
                      :class="`badge-${product.badgeType || 'discount'}`"
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
                      
                      <v-spacer></v-spacer>
                      
                      <v-chip
                        v-if="calculateDiscount(product.price, product.originalPrice) > 0"
                        color="error"
                        size="small"
                        class="font-weight-bold"
                      >
                        -{{ calculateDiscount(product.price, product.originalPrice) }}%
                      </v-chip>
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
import { useCartStore } from '@/stores/cartStore'; // Corregido de '@/stores/cart' a '@/stores/cartStore'

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
    title: 'Ofertas',
    disabled: true,
  },
];

// Referencias
const productsSection = ref(null);

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
  sort: 'discount_desc',
});

// Opciones de ordenamiento
const sortOptions = [
  { title: 'Mayor descuento', value: 'discount_desc' },
  { title: 'Menor precio', value: 'price_asc' },
  { title: 'Mayor precio', value: 'price_desc' },
  { title: 'Más populares', value: 'popularity_desc' },
  { title: 'Más recientes', value: 'newest' },
];

// Snackbar para mensajes
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000,
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
  
  try {
    const response = await productService.getDiscountedProducts({
      page: currentPage.value,
      limit: 12,
      sort: filters.sort,
      category: filters.category,
      brand: filters.brand,
      price: filters.price,
    });
    
    products.value = response.data;
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
    // Aquí iría la llamada al servicio para obtener las categorías
    // Por ahora usamos datos de ejemplo
    categories.value = [
      { id: 1, name: 'Electrónica' },
      { id: 2, name: 'Hogar' },
      { id: 3, name: 'Ropa' },
      { id: 4, name: 'Deportes' },
      { id: 5, name: 'Juguetes' },
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Método para obtener marcas
const fetchBrands = async () => {
  try {
    // Aquí iría la llamada al servicio para obtener las marcas
    // Por ahora usamos datos de ejemplo
    brands.value = [
      { id: 1, name: 'Samsung' },
      { id: 2, name: 'Apple' },
      { id: 3, name: 'Sony' },
      { id: 4, name: 'LG' },
      { id: 5, name: 'Nike' },
      { id: 6, name: 'Adidas' },
    ];
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
};

// Método para aplicar filtros
const applyFilters = () => {
  currentPage.value = 1;
  fetchProducts();
};

// Método para resetear filtros
const resetFilters = () => {
  filters.category = null;
  filters.brand = [];
  filters.price = [priceRange.min, priceRange.max];
  filters.sort = 'discount_desc';
  currentPage.value = 1;
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
  filters.category = filters.category === categoryId ? null : categoryId;
  applyFilters();
};

// Método para alternar filtro de marca
const toggleBrandFilter = (brandId) => {
  const index = filters.brand.indexOf(brandId);
  if (index === -1) {
    filters.brand.push(brandId);
  } else {
    filters.brand.splice(index, 1);
  }
  applyFilters();
};

// Método para formatear precio
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL').format(Math.round(price));
};

// Método para calcular porcentaje de descuento
const calculateDiscount = (currentPrice, originalPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
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
.offers-page {
  background-color: #f8f9fa;
  min-height: 100vh;
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

@media (max-width: 600px) {
  .sort-select {
    width: 100%;
    max-width: none;
    margin-top: 8px;
  }
}
</style>