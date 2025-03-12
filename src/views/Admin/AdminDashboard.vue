<template>
  <div class="admin-dashboard">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 font-weight-bold mb-4">Panel de Administración</h1>
        </v-col>
      </v-row>
      
      <v-row>
        <!-- Tarjetas de estadísticas -->
        <v-col cols="12" sm="6" md="3">
          <v-card class="mb-4" elevation="2" rounded="lg" color="primary">
            <v-card-text class="d-flex flex-column align-center pa-4 text-white">
              <v-icon icon="fa-solid fa-box" size="x-large" class="mb-2"></v-icon>
              <span class="text-h4 font-weight-bold">{{ stats.totalProducts }}</span>
              <span class="text-subtitle-1">Productos</span>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-card class="mb-4" elevation="2" rounded="lg" color="success">
            <v-card-text class="d-flex flex-column align-center pa-4 text-white">
              <v-icon icon="fa-solid fa-tags" size="x-large" class="mb-2"></v-icon>
              <span class="text-h4 font-weight-bold">{{ stats.totalCategories }}</span>
              <span class="text-subtitle-1">Categorías</span>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-card class="mb-4" elevation="2" rounded="lg" color="info">
            <v-card-text class="d-flex flex-column align-center pa-4 text-white">
              <v-icon icon="fa-solid fa-users" size="x-large" class="mb-2"></v-icon>
              <span class="text-h4 font-weight-bold">{{ stats.totalUsers }}</span>
              <span class="text-subtitle-1">Usuarios</span>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-card class="mb-4" elevation="2" rounded="lg" color="warning">
            <v-card-text class="d-flex flex-column align-center pa-4 text-white">
              <v-icon icon="fa-solid fa-comment" size="x-large" class="mb-2"></v-icon>
              <span class="text-h4 font-weight-bold">{{ stats.totalReviews }}</span>
              <span class="text-subtitle-1">Reseñas</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row>
        <!-- Productos recientes -->
        <v-col cols="12" md="6">
          <v-card class="mb-4" elevation="2" rounded="lg">
            <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
              Productos Recientes
              <v-btn
                variant="text"
                density="compact"
                class="ml-auto"
                color="primary"
                :to="'/admin/productos'"
              >
                Ver todos
              </v-btn>
            </v-card-title>
            
            <v-divider></v-divider>
            
            <v-list lines="two">
              <v-list-item
                v-for="product in recentProducts"
                :key="product.id"
                :title="product.name"
                :subtitle="`$${formatPrice(product.price)} - ${product.category}`"
              >
                <template v-slot:prepend>
                  <v-avatar size="40">
                    <v-img :src="product.image" cover></v-img>
                  </v-avatar>
                </template>
                
                <template v-slot:append>
                  <v-btn
                    icon
                    variant="text"
                    density="compact"
                    color="primary"
                    :to="`/admin/productos/editar/${product.id}`"
                  >
                    <v-icon icon="fa-solid fa-pen-to-square"></v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Reseñas recientes -->
        <v-col cols="12" md="6">
          <v-card class="mb-4" elevation="2" rounded="lg">
            <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
              Reseñas Recientes
              <v-btn
                variant="text"
                density="compact"
                class="ml-auto"
                color="primary"
                :to="'/admin/resenas'"
              >
                Ver todas
              </v-btn>
            </v-card-title>
            
            <v-divider></v-divider>
            
            <v-list lines="two">
              <v-list-item
                v-for="review in recentReviews"
                :key="review.id"
                :title="`${review.userName} - ${review.rating} ★`"
                :subtitle="review.comment"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1" size="40">
                    <v-icon icon="fa-solid fa-user" color="white"></v-icon>
                  </v-avatar>
                </template>
                
                <template v-slot:append>
                  <v-btn
                    icon
                    variant="text"
                    density="compact"
                    color="error"
                    @click="confirmDeleteReview(review.id)"
                  >
                    <v-icon icon="fa-solid fa-trash"></v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- Acciones rápidas -->
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" rounded="lg">
            <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
              Acciones Rápidas
            </v-card-title>
            
            <v-divider></v-divider>
            
            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-btn
                    block
                    color="primary"
                    variant="elevated"
                    class="mb-2"
                    :to="'/admin/productos/nuevo'"
                  >
                    <v-icon icon="fa-solid fa-plus" class="mr-2"></v-icon>
                    Nuevo Producto
                  </v-btn>
                </v-col>
                
                <v-col cols="12" sm="6" md="3">
                  <v-btn
                    block
                    color="success"
                    variant="elevated"
                    class="mb-2"
                    :to="'/admin/categorias/nueva'"
                  >
                    <v-icon icon="fa-solid fa-folder-plus" class="mr-2"></v-icon>
                    Nueva Categoría
                  </v-btn>
                </v-col>
                
                <v-col cols="12" sm="6" md="3">
                  <v-btn
                    block
                    color="info"
                    variant="elevated"
                    class="mb-2"
                    :to="'/admin/usuarios'"
                  >
                    <v-icon icon="fa-solid fa-user-gear" class="mr-2"></v-icon>
                    Gestionar Usuarios
                  </v-btn>
                </v-col>
                
                <v-col cols="12" sm="6" md="3">
                  <v-btn
                    block
                    color="warning"
                    variant="elevated"
                    class="mb-2"
                    :to="'/admin/configuracion'"
                  >
                    <v-icon icon="fa-solid fa-gear" class="mr-2"></v-icon>
                    Configuración
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Diálogo de confirmación para eliminar reseña -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          Confirmar eliminación
        </v-card-title>
        
        <v-card-text class="pa-4">
          ¿Estás seguro de que deseas eliminar esta reseña? Esta acción no se puede deshacer.
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="text" @click="deleteReview">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { productService } from '@/services/productService';
import { userService } from '@/services/userService';

