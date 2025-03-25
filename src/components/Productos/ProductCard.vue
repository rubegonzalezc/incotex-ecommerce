<template>
  <v-card
    elevation="2"
    rounded="lg"
    class="product-card bg-white"
  >
    <div :class="['d-flex', viewMode === 'list' ? 'flex-row' : 'flex-column']">
      <!-- Imagen del producto -->
      <div :class="[viewMode === 'list' ? 'product-image-container-list' : 'position-relative']">
        <v-img
          :src="product.image"
          :height="viewMode === 'list' ? '180' : '220'"
          cover
          class="product-image"
          @click="navigateToDetail"
        >
          <div class="product-badge" v-if="product.badge">
            <span :class="`badge-${product.badgeType}`">{{ product.badge }}</span>
          </div>
        </v-img>
      </div>
      
      <!-- Información del producto -->
      <v-card-text :class="['pa-4', viewMode === 'list' ? 'flex-grow-1' : '']">
        <div v-if="viewMode === 'list'" class="d-flex flex-column h-100">
          <div @click="navigateToDetail">
            <div class="d-flex align-center mb-1">
              <span class="text-caption text-medium-emphasis">{{ product.category }}</span>
              <v-spacer></v-spacer>
              <span class="text-caption text-medium-emphasis">{{ product.brand }}</span>
            </div>
            
            <h3 class="text-h6 font-weight-bold mb-2 text-dark">{{ product.name }}</h3>
            
            <p class="text-body-2 text-medium-emphasis mb-3 product-description">
              {{ product.description }}
            </p>
          </div>
          
          <div class="mt-auto">
            <!-- Reemplazar el componente v-rating con nuestra implementación manual de estrellas -->
            <div class="d-flex align-center mb-2" @click="navigateToDetail">
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
              <span class="text-caption review-count ml-2">({{ product.reviewCount }})</span>
            </div>
            
            <div class="d-flex align-center justify-space-between" @click="navigateToDetail">
              <!-- Información para cotización en lugar de precio -->
              <div class="cotizar-text">
                <v-icon icon="fa-solid fa-file-invoice" size="small" class="mr-1"></v-icon>
                Solicitar cotización
              </div>
              
              <v-chip
                v-if="product.inStock"
                color="success"
                size="small"
                class="text-caption"
              >
                En stock
              </v-chip>
              <v-chip
                v-else
                color="error"
                size="small"
                class="text-caption"
              >
                Agotado
              </v-chip>
            </div>
            
            <!-- Botón de agregar a cotización -->
            <v-btn
              color="primary"
              variant="flat"
              block
              class="mt-3"
              @click.stop="addToQuote"
              :disabled="!product.inStock"
            >
              <v-icon icon="fa-solid fa-plus" class="mr-2"></v-icon>
              Agregar a cotización
            </v-btn>
          </div>
        </div>
        
        <div v-else>
          <div @click="navigateToDetail">
            <h3 class="text-subtitle-1 font-weight-bold mb-2 product-title text-dark">{{ product.name }}</h3>
            
            <div class="d-flex align-center mb-2">
              <div class="product-rating">
                <div class="star-rating">
                  <span v-for="n in 5" :key="n" class="star-icon">
                    <v-icon
                      :icon="n <= Math.round(validateRating(product.rating)) ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                      :color="n <= Math.round(validateRating(product.rating)) ? 'amber-darken-2' : 'grey-lighten-1'"
                      size="small"
                    />
                  </span>
                </div>
              </div>
              <span class="text-caption review-count ml-2">({{ product.reviewCount }})</span>
            </div>
            
            <!-- Texto de cotización en vista de cuadrícula -->
            <div class="cotizar-text mb-2">
              <v-icon icon="fa-solid fa-file-invoice" size="small" class="mr-1"></v-icon>
              Solicitar cotización
            </div>
            
            <div class="d-flex justify-end">
              <v-chip
                v-if="product.inStock"
                color="success"
                size="small"
                class="text-caption"
              >
                En stock
              </v-chip>
              <v-chip
                v-else
                color="error"
                size="small"
                class="text-caption"
              >
                Agotado
              </v-chip>
            </div>
          </div>
          
          <!-- Botón de agregar a cotización -->
          <v-btn
            color="primary"
            variant="flat"
            block
            class="mt-3"
            @click.stop="addToQuote"
            :disabled="!product.inStock"
          >
            <v-icon icon="fa-solid fa-plus" class="mr-2"></v-icon>
            Agregar a cotización
          </v-btn>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['add-to-quote']);

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid'
  }
});

// Asegurarse de que el rating sea un número válido
const validateRating = (rating) => {
  const numRating = Number(rating);
  return isNaN(numRating) ? 0 : Math.min(Math.max(numRating, 0), 5);
}

// Método para agregar el producto a la cotización
const addToQuote = () => {
  emit('add-to-quote', props.product);
}

// Método para navegar al detalle del producto
const navigateToDetail = () => {
  router.push(props.product.link);
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  height: 100%;
  background-color: white !important;
  color: rgba(0, 0, 0, 0.87);
  cursor: default;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.product-image {
  transition: transform 0.5s ease;
  cursor: pointer;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}

.badge-discount, .badge-new, .badge-hot, .badge-featured {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}

.badge-featured {
  background-color: #1867C0;
}

.badge-new {
  background-color: #FF9800;
}

.badge-hot {
  background-color: #F44336;
}

.product-title {
  height: 48px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.cotizar-text {
  color: #1867C0;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.position-relative {
  position: relative;
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

.review-count {
  color: rgba(0, 0, 0, 0.6);
}

/* Estilos para vista de lista */
.product-card-list {
  height: auto;
}

.product-image-container-list {
  position: relative;
  width: 180px;
  min-width: 180px;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}

@media (max-width: 600px) {
  .product-image-container-list {
    width: 120px;
    min-width: 120px;
  }
}
</style>