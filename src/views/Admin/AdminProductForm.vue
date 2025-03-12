<template>
  <div class="admin-product-form">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <h1 class="text-h4 font-weight-bold">{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h1>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="outlined"
            prepend-icon="fa-solid fa-arrow-left"
            :to="'/admin/productos'"
          >
            Volver a la lista
          </v-btn>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" rounded="lg">
            <v-card-text class="pa-4">
              <v-form ref="form" @submit.prevent="saveProduct">
                <v-row>
                  <!-- Información básica -->
                  <v-col cols="12" md="8">
                    <h2 class="text-h6 font-weight-bold mb-4">Información básica</h2>
                    
                    <v-text-field
                      v-model="product.name"
                      label="Nombre del producto"
                      variant="outlined"
                      :rules="[v => !!v || 'El nombre es obligatorio']"
                      required
                      class="mb-4"
                    ></v-text-field>
                    
                    <v-textarea
                      v-model="product.description"
                      label="Descripción"
                      variant="outlined"
                      :rules="[v => !!v || 'La descripción es obligatoria']"
                      required
                      rows="4"
                      class="mb-4"
                    ></v-textarea>
                    
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="product.price"
                          label="Precio"
                          variant="outlined"
                          type="number"
                          prefix="$"
                          :rules="[
                            v => !!v || 'El precio es obligatorio',
                            v => v > 0 || 'El precio debe ser mayor que 0'
                          ]"
                          required
                          class="mb-4"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="product.originalPrice"
                          label="Precio original (opcional)"
                          variant="outlined"
                          type="number"
                          prefix="$"
                          hint="Dejar en blanco si no hay descuento"
                          class="mb-4"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="product.categoryId"
                          label="Categoría"
                          :items="categories"
                          item-title="name"
                          item-value="id"
                          variant="outlined"
                          :rules="[v => !!v || 'La categoría es obligatoria']"
                          required
                          class="mb-4"
                        ></v-select>
                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="product.brandId"
                          label="Marca"
                          :items="brands"
                          item-title="name"
                          item-value="id"
                          variant="outlined"
                          :rules="[v => !!v || 'La marca es obligatoria']"
                          required
                          class="mb-4"
                        ></v-select>
                      </v-col>
                    </v-row>
                    
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="product.sku"
                          label="SKU"
                          variant="outlined"
                          :rules="[v => !!v || 'El SKU es obligatorio']"
                          required
                          class="mb-4"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <v-switch
                          v-model="product.inStock"
                          label="Disponible en stock"
                          color="success"
                          hide-details
                          class="mb-4"
                        ></v-switch>
                      </v-col>
                    </v-row>
                    
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="product.badge"
                          label="Etiqueta (opcional)"
                          :items="['Oferta', 'Nuevo', 'Popular', '']"
                          variant="outlined"
                          clearable
                          class="mb-4"
                        ></v-select>
                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="product.badgeType"
                          label="Tipo de etiqueta"
                          :items="[
                            { title: 'Descuento', value: 'discount' },
                            { title: 'Nuevo', value: 'new' },
                            { title: 'Popular', value: 'hot' }
                          ]"
                          item-title="title"
                          item-value="value"
                          variant="outlined"
                          :disabled="!product.badge"
                          class="mb-4"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  
                  <!-- Imágenes -->
                  <v-col cols="12" md="4">
                    <h2 class="text-h6 font-weight-bold mb-4">Imágenes</h2>
                    
                    <v-card class="mb-4 pa-4" variant="outlined">
                      <h3 class="text-subtitle-1 font-weight-bold mb-2">Imagen principal</h3>
                      
                      <div class="d-flex flex-column align-center">
                        <v-img
                          :src="product.image || 'https://via.placeholder.com/500x500?text=Sin+imagen'"
                          width="200"
                          height="200"
                          cover
                          class="mb-4 rounded"
                        ></v-img>
                        
                        <v-file-input
                          v-model="mainImageFile"
                          label="Seleccionar imagen"
                          variant="outlined"
                          accept="image/*"
                          prepend-icon="fa-solid fa-upload"
                          density="compact"
                          hide-details
                          @change="handleMainImageUpload"
                        ></v-file-input>
                      </div>
                    </v-card>
                    
                    <v-card class="mb-4 pa-4" variant="outlined">
                      <h3 class="text-subtitle-1 font-weight-bold mb-2">Imágenes adicionales</h3>
                      
                      <div class="d-flex flex-wrap justify-center mb-4">
                        <div
                          v-for="(image, index) in product.images"
                          :key="index"
                          class="ma-2 position-relative"
                        >
                          <v-img
                            :src="image"
                            width="100"
                            height="100"
                            cover
                            class="rounded"
                          ></v-img>
                          
                          <v-btn
                            icon
                            size="x-small"
                            color="error"
                            variant="flat"
                            class="position-absolute top-0 right-0"
                            @click="removeImage(index)"
                          >
                            <v-icon icon="fa-solid fa-times"></v-icon>
                          </v-btn>
                        </div>
                      </div>
                      
                      <v-file-input
                        v-model="additionalImageFiles"
                        label="Agregar imágenes"
                        variant="outlined"
                        accept="image/*"
                        prepend-icon="fa-solid fa-upload"
                        density="compact"
                        hide-details
                        multiple
                        @change="handleAdditionalImagesUpload"
                      ></v-file-input>
                    </v-card>
                  </v-col>
                </v-row>
                
                <v-divider class="my-6"></v-divider>
                
                <!-- Especificaciones -->
                <v-row>
                  <v-col cols="12">
                    <h2 class="text-h6 font-weight-bold mb-4">Especificaciones</h2>
                    
                    <div
                      v-for="(spec, index) in product.specifications"
                      :key="index"
                      class="mb-4"
                    >
                      <div class="d-flex">
                        <v-text-field
                          v-model="spec.name"
                          label="Nombre"
                          variant="outlined"
                          density="compact"
                          class="mr-2"
                        ></v-text-field>
                        
                        <v-text-field
                          v-model="spec.value"
                          label="Valor"
                          variant="outlined"
                          density="compact"
                          class="mr-2"
                        ></v-text-field>
                        
                        <v-btn
                          icon
                          color="error"
                          variant="text"
                          @click="removeSpecification(index)"
                        >
                          <v-icon icon="fa-solid fa-trash"></v-icon>
                        </v-btn>
                      </div>
                    </div>
                    
                    <v-btn
                      color="primary"
                      variant="text"
                      prepend-icon="fa-solid fa-plus"
                      @click="addSpecification"
                      class="mb-4"
                    >
                      Agregar especificación
                    </v-btn>
                  </v-col>
                </v-row>
                
                <v-divider class="my-6"></v-divider>
                
                <!-- SEO -->
                <v-row>
                  <v-col cols="12">
                    <h2 class="text-h6 font-weight-bold mb-4">SEO</h2>
                    
                    <v-text-field
                      v-model="product.metaTitle"
                      label="Título meta (SEO)"
                      variant="outlined"
                      hint="Título para motores de búsqueda"
                      class="mb-4"
                    ></v-text-field>
                    
                    <v-textarea
                      v-model="product.metaDescription"
                      label="Descripción meta (SEO)"
                      variant="outlined"
                      hint="Descripción para motores de búsqueda"
                      rows="3"
                      class="mb-4"
                    ></v-textarea>
                    
                    <v-text-field
                      v-model="product.slug"
                      label="URL amigable"
                      variant="outlined"
                      hint="Dejar en blanco para generar automáticamente"
                      class="mb-4"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-divider class="my-6"></v-divider>
                
                <!-- Botones de acción -->
                <v-row>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn
                      color="grey-darken-1"
                      variant="outlined"
                      class="mr-4"
                      :to="'/admin/productos'"
                    >
                      Cancelar
                    </v-btn>
                    
                    <v-btn
                      color="primary"
                      type="submit"
                      :loading="saving"
                    >
                      {{ isEditing ? 'Actualizar producto' : 'Crear producto' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '@/services/productService';

const route = useRoute();
const router = useRouter();
const form = ref(null);

// Estado para determinar si estamos editando o creando
const productId = computed(() => route.params.id);
const isEditing = computed(() => !!productId.value);

// Estado para el producto
const product = ref({
  name: '',
  description: '',
  price: 0,
  originalPrice: null,
  categoryId: '',
  brandId: '',
  sku: '',
  inStock: true,
  badge: '',
  badgeType: 'discount',
  image: '',
  images: [],
  specifications: [],
  metaTitle: '',
  metaDescription: '',
  slug: ''
});

// Estado para categorías y marcas
const categories = ref([]);
const brands = ref([]);

// Estado para carga y guardado
const loading = ref(false);
const saving = ref(false);

// Estado para imágenes
const mainImageFile = ref(null);
const additionalImageFiles = ref([]);

// Cargar categorías
const loadCategories = async () => {
  try {
    const data = await productService.getCategories();
    categories.value = data;
  } catch (error) {
    console.error('Error loading categories:', error);
    // Mostrar notificación de error
  }
};

// Cargar marcas
const loadBrands = async () => {
  try {
    const data = await productService.getBrands();
    brands.value = data;
  } catch (error) {
    console.error('Error loading brands:', error);
    // Mostrar notificación de error
  }
};

// Cargar producto para edición
const loadProduct = async () => {
  if (!isEditing.value) return;
  
  loading.value = true;
  try {
    const data = await productService.getProductById(productId.value);
    product.value = {
      ...data,
      categoryId: data.category?.id || '',
      brandId: data.brand?.id || '',
      specifications: data.specifications || []
    };
  } catch (error) {
    console.error('Error loading product:', error);
    // Mostrar notificación de error
    router.push('/admin/productos');
  } finally {
    loading.value = false;
  }
};

// Manejar carga de imagen principal
const handleMainImageUpload = async () => {
  if (!mainImageFile.value) return;
  
  try {
    // En un caso real, aquí subiríamos la imagen a un servidor
    // Por ahora, simulamos con URL.createObjectURL
    product.value.image = URL.createObjectURL(mainImageFile.value);
    
    // Implementación real:
    // const formData = new FormData();
    // formData.append('image', mainImageFile.value);
    // const response = await fetch(`${API_BASE_URL}/upload`, {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    // product.value.image = data.imageUrl;
  } catch (error) {
    console.error('Error uploading main image:', error);
    // Mostrar notificación de error
  }
};

// Manejar carga de imágenes adicionales
const handleAdditionalImagesUpload = async () => {
  if (!additionalImageFiles.value.length) return;
  
  try {
    // En un caso real, aquí subiríamos las imágenes a un servidor
    // Por ahora, simulamos con URL.createObjectURL
    for (const file of additionalImageFiles.value) {
      product.value.images.push(URL.createObjectURL(file));
    }
    
    // Implementación real:
    // const formData = new FormData();
    // for (const file of additionalImageFiles.value) {
    //   formData.append('images', file);
    // }
    // const response = await fetch(`${API_BASE_URL}/upload-multiple`, {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    // product.value.images = [...product.value.images, ...data.imageUrls];
  } catch (error) {
    console.error('Error uploading additional images:', error);
    // Mostrar notificación de error
  }
};

// Eliminar imagen adicional
const removeImage = (index) => {
  product.value.images.splice(index, 1);
};

// Agregar especificación
const addSpecification = () => {
  product.value.specifications.push({ name: '', value: '' });
};

// Eliminar especificación
const removeSpecification = (index) => {
  product.value.specifications.splice(index, 1);
};

// Guardar producto
const saveProduct = async () => {
  const { valid } = await form.value.validate();
  
  if (!valid) return;
  
  saving.value = true;
  try {
    // Filtrar especificaciones vacías
    product.value.specifications = product.value.specifications.filter(
      spec => spec.name.trim() && spec.value.trim()
    );
    
    if (isEditing.value) {
      await productService.updateProduct(productId.value, product.value);
      // Mostrar notificación de éxito
    } else {
      await productService.createProduct(product.value);
      // Mostrar notificación de éxito
    }
    
    router.push('/admin/productos');
  } catch (error) {
    console.error('Error saving product:', error);
    // Mostrar notificación de error
  } finally {
    saving.value = false;
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  loadCategories();
  loadBrands();
  loadProduct();
});
</script>

<style scoped>
.admin-product-form {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.right-0 {
  right: 0;
}
</style>