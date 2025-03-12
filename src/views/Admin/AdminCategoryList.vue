<template>
  <div class="admin-category-list">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <h1 class="text-h4 font-weight-bold">Gestión de Categorías</h1>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="fa-solid fa-plus"
            @click="openCategoryDialog()"
          >
            Nueva Categoría
          </v-btn>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" rounded="lg">
            <v-card-text class="pa-4">
              <!-- Filtros y búsqueda -->
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="searchQuery"
                    label="Buscar categorías"
                    prepend-inner-icon="fa-solid fa-search"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="4">
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
              
              <!-- Tabla de categorías -->
              <v-data-table
                :headers="headers"
                :items="categories"
                :loading="loading"
                :items-per-page="10"
                :items-per-page-options="[10, 20, 50]"
                class="mt-4"
              >
                <!-- Columna de imagen -->
                <template v-slot:item.image="{ item }">
                  <v-avatar size="40">
                    <v-img :src="item.image || 'https://via.placeholder.com/40x40?text=No+Image'" cover></v-img>
                  </v-avatar>
                </template>
                
                <!-- Columna de productos -->
                <template v-slot:item.productCount="{ item }">
                  <v-chip
                    color="primary"
                    size="small"
                    class="text-caption"
                  >
                    {{ item.productCount || 0 }}
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
                      @click="openCategoryDialog(item)"
                    >
                      <v-icon icon="fa-solid fa-pen-to-square"></v-icon>
                    </v-btn>
                    
                    <v-btn
                      icon
                      variant="text"
                      density="compact"
                      color="error"
                      @click="confirmDeleteCategory(item)"
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
    
    <!-- Diálogo para crear/editar categoría -->
    <v-dialog v-model="categoryDialog" max-width="600">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          {{ isEditing ? 'Editar Categoría' : 'Nueva Categoría' }}
        </v-card-title>
        
        <v-divider></v-divider>
        
        <v-card-text class="pa-4">
          <v-form ref="form" @submit.prevent="saveCategory">
            <v-text-field
              v-model="editedCategory.name"
              label="Nombre de la categoría"
              variant="outlined"
              :rules="[v => !!v || 'El nombre es obligatorio']"
              required
              class="mb-4"
            ></v-text-field>
            
            <v-textarea
              v-model="editedCategory.description"
              label="Descripción"
              variant="outlined"
              rows="3"
              class="mb-4"
            ></v-textarea>
            
            <v-select
              v-model="editedCategory.parentId"
              label="Categoría padre (opcional)"
              :items="parentCategories"
              item-title="name"
              item-value="id"
              variant="outlined"
              clearable
              class="mb-4"
            ></v-select>
            
            <div class="d-flex flex-column align-center mb-4">
              <v-img
                :src="editedCategory.image || 'https://via.placeholder.com/200x200?text=Sin+imagen'"
                width="150"
                height="150"
                cover
                class="mb-4 rounded"
              ></v-img>
              
              <v-file-input
                v-model="categoryImageFile"
                label="Imagen de categoría"
                variant="outlined"
                accept="image/*"
                prepend-icon="fa-solid fa-upload"
                density="compact"
                hide-details
                @change="handleCategoryImageUpload"
              ></v-file-input>
            </div>
            
            <v-text-field
              v-model="editedCategory.slug"
              label="URL amigable"
              variant="outlined"
              hint="Dejar en blanco para generar automáticamente"
              class="mb-4"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="categoryDialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="saveCategory">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Diálogo de confirmación para eliminar categoría -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          Confirmar eliminación
        </v-card-title>
        
        <v-card-text class="pa-4">
          ¿Estás seguro de que deseas eliminar la categoría "{{ categoryToDelete?.name }}"? 
          <strong class="error--text">Esta acción eliminará también todos los productos asociados a esta categoría.</strong>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="text" @click="deleteCategory">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { productService } from '@/services/productService';

// Estado para categorías y filtros
const categories = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const sortBy = ref('name_asc');

// Estado para diálogos
const categoryDialog = ref(false);
const deleteDialog = ref(false);
const categoryToDelete = ref(null);
const editedCategory = ref({
  name: '',
  description: '',
  parentId: null,
  image: '',
  slug: ''
});
const categoryImageFile = ref(null);
const isEditing = ref(false);

// Opciones de ordenamiento
const sortOptions = [
  { title: 'Nombre (A-Z)', value: 'name_asc' },
  { title: 'Nombre (Z-A)', value: 'name_desc' },
  { title: 'Productos (mayor a menor)', value: 'products_desc' },
  { title: 'Productos (menor a mayor)', value: 'products_asc' },
  { title: 'Más recientes', value: 'date_desc' },
  { title: 'Más antiguos', value: 'date_asc' }
];

