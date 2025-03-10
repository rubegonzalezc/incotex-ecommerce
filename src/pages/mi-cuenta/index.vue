<template>
    <div class="account-page">
      <v-container class="py-8">
        <!-- Breadcrumbs -->
        <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4 text-dark">
          <template v-slot:divider>
            <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
          </template>
        </v-breadcrumbs>
  
        <h1 class="text-h4 font-weight-bold mb-6 text-dark">Mi cuenta</h1>
  
        <v-row>
          <!-- Menú lateral -->
          <v-col cols="12" md="3" class="pr-md-6">
            <v-card class="mb-4" elevation="1">
              <v-list bg-color="white">
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  :value="item.value"
                  :active="activeSection === item.value"
                  @click="activeSection = item.value"
                  class="text-dark"
                  active-color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
  
          <!-- Contenido principal -->
          <v-col cols="12" md="9">
            <v-card class="bg-white">
              <!-- Información personal -->
              <div v-if="activeSection === 'profile'" class="pa-6">
                <h2 class="text-h5 font-weight-bold mb-4 text-dark">Mi información personal</h2>
                
                <v-form @submit.prevent="updateProfile">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="profile.firstName"
                        label="Nombre"
                        variant="outlined"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="profile.lastName"
                        label="Apellido"
                        variant="outlined"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.email"
                        label="Correo electrónico"
                        variant="outlined"
                        type="email"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.phone"
                        label="Teléfono"
                        variant="outlined"
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.address"
                        label="Dirección"
                        variant="outlined"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="profile.apartment"
                        label="Número de departamento (opcional)"
                        variant="outlined"
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="profile.comuna"
                        label="Comuna"
                        variant="outlined"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="profile.region"
                        :items="regions"
                        label="Región"
                        variant="outlined"
                        required
                        class="text-dark"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="profile.zipCode"
                        label="Código postal"
                        variant="outlined"
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-btn color="primary" type="submit" class="mt-2">
                        Guardar cambios
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
  
              <!-- Cambiar contraseña -->
              <div v-else-if="activeSection === 'password'" class="pa-6">
                <h2 class="text-h5 font-weight-bold mb-4 text-dark">Cambiar contraseña</h2>
                
                <v-form @submit.prevent="updatePassword">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="passwordForm.current"
                        label="Contraseña actual"
                        variant="outlined"
                        type="password"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="passwordForm.new"
                        label="Nueva contraseña"
                        variant="outlined"
                        type="password"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="passwordForm.confirm"
                        label="Confirmar nueva contraseña"
                        variant="outlined"
                        type="password"
                        required
                        class="text-dark"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-btn color="primary" type="submit" class="mt-2">
                        Cambiar contraseña
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
  
              <!-- Pedidos -->
              <div v-else-if="activeSection === 'orders'" class="pa-6">
                <h2 class="text-h5 font-weight-bold mb-4 text-dark">Mis pedidos</h2>
  
                <div v-if="orders.length > 0">
                  <v-card v-for="(order, index) in orders" :key="index" variant="outlined" class="mb-4">
                    <v-card-title class="d-flex justify-space-between pa-4 bg-grey-lighten-4">
                      <div class="text-dark">
                        <span class="text-subtitle-1 font-weight-bold">Pedido #{{ order.number }}</span>
                        <span class="text-caption ml-2">{{ order.date }} {{ order.time }}</span>
                      </div>
                      <v-chip :color="getOrderStatusColor(order.status)">
                        {{ order.status }}
                      </v-chip>
                    </v-card-title>
                    <v-card-text class="pa-4">
                      <div class="d-flex flex-column flex-sm-row justify-space-between mb-4">
                        <div class="mb-3 mb-sm-0">
                          <div class="text-caption text-medium-emphasis mb-1">Productos</div>
                          <div class="text-body-2 text-dark">{{ order.items.length }} productos</div>
                        </div>
                        <div class="mb-3 mb-sm-0">
                          <div class="text-caption text-medium-emphasis mb-1">Total</div>
                          <div class="text-body-2 font-weight-bold text-dark">${{ formatPrice(order.total) }}</div>
                        </div>
                        <div>
                          <div class="text-caption text-medium-emphasis mb-1">Método de pago</div>
                          <div class="text-body-2 text-dark">{{ order.paymentMethod }}</div>
                        </div>
                      </div>
  
                      <v-divider class="mb-4"></v-divider>
  
                      <div class="d-flex flex-wrap">
                        <v-btn variant="outlined" class="mr-2 mb-2" @click="viewOrderDetails(order.id)">
                          Ver detalles
                        </v-btn>
                        <v-btn v-if="order.status === 'Entregado'" variant="outlined" color="primary" class="mb-2">
                          Comprar de nuevo
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
  
                <div v-else class="text-center py-8">
                  <v-icon icon="fa-solid fa-shopping-bag" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
                  <h3 class="text-h6 font-weight-medium mb-2 text-dark">No tienes pedidos</h3>
                  <p class="text-body-1 text-medium-emphasis mb-4">
                    Cuando realices una compra, podrás ver tus pedidos aquí
                  </p>
                  <v-btn color="primary" to="/productos">
                    Explorar productos
                  </v-btn>
                </div>
              </div>
              <!-- Cupones -->
              <div v-else-if="activeSection === 'coupons'" class="pa-6">
                <h2 class="text-h5 font-weight-bold mb-4 text-dark">Mis cupones</h2>
                
                <div v-if="coupons.length > 0">
                  <v-card v-for="(coupon, index) in coupons" :key="index" variant="outlined" class="mb-4">
                    <v-card-title class="d-flex justify-space-between pa-4 bg-grey-lighten-4">
                      <div class="text-dark">
                        <span class="text-subtitle-1 font-weight-bold">{{ coupon.code }}</span>
                      </div>
                      <v-chip :color="coupon.isUsed ? 'grey' : 'success'" :text="coupon.isUsed ? 'Usado' : 'Disponible'">
                        {{ coupon.isUsed ? 'Usado' : 'Disponible' }}
                      </v-chip>
                    </v-card-title>
                    <v-card-text class="pa-4">
                      <div class="d-flex flex-column flex-sm-row justify-space-between mb-4">
                        <div class="mb-3 mb-sm-0">
                          <div class="text-caption text-medium-emphasis mb-1">Descuento</div>
                          <div class="text-body-2 text-dark font-weight-bold">{{ coupon.discount }}</div>
                        </div>
                        <div class="mb-3 mb-sm-0">
                          <div class="text-caption text-medium-emphasis mb-1">Compra mínima</div>
                          <div class="text-body-2 text-dark">${{ formatPrice(coupon.minPurchase) }}</div>
                        </div>
                        <div>
                          <div class="text-caption text-medium-emphasis mb-1">Válido hasta</div>
                          <div class="text-body-2 text-dark">{{ coupon.validUntil }}</div>
                        </div>
                      </div>
                      
                      <div class="text-body-2 text-dark mb-4">
                        {{ coupon.description }}
                      </div>
                      
                      <v-divider class="mb-4"></v-divider>
                      
                      <div class="d-flex flex-wrap">
                        <v-btn 
                          variant="outlined" 
                          color="primary" 
                          class="mb-2"
                          :disabled="coupon.isUsed"
                          @click="copyCouponCode(coupon.code)"
                        >
                          Copiar código
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
                
                <div v-else class="text-center py-8">
                  <v-icon icon="fa-solid fa-ticket" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
                  <h3 class="text-h6 font-weight-medium mb-2 text-dark">No tienes cupones disponibles</h3>
                  <p class="text-body-1 text-medium-emphasis mb-4">
                    Suscríbete a nuestro boletín para recibir cupones exclusivos
                  </p>
                  <v-btn color="primary" to="/productos">
                    Explorar productos
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Dialog para ver detalles del pedido - Corregido para modo claro -->
      <v-dialog v-model="showOrderDetailsDialog" max-width="800px" content-class="bg-white">
        <v-card v-if="selectedOrder" class="bg-white" theme="light">
          <v-card-title class="text-h5 font-weight-bold pa-4 bg-grey-lighten-4 text-dark">
            Detalles del Pedido #{{ selectedOrder.number }}
          </v-card-title>
          <v-card-text class="pa-4">
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-2">
                <div class="text-body-1 text-dark">
                  <strong>Fecha:</strong> {{ selectedOrder.date }}
                </div>
                <div class="text-body-1 text-dark">
                  <strong>Hora:</strong> {{ selectedOrder.time }}
                </div>
              </div>
              <div class="d-flex justify-space-between mb-2">
                <div class="text-body-1 text-dark">
                  <strong>Estado:</strong> 
                  <v-chip :color="getOrderStatusColor(selectedOrder.status)" size="small" class="ml-2">
                    {{ selectedOrder.status }}
                  </v-chip>
                </div>
                <div class="text-body-1 text-dark">
                  <strong>Método de pago:</strong> {{ selectedOrder.paymentMethod }}
                </div>
              </div>
            </div>
  
            <v-divider class="mb-4"></v-divider>
  
            <h3 class="text-subtitle-1 font-weight-bold mb-3 text-dark">Productos</h3>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Producto</th>
                  <th class="text-center">Cantidad</th>
                  <th class="text-right">Precio</th>
                  <th class="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in selectedOrder.items" :key="i">
                  <td>
                    <div class="d-flex align-center">
                      <v-img :src="item.image" width="50" height="50" class="mr-3"></v-img>
                      <div class="text-dark">{{ item.name }}</div>
                    </div>
                  </td>
                  <td class="text-center text-dark">{{ item.quantity }}</td>
                  <td class="text-right text-dark">${{ formatPrice(item.price) }}</td>
                  <td class="text-right text-dark">${{ formatPrice(item.price * item.quantity) }}</td>
                </tr>
              </tbody>
            </v-table>
  
            <div class="d-flex flex-column align-end mt-4">
              <div class="d-flex justify-space-between mb-2" style="width: 250px">
                <div class="text-body-2 text-dark">Subtotal:</div>
                <div class="text-body-2 text-dark">${{ formatPrice(selectedOrder.subtotal) }}</div>
              </div>
              <div class="d-flex justify-space-between mb-2" style="width: 250px">
                <div class="text-body-2 text-dark">Envío:</div>
                <div class="text-body-2 text-dark">${{ formatPrice(selectedOrder.shipping) }}</div>
              </div>
              <div class="d-flex justify-space-between mb-2" style="width: 250px">
                <div class="text-body-2 text-dark">Impuestos:</div>
                <div class="text-body-2 text-dark">${{ formatPrice(selectedOrder.tax) }}</div>
              </div>
              <div class="d-flex justify-space-between font-weight-bold" style="width: 250px">
                <div class="text-body-1 text-dark">Total:</div>
                <div class="text-body-1 text-dark">${{ formatPrice(selectedOrder.total) }}</div>
              </div>
            </div>
  
            <v-divider class="my-4"></v-divider>
  
            <div class="d-flex flex-wrap">
              <div class="mr-8 mb-4">
                <h3 class="text-subtitle-1 font-weight-bold mb-2 text-dark">Dirección de envío</h3>
                <div class="text-body-2 text-dark">{{ selectedOrder.shippingAddress.name }}</div>
                <div class="text-body-2 text-dark">{{ selectedOrder.shippingAddress.street }}</div>
                <div class="text-body-2 text-dark" v-if="selectedOrder.shippingAddress.apartment">
                  Depto: {{ selectedOrder.shippingAddress.apartment }}
                </div>
                <div class="text-body-2 text-dark">
                  {{ selectedOrder.shippingAddress.comuna }}, {{ selectedOrder.shippingAddress.region }}
                </div>
                <div class="text-body-2 text-dark">{{ selectedOrder.shippingAddress.phone }}</div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="grey-darken-1" variant="text" @click="showOrderDetailsDialog = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado
