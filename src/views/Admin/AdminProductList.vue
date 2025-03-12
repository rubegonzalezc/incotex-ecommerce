<template>
  <div class="admin-product-list">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <h1 class="text-h4 font-weight-bold">Gestión de Productos</h1>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="fa-solid fa-plus"
            :to="'/admin/productos/nuevo'"
          >
            Nuevo Producto
          </v-btn>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" rounded="lg">
            <v-card-text class="pa-4">
              <!-- Filtros y búsqueda -->
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="searchQuery"
                    label="Buscar productos"
                    prepend-inner-icon="fa-solid fa-search"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="categoryFilter"
                    label="Filtrar por categoría"
                    :items="categories"
                    item-title="name"
                    item-value="id"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="sortBy"
                    label="Ordenar por"
                    :items="sortOptions"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" sm="2">
                  <v-btn
                    color="grey-darken-1"
                    variant="outlined"
                    block
                    @click="resetFilters"
                  >
                    Limpiar filtros
                  </v-btn>
                </v-col>
              </v-row>
              
              <!-- Tabla de productos -->
              <v-data-table
                :headers="headers"
                :items="products"
                :loading="loading"
                :items-per-page="10"
                :items-per-page-options="[10, 20, 50]"
                class="mt-4"
              >
                <!-- Columna de imagen -->
                <template v-slot:item.image="{ item }">
                  <v-avatar size="40">
                    <v-img :src="item.image" cover></v-img>
                  </v-avatar>
                </template>
                
                <!-- Columna de precio -->
                <template v-slot:item.price="{ item }">
                  ${{ formatPrice(item.price) }}
                </template>
                
                <!-- Columna de stock -->
                <template v-slot:item.inStock="{ item }">
                  <v-chip
                    :color="item.inStock ? 'success' : 'error'"
                    size="small"
                    class="text-caption"
                  >
                    {{ item.inStock ? 'En stock' : 'Agotado' }}
                  </v-chip>
                </template>
                
                <!-- Columna de acciones -->
                <template v-slot:item.actions="{ item }">
                  <div class="d-flex">
                    <v-btn
                      icon
                      variant="text"
                      density="compact"
                      color="primary"
                      class="mr-2"
                      :to="`/admin/productos/editar/${item.id}`"
                    >
                      <v-icon icon="fa-solid fa-pen-to-square"></v-icon>
                    </v-btn>
                    
                    <v-btn
                      icon
                      variant="text"
                      density="compact"
                      color="error"
                      @click="confirmDeleteProduct(item)"
                    >
                      <v-icon icon="fa-solid fa-trash"></v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Diálogo de confirmación para eliminar producto -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          Confirmar eliminación
        </v-card-title>
        
        <v-card-text class="pa-4">
          ¿Estás seguro de que deseas eliminar el producto "{{ productToDelete?.name }}"? Esta acción no se puede deshacer.
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="text" @click="deleteProduct">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { productService } from '@/services/productService';

// Estado para productos y filtros
const products = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const categoryFilter = ref('');
const sortBy = ref('name_asc');

// Estado para diálogo de eliminación
const deleteDialog = ref(false);
const productToDelete = ref(null);

// Categorías disponibles
const categories = [
  { name: 'Todas las categorías', id: '' },
  { name: 'Herramientas Eléctricas', id: 1 },
  { name: 'Herramientas Manuales', id: 2 },
  { name: 'Equipos de Seguridad', id: 3 },
  { name: 'Materiales de Construcción', id: 4 }
];

// Opciones de ordenamiento
const sortOptions = [
  { title: 'Nombre (A-Z)', value: 'name_asc' },
  { title: 'Nombre (Z-A)', value: 'name_desc' },
  { title: 'Precio (menor a mayor)', value: 'price_asc' },
  { title: 'Precio (mayor a menor)', value: 'price_desc' },
  { title: 'Más recientes', value: 'date_desc' },
  { title: 'Más antiguos', value: 'date_asc' }
];

// Encabezados de la tabla
const headers = [
  { title: 'Imagen', key: 'image', sortable: false },
  { title: 'Nombre', key: 'name', sortable: true },
  { title: 'Categoría', key: 'category', sortable: true },
  { title: 'Precio', key: 'price', sortable: true },
  { title: 'Stock', key: 'inStock', sortable: true },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'end' }
];

// Cargar productos al montar el componente
onMounted(async () => {
  await fetchProducts();
});

// Métodos
async function fetchProducts() {
  loading.value = true;
  try {
    const response = await productService.getProducts({
      search: searchQuery.value,
      category: categoryFilter.value,
      sort: sortBy.value
    });
    products.value = response.products || [];
  } catch (error) {
    console.error('Error al cargar productos:', error);
    // Aquí podrías mostrar un mensaje de error
  } finally {
    loading.value = false;
  }
}

function applyFilters() {
  fetchProducts();
}

function resetFilters() {
  searchQuery.value = '';
  categoryFilter.value = '';
  sortBy.value = 'name_asc';
  fetchProducts();
}

function confirmDeleteProduct(product) {
  productToDelete.value = product;
  deleteDialog.value = true;
}

async function deleteProduct() {
  if (!productToDelete.value) return;
  
  loading.value = true;
  try {
    await productService.deleteProduct(productToDelete.value.id);
    // Eliminar el producto de la lista local
    products.value = products.value.filter(p => p.id !== productToDelete.value.id);
    deleteDialog.value = false;
    productToDelete.value = null;
    // Aquí podrías mostrar un mensaje de éxito
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    // Aquí podrías mostrar un mensaje de error
  } finally {
    loading.value = false;
  }
}

// Función para formatear precios
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>