<template>
  <div>
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4 text-dark">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <div v-if="loading" class="d-flex justify-center my-8">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <div v-else-if="error && !product.id" class="text-center my-8">
        <v-icon icon="fa-solid fa-triangle-exclamation" size="64" color="error" class="mb-4"></v-icon>
        <h3 class="text-h5 font-weight-medium mb-2 text-dark">Error al cargar el producto</h3>
        <p class="text-body-1 text-dark mb-4">
          {{ error }}
        </p>
        <v-btn color="primary" to="/productos">
          Volver a productos
        </v-btn>
      </div>

      <div v-else>
        <v-row>
          <!-- Imágenes del producto -->
          <v-col cols="12" md="6" class="mb-6 mb-md-0">
            <v-card class="product-images-card bg-white">
              <div class="position-relative">
                <v-img
                  :src="product.image"
                  height="400"
                  cover
                  class="main-product-image"
                >
                  <div class="product-badge" v-if="product.badge">
                    <span :class="`badge-${product.badgeType}`">{{ product.badge }}</span>
                  </div>
                </v-img>
              </div>
              
              <!-- Galería de imágenes (simulada) -->
              <div class="d-flex mt-4 px-4 pb-4 overflow-x-auto">
                <v-img
                  v-for="(_, index) in 4"
                  :key="index"
                  :src="product.image"
                  width="80"
                  height="80"
                  cover
                  class="mr-2 thumbnail-image"
                  :class="{ 'active-thumbnail': index === 0 }"
                ></v-img>
              </div>
            </v-card>
          </v-col>

          <!-- Información del producto -->
          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-2">
              <v-chip
                v-if="product.inStock"
                color="success"
                size="small"
                class="mr-2"
              >
                En stock
              </v-chip>
              <v-chip
                v-else
                color="error"
                size="small"
                class="mr-2"
              >
                Agotado
              </v-chip>
              <span class="text-caption text-medium-emphasis">SKU: {{ product.id }}</span>
            </div>

            <h1 class="text-h4 font-weight-bold mb-2 text-dark">{{ product.name }}</h1>

            <!-- Modificación en la sección de información del producto -->
            <div class="d-flex align-center mb-4">
              <div class="product-rating">
                <div class="star-rating">
                  <span v-for="n in 5" :key="n" class="star-icon">
                    <v-icon
                      :icon="n <= Math.round(product.rating) ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                      :color="n <= Math.round(product.rating) ? 'amber-darken-2' : 'grey-lighten-1'"
                      size="small"
                    />
                  </span>
                </div>
              </div>
              <span class="text-body-2 review-count ml-2 text-dark">({{ product.reviewCount }} reseñas)</span>
            </div>

            <div class="d-flex align-center mb-6">
              <div v-if="product.originalPrice" class="text-decoration-line-through text-body-1 text-medium-emphasis mr-3">
                ${{ formatPrice(product.originalPrice) }}
              </div>
              <div class="text-h4 font-weight-bold primary-text">${{ formatPrice(product.price) }}</div>
            </div>

            <p class="text-body-1 mb-6 text-dark">
              {{ product.description }}
            </p>

            <div class="d-flex align-center mb-6">
              <v-text-field
                v-model="quantity"
                type="number"
                min="1"
                max="99"
                label="Cantidad"
                variant="outlined"
                density="compact"
                hide-details
                class="quantity-input mr-4"
                style="max-width: 100px;"
              ></v-text-field>

              <v-btn
                color="primary"
                size="large"
                prepend-icon="fa-solid fa-cart-shopping"
                :disabled="!product.inStock"
                @click="addToCart"
              >
                Agregar al carrito
              </v-btn>
            </div>

            <v-divider class="my-6"></v-divider>

            <div class="mb-4">
              <div class="d-flex mb-2">
                <span class="text-body-2 font-weight-medium mr-2 text-dark">Categoría:</span>
                <router-link :to="`/productos?category=${product.categoryId}`" class="text-decoration-none text-primary">
                  {{ product.category }}
                </router-link>
              </div>
              <div class="d-flex mb-2">
                <span class="text-body-2 font-weight-medium mr-2 text-dark">Marca:</span>
                <router-link :to="`/productos?brand=${product.brandId}`" class="text-decoration-none text-primary">
                  {{ product.brand }}
                </router-link>
              </div>
            </div>

            <div class="d-flex flex-wrap">
              <v-btn
                variant="text"
                prepend-icon="fa-solid fa-share-nodes"
                class="mr-4 mb-2 text-dark"
              >
                Compartir
              </v-btn>
              <v-btn
                variant="text"
                prepend-icon="fa-regular fa-heart"
                class="mr-4 mb-2 text-dark"
              >
                Agregar a favoritos
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Tabs de información adicional -->
        <v-card class="mt-8 bg-white">
          <v-tabs
            v-model="activeTab"
            color="primary"
            align-tabs="center"
          >
            <v-tab value="description" class="text-dark">Descripción</v-tab>
            <v-tab value="specifications" class="text-dark">Especificaciones</v-tab>
            <v-tab value="reviews" class="text-dark">Reseñas ({{ product.reviewCount }})</v-tab>
          </v-tabs>

          <v-card-text class="py-6">
            <v-window v-model="activeTab">
              <v-window-item value="description">
                <div class="text-body-1 text-dark">
                  <p class="mb-4">{{ product.description }}</p>
                  
                  <div v-if="product.features && product.features.length > 0" class="mt-4">
                    <h4 class="text-subtitle-1 font-weight-bold mb-2">Características principales:</h4>
                    <ul>
                      <li v-for="(feature, index) in product.features" :key="index" class="mb-2">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                  
                  <p v-else class="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </v-window-item>

              <v-window-item value="specifications">
                <v-table class="bg-white">
                  <tbody>
                    <tr v-for="(spec, index) in product.specifications || []" :key="index">
                      <td class="font-weight-medium text-dark" width="200">{{ spec.name }}</td>
                      <td class="text-dark">{{ spec.value }}</td>
                    </tr>
                    <tr v-if="!product.specifications || product.specifications.length === 0">
                      <td class="font-weight-medium" width="200">Marca</td>
                      <td>{{ product.brand }}</td>
                    </tr>
                    <tr v-if="!product.specifications || product.specifications.length === 0">
                      <td class="font-weight-medium">Modelo</td>
                      <td>XYZ-123</td>
                    </tr>
                    <tr v-if="!product.specifications || product.specifications.length === 0">
                      <td class="font-weight-medium">Dimensiones</td>
                      <td>30 x 20 x 10 cm</td>
                    </tr>
                    <tr v-if="!product.specifications || product.specifications.length === 0">
                      <td class="font-weight-medium">Peso</td>
                      <td>1.5 kg</td>
                    </tr>
                    <tr v-if="!product.specifications || product.specifications.length === 0">
                      <td class="font-weight-medium">Material</td>
                      <td>Acero inoxidable</td>
                    </tr>
                    <tr v-if="!product.specifications || product.specifications.length === 0">
                      <td class="font-weight-medium">Garantía</td>
                      <td>1 año</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-window-item>

              <v-window-item value="reviews">
                <div class="reviews-container">
                  <div v-if="product.reviewCount === 0" class="text-center py-4">
                    <p class="text-body-1 text-dark">No hay reseñas para este producto.</p>
                  </div>
                  <div v-else>
                    <!-- Simulación de reseñas -->
                    <div v-for="i in 3" :key="i" class="review-item mb-6">
                      <div class="d-flex align-start mb-2">
                        <v-avatar color="grey-lighten-3" class="mr-3">
                          <v-icon>fa-solid fa-user</v-icon>
                        </v-avatar>
                        <div>
                          <h4 class="text-subtitle-1 font-weight-medium mb-1">Cliente {{ i }}</h4>
                          <!-- Modificación en la sección de reseñas -->
                          <div class="d-flex align-center">
                            <div class="star-rating">
                              <span v-for="n in 5" :key="n" class="star-icon">
                                <v-icon
                                  :icon="n <= 5 - (i - 1) ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                                  :color="n <= 5 - (i - 1) ? 'amber-darken-2' : 'grey-lighten-1'"
                                  size="small"
                                />
                              </span>
                            </div>
                            <span class="text-caption text-medium-emphasis ml-2">Hace {{ i * 5 }} días</span>
                          </div>
                        </div>
                      </div>
                      <p class="text-body-2 text-dark">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>

        <!-- Productos relacionados -->
        <div class="mt-8">
          <h2 class="text-h5 font-weight-bold mb-4 text-dark">Productos relacionados</h2>
          <v-row>
            <v-col 
              v-for="i in 4" 
              :key="i"
              cols="12" 
              sm="6"
              md="3"
              class="mb-4"
            >
              <ProductCard 
                :product="{
                  id: i + 100,
                  name: `Producto relacionado ${i}`,
                  price: Math.floor(Math.random() * 100000) + 10000,
                  originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 150000) + 20000 : null,
                  image: `https://picsum.photos/id/${(i % 10) + 20}/500/500`,
                  rating: (Math.random() * 2 + 3).toFixed(1),
                  reviewCount: Math.floor(Math.random() * 100),
                  badge: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Nuevo' : '-15%') : null,
                  badgeType: Math.random() > 0.5 ? 'new' : 'discount',
                  inStock: Math.random() > 0.2,
                  link: `/productos/producto-relacionado-${i}`
                }" 
                view-mode="grid"
              />
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/Productos/ProductCard.vue';
import { productService } from '@/services/productService';

