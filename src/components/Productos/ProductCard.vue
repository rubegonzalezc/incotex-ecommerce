<template>
  <v-card
    :to="product.link"
    :class="['product-card', viewMode === 'list' ? 'product-card-list' : '']"
    elevation="2"
    rounded="lg"
    class="bg-white"
  >
    <div :class="['d-flex', viewMode === 'list' ? 'flex-row' : 'flex-column']">
      <!-- Imagen del producto -->
      <div :class="[viewMode === 'list' ? 'product-image-container-list' : 'position-relative']">
        <v-img
          :src="product.image"
          :height="viewMode === 'list' ? '180' : '220'"
          cover
          class="product-image"
        >
          <div class="product-badge" v-if="product.badge">
            <span :class="`badge-${product.badgeType}`">{{ product.badge }}</span>
          </div>
        </v-img>
      </div>
      
      <!-- Información del producto -->
      <v-card-text :class="['pa-4', viewMode === 'list' ? 'flex-grow-1' : '']">
        <div v-if="viewMode === 'list'" class="d-flex flex-column h-100">
          <div>
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
            <div class="d-flex align-center mb-2">
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
            
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <div v-if="product.originalPrice" class="text-decoration-line-through text-caption text-medium-emphasis mr-2">
                  ${{ formatPrice(product.originalPrice) }}
                </div>
                <div class="text-h6 font-weight-bold primary-text">${{ formatPrice(product.price) }}</div>
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
          </div>
        </div>
        
        <div v-else>
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
          
          <div class="d-flex align-center">
            <div v-if="product.originalPrice" class="text-decoration-line-through text-caption text-medium-emphasis mr-2">
              ${{ formatPrice(product.originalPrice) }}
            </div>
            <div class="text-h6 font-weight-bold primary-text">${{ formatPrice(product.price) }}</div>
          </div>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid'
  }
});

// Función para formatear el precio
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Asegurarse de que el rating sea un número válido
const validateRating = (rating) => {
  const numRating = Number(rating);
  return isNaN(numRating) ? 0 : Math.min(Math.max(numRating, 0), 5);
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  height: 100%;
  background-color: white !important;
  color: rgba(0, 0, 0, 0.87);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.product-image {
  transition: transform 0.5s ease;
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

.product-title {
  height: 48px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.primary-text {
  color: #1867C0 !important;
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
}

@media (max-width: 600px) {
  .product-image-container-list {
    width: 120px;
    min-width: 120px;
  }
}
</style>