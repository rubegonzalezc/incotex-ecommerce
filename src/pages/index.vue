<template>
  <div>
    <HeroBanner
      :mainBanner="bannerData.mainBanner"
      :secondaryBanners="bannerData.secondaryBanners"
    />
    <FeatureCards :features="featureData"/>
    <PopularCategories :categories="categoriesData" />
    <FeaturedProducts :products="productsData" />
    <RecentProducts :products="recentProductsData" />
    <BrandCarousel :brands="brandsData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroBanner from '@/components/Inicio/HeroBanner.vue'
import FeatureCards from '@/components/Inicio/FeatureCards.vue'
import PopularCategories from '@/components/Inicio/PopularCategories.vue'
import FeaturedProducts from '@/components/Inicio/FeaturedProducts.vue'
import RecentProducts from '@/components/Inicio/RecentProducts.vue'
import BrandCarousel from '@/components/Inicio/BrandCarousel.vue'
import { bannerService } from '@/services/bannerService'
import { categoryService } from '@/services/categoryService'
import { productService } from '@/services/productService'
import { brandService } from '@/services/brandService'

const bannerData = ref({
  mainBanner: {},
  secondaryBanners: []
})

// Feature cards data
const featureData = ref([
  {
    icon: 'fa-solid fa-truck',
    title: 'Envío Gratis',
    description: 'En compras sobre $50.000'
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Compra Segura',
    description: 'Pago 100% seguro'
  },
  {
    icon: 'fa-solid fa-medal',
    title: 'Garantía',
    description: '30 días de garantía'
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Soporte 24/7',
    description: 'Atención personalizada'
  }
])

// Fetch banner data from API
const fetchBannerData = async () => {
  try {
    bannerData.value = await bannerService.getBanners()
  } catch (error) {
    bannerData.value = getDefaultBannerData()
  }
}

// Default banner data
const getDefaultBannerData = () => ({
  mainBanner: {
    title: "Herramientas de Calidad",
    subtitle: "Encuentra las mejores marcas para tus proyectos",
    buttonText: "Ver Productos",
    buttonLink: "/productos",
    image: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg"
  },
  secondaryBanners: [
    {
      title: "Ofertas Especiales",
      subtitle: "Hasta 40% de descuento",
      image: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"
    },
    {
      title: "Nuevos Productos",
      subtitle: "Descubre las últimas novedades",
      image: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"
    }
  ]
})

// Fetch feature cards data from API (optional)
const fetchFeatureData = async () => {
  try {
    // Uncomment and implement when you have an API endpoint for features
    // const response = await fetch('your-api-endpoint/features')
    // featureData.value = await response.json()
  } catch (error) {
    console.error('Error fetching feature data:', error)
    // Already using default data, no need to set it again
  }
}

// Popular categories data
const categoriesData = ref([])

// You could add a method to fetch categories from API
const fetchCategoriesData = async () => {
  try {
    categoriesData.value = await categoryService.getPopularCategories()
  } catch (error) {
    console.error('Error fetching categories data:', error)
    categoriesData.value = getDefaultCategoriesData()
  }
}

// Default categories data
const getDefaultCategoriesData = () => [
  {
    name: 'Herramientas',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    link: '/categorias/herramientas'
  },
  {
    name: 'Materiales de Construcción',
    image: 'https://images.pexels.com/photos/585418/pexels-photo-585418.jpeg',
    link: '/categorias/materiales-construccion'
  },
  {
    name: 'Electricidad',
    image: 'https://images.pexels.com/photos/257886/pexels-photo-257886.jpeg',
    link: '/categorias/electricidad'
  }
]

// Featured products data
const productsData = ref([])

// Fetch products data from API
const fetchProductsData = async () => {
  try {
    productsData.value = await productService.getFeaturedProducts()
  } catch (error) {
    console.error('Error fetching products data:', error)
    productsData.value = getDefaultProductsData()
  }
}

// Default products data
const getDefaultProductsData = () => [
  {
    id: 1,
    name: "Taladro Percutor Inalámbrico",
    price: 76490,
    originalPrice: 89990,
    image: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg",
    rating: 4.5,
    reviewCount: 45,
    badge: "-15%",
    badgeType: "discount",
    link: "/productos/taladro-percutor-inalambrico"
  },
  {
    id: 2,
    name: "Set de Llaves Combinadas 14 Piezas",
    price: 36790,
    originalPrice: 45900,
    image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
    rating: 5,
    reviewCount: 50,
    badge: "-20%",
    badgeType: "discount",
    link: "/productos/set-llaves-combinadas"
  },
  {
    id: 3,
    name: "Compresor de Aire 50L",
    price: 159990,
    originalPrice: null,
    image: "https://images.pexels.com/photos/257886/pexels-photo-257886.jpeg",
    rating: 4,
    reviewCount: 40,
    badge: "Nuevo",
    badgeType: "new",
    link: "/productos/compresor-aire-50l"
  },
  {
    id: 4,
    name: "Amoladora Angular 4 1/2\"",
    price: 39990,
    originalPrice: 49990,
    image: "https://images.pexels.com/photos/585418/pexels-photo-585418.jpeg",
    rating: 4.5,
    reviewCount: 45,
    badge: "Hot",
    badgeType: "hot",
    link: "/productos/amoladora-angular"
  }
]

// Recent products data
const recentProductsData = ref([])

// Fetch recent products data from API
const fetchRecentProductsData = async () => {
  try {
    recentProductsData.value = await productService.getRecentProducts()
  } catch (error) {
    console.error('Error fetching recent products data:', error)
    recentProductsData.value = getDefaultRecentProductsData()
  }
}

// Default recent products data
const getDefaultRecentProductsData = () => [
  {
    id: 1,
    name: "Sierra Circular Inalámbrica",
    price: 129990,
    originalPrice: null,
    image: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg",
    rating: 5,
    reviewCount: 50,
    badge: "Nuevo",
    badgeType: "new",
    link: "/productos/sierra-circular-inalambrica"
  },
  {
    id: 2,
    name: "Sierra Circular Inalámbrica",
    price: 129990,
    originalPrice: null,
    image: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg",
    rating: 5,
    reviewCount: 50,
    badge: "Nuevo",
    badgeType: "new",
    link: "/productos/sierra-circular-inalambrica"
  },
  {
    id: 3,
    name: "Sierra Circular Inalámbrica",
    price: 129990,
    originalPrice: null,
    image: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg",
    rating: 5,
    reviewCount: 50,
    badge: "Nuevo",
    badgeType: "new",
    link: "/productos/sierra-circular-inalambrica"
  },
  {
    id: 4,
    name: "Sierra Circular Inalámbrica",
    price: 129990,
    originalPrice: null,
    image: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg",
    rating: 5,
    reviewCount: 50,
    badge: "Nuevo",
    badgeType: "new",
    link: "/productos/sierra-circular-inalambrica"
  }
]

// Brands data
const brandsData = ref([])

// Fetch brands data from API
const fetchBrandsData = async () => {
  try {
    brandsData.value = await brandService.getBrands()
  } catch (error) {
    console.error('Error fetching brands data:', error)
    brandsData.value = getDefaultBrandsData()
  }
}

// Default brands data
const getDefaultBrandsData = () => [
  {
    id: 1,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
  },
  {
    id: 2,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
  },
  {
    id: 3,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
  },
  {
    id: 4,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
  },
  {
    id: 5,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
  }
]

onMounted(() => {
  fetchBannerData()
  fetchCategoriesData()
  fetchProductsData()
  fetchRecentProductsData()
  fetchBrandsData()
  // Uncomment when you have API ready
  // fetchFeatureData()
})
</script>