const activeSection = ref('profile');
const profile = ref({
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan.perez@example.com',
  phone: '+56 9 1234 5678',
  address: 'Av. Providencia 1234',
  apartment: '42B',
  comuna: 'Providencia',
  region: 'Región Metropolitana',
  zipCode: '7500000'
});

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});

const orders = ref([
  {
    id: 1,
    number: '10001',
    date: '15/04/2024',
    time: '14:30',
    status: 'Entregado',
    items: [
      {
        id: 101,
        name: 'Taladro Percutor Inalámbrico DeWalt',
        price: 129990,
        quantity: 1,
        image: 'https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg'
      },
      {
        id: 102,
        name: 'Set de Brocas DeWalt',
        price: 24990,
        quantity: 2,
        image: 'https://m.media-amazon.com/images/I/71Qjg8M+zcL._AC_SL1500_.jpg'
      }
    ],
    subtotal: 179970,
    shipping: 5000,
    tax: 34294,
    total: 219264,
    paymentMethod: 'Tarjeta de crédito',
    shippingAddress: {
      name: 'Juan Pérez',
      street: 'Av. Providencia 1234',
      apartment: '42B',
      comuna: 'Providencia',
      region: 'Región Metropolitana',
      phone: '+56 9 1234 5678'
    }
  },
  {
    id: 2,
    number: '10002',
    date: '28/03/2024',
    time: '10:15',
    status: 'En camino',
    items: [
      {
        id: 201,
        name: 'Sierra Circular Bosch',
        price: 89990,
        quantity: 1,
        image: 'https://www.bosch-professional.com/cl/es/products/gks-65-0601668903-199875-199875-p/'
      }
    ],
    subtotal: 89990,
    shipping: 5000,
    tax: 17098,
    total: 112088,
    paymentMethod: 'Transferencia bancaria',
    shippingAddress: {
      name: 'Juan Pérez',
      street: 'Av. Providencia 1234',
      apartment: '42B',
      comuna: 'Providencia',
      region: 'Región Metropolitana',
      phone: '+56 9 1234 5678'
    }
  }
]);