const route = useRoute();
const router = useRouter();

// Estado
const product = ref({});
const loading = ref(true);
const error = ref(null);
const quantity = ref(1);
const activeTab = ref('description');

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    title: 'Inicio',
    disabled: false,
    href: '/',
  },
  {
    title: 'Productos',
    disabled: false,
    href: '/productos',
  },
  {
    title: product.value.name || 'Detalle de producto',
    disabled: true,
  },
]);

// Métodos
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const productId = route.params.id;
    // Intentar cargar el producto desde el servicio
    product.value = await productService.getProductById(productId);
  } catch (err) {
    console.error('Error fetching product:', err);
    // Cargar el producto por defecto sin mostrar error
    product.value = getDefaultProduct();
    // Comentado para no mostrar el error
    // error.value = 'No se pudo cargar el producto. Por favor, intente nuevamente más tarde.';
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  // Aquí iría la lógica para agregar al carrito
  console.log('Agregando al carrito:', {
    productId: product.value.id,
    quantity: quantity.value
  });
};

const getDefaultProduct = () => ({
  id: route.params.id,
  name: 'Taladro Percutor Inalámbrico DeWalt DCD778S2T-QW',
  price: 129990,
  originalPrice: 159990,
  image: 'https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg',
  rating: 4.8,
  reviewCount: 24,
  badge: 'Oferta',
  badgeType: 'discount',
  inStock: true,
  description: 'Taladro percutor inalámbrico de 18V con 2 baterías de litio de 1.5Ah. Motor sin escobillas que proporciona un 57% más de autonomía. 2 velocidades variables y reversibles (0-600 / 0-2000 rpm). Par máximo de 65 Nm para las aplicaciones más exigentes. Portabrocas metálico de cierre rápido de 13mm. Incluye maletín, cargador y 2 baterías.',
  category: 'Herramientas Eléctricas',
  categoryId: 1,
  brand: 'DeWalt',
  brandId: 1,
  specifications: [
    { name: 'Modelo', value: 'DCD778S2T-QW' },
    { name: 'Voltaje', value: '18V' },
    { name: 'Tipo de batería', value: 'Li-Ion' },
    { name: 'Capacidad de batería', value: '1.5Ah' },
    { name: 'Velocidad sin carga', value: '0-600 / 0-2000 rpm' },
    { name: 'Par máximo', value: '65 Nm' },
    { name: 'Capacidad portabrocas', value: '13mm' },
    { name: 'Peso', value: '1.6 kg' },
    { name: 'Dimensiones', value: '31 x 21.5 x 7.6 cm' },
    { name: 'Garantía', value: '3 años' }
  ],
  features: [
    'Motor sin escobillas para mayor eficiencia y durabilidad',
    'Luz LED para iluminar el área de trabajo',
    'Empuñadura ergonómica con revestimiento de goma',
    'Selector de par con 15 posiciones',
    'Incluye 2 baterías, cargador y maletín de transporte'
  ]
});

// Inicialización
onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.product-page {
  background-color: #f8f9fa;
  color: rgba(0, 0, 0, 0.87);
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.bg-white {
  background-color: white !important;
}

.product-images-card {
  border-radius: 12px;
  overflow: hidden;
}

.main-product-image {
  border-radius: 12px 12px 0 0;
}

.thumbnail-image {
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.thumbnail-image:hover,
.thumbnail-image.active-thumbnail {
  opacity: 1;
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
}

.badge-discount, .badge-new, .badge-hot {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}

.badge-discount {
  background-color: #FF5722;
}

.badge-new {
  background-color: #FF9800;
}

.badge-hot {
  background-color: #F44336;
}

.review-count {
  color: rgba(0, 0, 0, 0.6);
}

.primary-text {
  color: #1867C0 !important;
}

.quantity-input :deep(.v-field__input) {
  text-align: center;
}

.reviews-container {
  max-height: 500px;
  overflow-y: auto;
}

.review-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 1rem;
}

.review-item:last-child {
  border-bottom: none;
}

.star-rating {
  display: flex;
  align-items: center;
}

.star-icon {
  display: inline-flex;
  margin-right: 2px;
}

.star-icon:last-child {
  margin-right: 0;
}
</style>