// Encabezados de la tabla
const headers = [
  { title: 'Imagen', key: 'image', sortable: false },
  { title: 'Nombre', key: 'name', sortable: true },
  { title: 'Descripción', key: 'description', sortable: false },
  { title: 'Categoría padre', key: 'parentName', sortable: true },
  { title: 'Productos', key: 'productCount', sortable: true },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'end' }
];

// Categorías para el selector de categoría padre
const parentCategories = computed(() => {
  // Filtrar la categoría actual si estamos editando
  return categories.value.filter(cat => 
    !isEditing.value || cat.id !== editedCategory.value.id
  );
});

// Cargar categorías
const loadCategories = async () => {
  loading.value = true;
  try {
    // Construir parámetros de filtro
    const params = {};
    
    if (searchQuery.value) {
      params.search = searchQuery.value;
    }
    
    // Manejar ordenamiento
    if (sortBy.value) {
      const [field, direction] = sortBy.value.split('_');
      params.sort = `${field}:${direction}`;
    }
    
    const data = await productService.getCategories(params);
    categories.value = data.map(category => ({
      ...category,
      parentName: category.parent ? category.parent.name : '-'
    }));
  } catch (error) {
    console.error('Error loading categories:', error);
    // Mostrar notificación de error
  } finally {
    loading.value = false;
  }
};

// Aplicar filtros
const applyFilters = () => {
  loadCategories();
};

// Resetear filtros
const resetFilters = () => {
  searchQuery.value = '';
  sortBy.value = 'name_asc';
  loadCategories();
};

// Abrir diálogo para crear/editar categoría
const openCategoryDialog = (category = null) => {
  if (category) {
    // Editar categoría existente
    editedCategory.value = { ...category };
    isEditing.value = true;
  } else {
    // Nueva categoría
    editedCategory.value = {
      name: '',
      description: '',
      parentId: null,
      image: '',
      slug: ''
    };
    isEditing.value = false;
  }
  
  categoryImageFile.value = null;
  categoryDialog.value = true;
};

// Manejar carga de imagen de categoría
const handleCategoryImageUpload = async () => {
  if (!categoryImageFile.value) return;
  
  try {
    // En un caso real, aquí subiríamos la imagen a un servidor
    // Por ahora, simulamos con URL.createObjectURL
    editedCategory.value.image = URL.createObjectURL(categoryImageFile.value);
    
    // Implementación real:
    // const formData = new FormData();
    // formData.append('image', categoryImageFile.value);
    // const response = await fetch(`${API_BASE_URL}/upload`, {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    // editedCategory.value.image = data.imageUrl;
  } catch (error) {
    console.error('Error uploading category image:', error);
    // Mostrar notificación de error
  }
};

// Guardar categoría
const saveCategory = async () => {
  try {
    if (isEditing.value) {
      await productService.updateCategory(editedCategory.value.id, editedCategory.value);
      // Actualizar la categoría en la lista
      const index = categories.value.findIndex(c => c.id === editedCategory.value.id);
      if (index !== -1) {
        categories.value[index] = {
          ...editedCategory.value,
          parentName: editedCategory.value.parentId 
            ? categories.value.find(c => c.id === editedCategory.value.parentId)?.name 
            : '-'
        };
      }
    } else {
      const newCategory = await productService.createCategory(editedCategory.value);
      // Agregar la nueva categoría a la lista
      categories.value.push({
        ...newCategory,
        parentName: newCategory.parentId 
          ? categories.value.find(c => c.id === newCategory.parentId)?.name 
          : '-'
      });
    }
    
    // Cerrar diálogo
    categoryDialog.value = false;
    
    // Mostrar notificación de éxito
  } catch (error) {
    console.error('Error saving category:', error);
    // Mostrar notificación de error
  }
};

// Confirmar eliminación de categoría
const confirmDeleteCategory = (category) => {
  categoryToDelete.value = category;
  deleteDialog.value = true;
};

// Eliminar categoría
const deleteCategory = async () => {
  try {
    if (!categoryToDelete.value) return;
    
    await productService.deleteCategory(categoryToDelete.value.id);
    
    // Actualizar la lista de categorías
    categories.value = categories.value.filter(
      category => category.id !== categoryToDelete.value.id
    );
    
    // Cerrar diálogo
    deleteDialog.value = false;
    categoryToDelete.value = null;
    
    // Mostrar notificación de éxito
  } catch (error) {
    console.error('Error deleting category:', error);
    // Mostrar notificación de error
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  loadCategories();
});
</script>

<style scoped>
.admin-category-list {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;
}

.v-data-table {
  background-color: white;
}

.error--text {
  color: #ff5252;
}
</style>