const showOrderDetailsDialog = ref(false);
const selectedOrder = ref(null);

// Lista de regiones de Chile
const regions = [
  'Región de Arica y Parinacota',
  'Región de Tarapacá',
  'Región de Antofagasta',
  'Región de Atacama',
  'Región de Coquimbo',
  'Región de Valparaíso',
  'Región Metropolitana',
  'Región del Libertador General Bernardo O\'Higgins',
  'Región del Maule',
  'Región de Ñuble',
  'Región del Biobío',
  'Región de La Araucanía',
  'Región de Los Ríos',
  'Región de Los Lagos',
  'Región de Aysén',
  'Región de Magallanes y de la Antártica Chilena'
];

// Menú lateral
const menuItems = [
  {
    title: 'Mi información personal',
    value: 'profile',
    icon: 'fa-solid fa-user'
  },
  {
    title: 'Cambiar contraseña',
    value: 'password',
    icon: 'fa-solid fa-lock'
  },
  {
    title: 'Mis pedidos',
    value: 'orders',
    icon: 'fa-solid fa-box'
  },
  {
    title: 'Mis cupones',
    value: 'coupons',
    icon: 'fa-solid fa-ticket'
  }
];

// Cupones disponibles
const coupons = ref([
  {
    id: 1,
    code: 'BIENVENIDA20',
    discount: '20%',
    description: 'Descuento del 20% en tu primera compra',
    validUntil: '31/12/2024',
    isUsed: false,
    minPurchase: 50000
  },
  {
    id: 2,
    code: 'HERRAMIENTAS15',
    discount: '15%',
    description: 'Descuento del 15% en herramientas eléctricas',
    validUntil: '30/06/2024',
    isUsed: false,
    minPurchase: 80000
  },
  {
    id: 3,
    code: 'ENVIOGRATIS',
    discount: 'Envío gratis',
    description: 'Envío gratuito en tu próxima compra',
    validUntil: '15/05/2024',
    isUsed: false,
    minPurchase: 30000
  }
]);
// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    title: 'Inicio',
    disabled: false,
    href: '/',
  },
  {
    title: 'Mi cuenta',
    disabled: true,
  },
]);

