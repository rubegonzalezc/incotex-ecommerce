<template>
  <v-container class="my-8 featured-products-container">
    <div class="text-center mb-6">
      <h2 class="text-h4 font-weight-bold mb-2 section-title">Productos Destacados</h2>
      <p class="text-subtitle-1 section-subtitle">Los productos más vendidos de la semana</p>
    </div>

    <v-row>
      <v-col 
        v-for="(product, index) in products" 
        :key="index"
        cols="12" 
        sm="6"
        md="3"
        class="px-2 mb-4"
      >
        <v-card
          :to="product.link"
          class="product-card h-100"
          elevation="2"
          rounded="lg"
        >
          <div class="position-relative">
            <v-img
              :src="product.image"
              height="220"
              cover
              class="product-image"
            >
              <div class="product-badge" v-if="product.badge">
                <span :class="`badge-${product.badgeType}`">{{ product.badge }}</span>
              </div>
            </v-img>
          </div>
          
          <v-card-text class="pa-4">
            <h3 class="text-subtitle-1 font-weight-bold mb-2 product-title text-dark">{{ product.name }}</h3>
            
            <div class="d-flex align-center mb-2">
              <div class="product-rating">
                <v-rating
                  :model-value="validateRating(product.rating)"
                  color="amber"
                  density="compact"
                  size="small"
                  readonly
                  half-increments
                  active-color="amber-darken-2"
                >
                  <template v-slot:item="props">
                    <v-icon
                      :icon="props.isFilled ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                      :color="props.isFilled ? 'amber-darken-2' : 'grey'"
                      size="small"
                    />
                  </template>
                </v-rating>
              </div>
              <span class="text-caption review-count ml-2">({{ product.reviewCount }})</span>
            </div>
            
            <div class="d-flex align-center">
              <div v-if="product.originalPrice" class="text-decoration-line-through text-caption text-medium-emphasis mr-2">
                ${{ formatPrice(product.originalPrice) }}
              </div>
              <div class="text-h6 font-weight-bold primary-text">${{ formatPrice(product.price) }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-4">
      <v-btn
        color="primary"
        variant="outlined"
        :to="'/productos'"
        class="px-6"
      >
        Explorar productos <v-icon icon="fa-solid fa-arrow-right" size="small" class="ml-2"></v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';

defineProps({
  products: {
    type: Array,
    required: true
  }
});

// Función para formatear el precio
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Asegurarse de que el rating sea un número válido
const validateRating = (rating) => {
  const numRating = Number(rating);
  return isNaN(numRating) ? 0 : Math.min(Math.max(numRating, 0), 5);
}
</script>

<style scoped>
.featured-products-container {
  max-width: 1400px !important;
  width: 90%;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  background-color: white;
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
  color: rgba(0, 0, 0, 0.8) !important;
}

.primary-text {
  color: #1867C0 !important;
}

.section-title {
  color: #1867C0;
}

.section-subtitle {
  color: rgba(0, 0, 0, 0.7);
}

.position-relative {
  position: relative;
}

@media (max-width: 599px) {
  .featured-products-container {
    width: 95%;
    padding-left: 8px;
    padding-right: 8px;
  }
}

.review-count {
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>