// Estado para estadísticas
const stats = ref({
  totalProducts: 0,
  totalCategories: 0,
  totalUsers: 0,
  totalReviews: 0
});

// Estado para productos y reseñas recientes
const recentProducts = ref([]);
const recentReviews = ref([]);

// Estado para diálogo de eliminación
const deleteDialog = ref(false);
const reviewToDelete = ref(null);

// Formatear precio
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Cargar datos del dashboard
const loadDashboardData = async () => {
  try {
    // Verificar si el usuario está autenticado como admin
    if (!userService.isAdminLoggedIn()) {
      // Redirigir a la página de login de admin
      router.push('/admin/login');
      return;
    }
    
    // Cargar estadísticas
    const statsData = await fetchStats();
    stats.value = statsData;
    
    // Cargar productos recientes
    const productsData = await productService.getProducts({ limit: 5, sort: 'createdAt:desc' });
    recentProducts.value = productsData.items || [];
    
    // Cargar reseñas recientes
    const reviewsData = await productService.getReviews();
    recentReviews.value = reviewsData.slice(0, 5);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    // Mostrar notificación de error
  }
};

// Obtener estadísticas
const fetchStats = async () => {
  try {
    // En un caso real, esto sería una llamada a la API
    // Por ahora, simulamos datos
    return {
      totalProducts: 120,
      totalCategories: 15,
      totalUsers: 350,
      totalReviews: 78
    };
    
    // Implementación real:
    // const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
    //   }
    // });
    // return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalUsers: 0,
      totalReviews: 0
    };
  }
};

// Confirmar eliminación de reseña
const confirmDeleteReview = (reviewId) => {
  reviewToDelete.value = reviewId;
  deleteDialog.value = true;
};

// Eliminar reseña
const deleteReview = async () => {
  try {
    if (!reviewToDelete.value) return;
    
    await productService.deleteReview(reviewToDelete.value);
    
    // Actualizar la lista de reseñas
    recentReviews.value = recentReviews.value.filter(
      review => review.id !== reviewToDelete.value
    );
    
    // Actualizar contador de reseñas
    stats.value.totalReviews--;
    
    // Cerrar diálogo
    deleteDialog.value = false;
    reviewToDelete.value = null;
    
    // Mostrar notificación de éxito
  } catch (error) {
    console.error('Error deleting review:', error);
    // Mostrar notificación de error
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  loadDashboardData();
});
</script>

<style scoped>
.admin-dashboard {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;
}

.v-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.v-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.v-list-item {
  transition: background-color 0.2s ease;
}

.v-list-item:hover {
  background-color: #f5f5f5;
}
</style>