// Métodos
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getOrderStatusColor = (status) => {
  switch (status) {
    case 'Pendiente':
      return 'warning';
    case 'En proceso':
      return 'info';
    case 'En camino':
      return 'primary';
    case 'Entregado':
      return 'success';
    case 'Cancelado':
      return 'error';
    default:
      return 'grey';
  }
};

const updateProfile = async () => {
  try {
    // Aquí iría la lógica para actualizar el perfil en el backend
    console.log('Actualizando perfil:', profile.value);
    
    // Simulación de éxito
    alert('Información personal actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    alert('Error al actualizar la información. Por favor, intente nuevamente.');
  }
};

const updatePassword = async () => {
  try {
    // Validación básica
    if (passwordForm.value.new !== passwordForm.value.confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // Aquí iría la lógica para actualizar la contraseña en el backend
    console.log('Actualizando contraseña');
    
    // Simulación de éxito
    alert('Contraseña actualizada correctamente');
    
    // Limpiar formulario
    passwordForm.value = {
      current: '',
      new: '',
      confirm: ''
    };
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    alert('Error al actualizar la contraseña. Por favor, intente nuevamente.');
  }
};

const viewOrderDetails = (orderId) => {
  selectedOrder.value = orders.value.find(order => order.id === orderId);
  showOrderDetailsDialog.value = true;
};

const copyCouponCode = (code) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      alert('Código de cupón copiado al portapapeles: ' + code);
    })
    .catch(err => {
      console.error('Error al copiar el código: ', err);
      alert('No se pudo copiar el código. Por favor, cópielo manualmente: ' + code);
    });
};

// Inicialización
onMounted(() => {
  // Aquí se podrían cargar los datos del usuario desde el backend
  console.log('Componente Mi cuenta montado');
});
</script>

<style scoped>
.account-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.bg-white {
  background-color: white !important;
}

.v-card {
  border-radius: 8px;
}

.v-list-item--active {
  font-weight: bold;
}

.v-table {
  background-color: white !important;
}

.v-table th {
  color: rgba(0, 0, 0, 0.6) !important;
  font-weight: 600 !important;
}

.v-table td {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>