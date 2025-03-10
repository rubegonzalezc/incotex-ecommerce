<template>
  <v-container class="my-8 brands-container">
    <div class="text-center mb-6">
      <h2 class="text-h4 font-weight-bold mb-2 section-title">Nuestras Marcas</h2>
      <p class="text-subtitle-1 section-subtitle">Trabajamos con las mejores marcas del mercado</p>
    </div>

    <div class="marquee-container">
      <div class="marquee-content" :style="{ animationDuration: `${animationDuration}s` }">
        <div v-for="(brand, index) in duplicatedBrands" :key="`brand-${index}`" class="brand-item">
          <v-img
            :src="brand.logo"
            :alt="brand.name"
            max-height="60"
            contain
            class="mx-auto brand-logo"
          ></v-img>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  brands: {
    type: Array,
    required: true
  },
  speed: {
    type: Number,
    default: 30 // segundos para completar una vuelta
  }
});

// Duplicamos las marcas para crear un efecto de desplazamiento continuo
const duplicatedBrands = computed(() => {
  return [...props.brands, ...props.brands];
});

// Calculamos la duración de la animación basada en la cantidad de marcas
const animationDuration = computed(() => {
  return props.speed;
});
</script>

<style scoped>
.brands-container {
  max-width: 1400px !important;
  width: 90%;
  background-color: #ffffff;
  border-radius: 12px;
  padding-top: 2rem;
  padding-bottom: 2rem;
  overflow: hidden;
}

.section-title {
  color: #1867C0;
}

.section-subtitle {
  color: rgba(0, 0, 0, 0.7);
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: flex;
  animation: marquee linear infinite;
  width: fit-content;
}

.brand-item {
  flex: 0 0 auto;
  width: 180px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo {
  opacity: 0.7;
  transition: opacity 0.3s ease, transform 0.3s ease;
  filter: grayscale(100%);
}

.brand-logo:hover {
  opacity: 1;
  transform: scale(1.05);
  filter: grayscale(0%);
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 599px) {
  .brands-container {
    width: 95%;
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .brand-item {
    width: 120px;
    padding: 0 10px;
  }
}
</style>