<template>
  <div class="admin-order-list">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <h1 class="text-h4 font-weight-bold">Gestión de Pedidos</h1>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="fa-solid fa-file-export"
            @click="exportOrders"
          >
            Exportar Pedidos
          </v-btn>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" rounded="lg">
            <v-card-text class="pa-4">
              <!-- Filtros y búsqueda -->
              <v-row>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="searchQuery"
                    label="Buscar pedidos"
                    prepend-inner-icon="fa-solid fa-search"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="2">
                  <v-select
                    v-model="statusFilter"
                    label="Estado"
                    :items="statusOptions"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" sm="2">
                  <v-select
                    v-model="paymentFilter"
                    label="Método de pago"
                    :items="paymentOptions"
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
              
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="d-flex align-center">
                    <v-text-field
                      v-model="dateRange.start"
                      label="Fecha desde"
                      type="date"
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="mr-2"
                    ></v-text-field>
                    
                    <v-text-field
                      v-model="dateRange.end"
                      label="Fecha hasta"
                      type="date"
                      variant="outlined"
                      density="compact"
                      hide-details
                    ></v-text-field>
                    
                    <v-btn
                      color="primary"
                      variant="text"
                      class="ml-2"
                      @click="applyFilters"
                    >
                      Aplicar
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
              
              <!-- Tabla de pedidos -->
              <v-data-table
                :headers="headers"
                :items="orders"
                :loading="loading"
                :items-per-page="10"
                :items-per-page-options="[10, 20, 50]"
                class="mt-4"
              >
                <!-- Columna de ID -->
                <template v-slot:item.id="{ item }">
                  <span class="font-weight-bold">#{{ item.id }}</span>
                </template>
                
                <!-- Columna de fecha -->
                <template v-slot:item.date="{ item }">
                  {{ formatDate(item.date) }}
                </template>
                
                <!-- Columna de cliente -->
                <template v-slot:item.customer="{ item }">
                  <div class="d-flex align-center">
                    <v-avatar size="30" color="grey-lighten-1" class="mr-2">
                      <v-img v-if="item.customer.avatar" :src="item.customer.avatar" cover></v-img>
                      <v-icon v-else icon="fa-solid fa-user" color="white" size="small"></v-icon>
                    </v-avatar>
                    <div>
                      <div class="font-weight-medium">{{ item.customer.name }}</div>
                      <div class="text-caption text-grey">{{ item.customer.email }}</div>
                    </div>
                  </div>
                </template>
                
                <!-- Columna de total -->
                <template v-slot:item.total="{ item }">
                  <span class="font-weight-bold">${{ formatPrice(item.total) }}</span>
                </template>
                
                <!-- Columna de método de pago -->
                <template v-slot:item.paymentMethod="{ item }">
                  <v-chip
                    size="small"
                    :color="getPaymentMethodColor(item.paymentMethod)"
                    class="text-caption"
                  >
                    {{ getPaymentMethodLabel(item.paymentMethod) }}
                  </v-chip>
                </template>
                
                <!-- Columna de estado -->
                <template v-slot:item.status="{ item }">
                  <v-chip
                    size="small"
                    :color="getStatusColor(item.status)"
                    class="text-caption"
                  >
                    {{ getStatusLabel(item.status) }}
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
                      @click="viewOrderDetails(item)"
                    >
                      <v-icon icon="fa-solid fa-eye"></v-icon>
                    </v-btn>
                    
                    <v-btn
                      icon
                      variant="text"
                      density="compact"
                      color="warning"
                      class="mr-2"
                      @click="openUpdateStatusDialog(item)"
                    >
                      <v-icon icon="fa-solid fa-pen-to-square"></v-icon>
                    </v-btn>
                    
                    <v-btn
                      icon
                      variant="text"
                      density="compact"
                      color="info"
                      @click="printOrder(item)"
                    >
                      <v-icon icon="fa-solid fa-print"></v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Diálogo para ver detalles del pedido -->
    <v-dialog v-model="orderDetailsDialog" max-width="800">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          Detalles del Pedido #{{ selectedOrder?.id }}
        </v-card-title>
        
        <v-divider></v-divider>
        
        <v-card-text class="pa-4" v-if="selectedOrder">
          <v-row>
            <v-col cols="12" sm="6">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Información del Cliente</h3>
              <v-list density="compact" class="bg-grey-lighten-4 rounded">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="fa-solid fa-user" size="small" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>{{ selectedOrder.customer.name }}</v-list-item-title>
                </v-list-item>
                
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="fa-solid fa-envelope" size="small" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>{{ selectedOrder.customer.email }}</v-list-item-title>
                </v-list-item>
                
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="fa-solid fa-phone" size="small" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>{{ selectedOrder.customer.phone || 'No disponible' }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            
            <v-col cols="12" sm="6">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Información del Pedido</h3>
              <v-list density="compact" class="bg-grey-lighten-4 rounded">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="fa-solid fa-calendar" size="small" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>Fecha: {{ formatDate(selectedOrder.date) }}</v-list-item-title>
                </v-list-item>
                
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="fa-solid fa-credit-card" size="small" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>
                    Método de pago: {{ getPaymentMethodLabel(selectedOrder.paymentMethod) }}
                  </v-list-item-title>
                </v-list-item>
                
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="fa-solid fa-truck" size="small" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>
                    Estado: 
                    <v-chip
                      size="x-small"
                      :color="getStatusColor(selectedOrder.status)"
                      class="ml-2"
                    >
                      {{ getStatusLabel(selectedOrder.status) }}
                    </v-chip>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          
          <v-row class="mt-4">
            <v-col cols="12">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Dirección de Envío</h3>
              <v-card variant="outlined" class="pa-3">
                <p class="mb-1">{{ selectedOrder.shippingAddress.street }}</p>
                <p class="mb-1">
                  {{ selectedOrder.shippingAddress.city }}, 
                  {{ selectedOrder.shippingAddress.state }} 
                  {{ selectedOrder.shippingAddress.zipCode }}
                </p>
                <p class="mb-0">{{ selectedOrder.shippingAddress.country }}</p>
              </v-card>
            </v-col>
          </v-row>
          
          <v-row class="mt-4">
            <v-col cols="12">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Productos</h3>
              <v-table density="compact" class="border rounded">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th class="text-right">Precio</th>
                    <th class="text-right">Cantidad</th>
                    <th class="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in selectedOrder.items" :key="index">
                    <td>
                      <div class="d-flex align-center">
                        <v-avatar size="40" rounded class="mr-2">
                          <v-img :src="item.product.image" cover></v-img>
                        </v-avatar>
                        <div>
                          <div class="font-weight-medium">{{ item.product.name }}</div>
                          <div class="text-caption text-grey">SKU: {{ item.product.sku }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">${{ formatPrice(item.price) }}</td>
                    <td class="text-right">{{ item.quantity }}</td>
                    <td class="text-right font-weight-bold">${{ formatPrice(item.price * item.quantity) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
          
          <v-row class="mt-4">
            <v-col cols="12" sm="6" offset-sm="6">
              <v-list density="compact" class="bg-grey-lighten-4 rounded">
                <v-list-item>
                  <v-list-item-title>Subtotal</v-list-item-title>
                  <template v-slot:append>
                    <span>${{ formatPrice(selectedOrder.subtotal) }}</span>
                  </template>
                </v-list-item>
                
                <v-list-item>
                  <v-list-item-title>Envío</v-list-item-title>
                  <template v-slot:append>
                    <span>${{ formatPrice(selectedOrder.shippingCost) }}</span>
                  </template>
                </v-list-item>
                
                <v-list-item v-if="selectedOrder.discount">
                  <v-list-item-title>Descuento</v-list-item-title>
                  <template v-slot:append>
                    <span class="text-error">-${{ formatPrice(selectedOrder.discount) }}</span>
                  </template>
                </v-list-item>
                
                <v-list-item>
                  <v-list-item-title class="text-subtitle-1 font-weight-bold">Total</v-list-item-title>
                  <template v-slot:append>
                    <span class="text-subtitle-1 font-weight-bold">${{ formatPrice(selectedOrder.total) }}</span>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          
          <v-row class="mt-4">
            <v-col cols="12">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Notas</h3>
              <v-card variant="outlined" class="pa-3">
                <p class="mb-0">{{ selectedOrder.notes || 'Sin notas adicionales' }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        
        <v-divider></v-divider>
        
        <v-card-actions>
          <v-btn
            color="primary"
            variant="text"
            prepend-icon="fa-solid fa-print"
            @click="printOrder(selectedOrder)"
          >
            Imprimir
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="orderDetailsDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Diálogo para actualizar estado del pedido -->
    <v-dialog v-model="updateStatusDialog" max-width="500">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          Actualizar Estado del Pedido #{{ selectedOrder?.id }}
        </v-card-title>
        
        <v-divider></v-divider>
        
        <v-card-text class="pa-4" v-if="selectedOrder">
          <v-select
            v-model="newStatus"
            label="Estado del pedido"
            :items="statusOptions"
            variant="outlined"
            class="mb-4"
          ></v-select>
          
          <v-textarea
            v-model="statusNote"
            label="Nota (opcional)"
            variant="outlined"
            rows="3"
            placeholder="Añadir una nota sobre el cambio de estado"
            class="mb-4"
          ></v-textarea>
          
          <v-checkbox
            v-model="notifyCustomer"
            label="Notificar al cliente por email"
            hide-details
          ></v-checkbox>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="updateStatusDialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="updateOrderStatus">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { orderService } from '@/services/orderService';

// Estado para pedidos y filtros
const orders = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const statusFilter = ref('');
const paymentFilter = ref('');
const sortBy = ref('date_desc');
const dateRange = ref({
  start: '',
  end: ''
});

// Estado para diálogos
const orderDetailsDialog = ref(false);
const updateStatusDialog = ref(false);
const selectedOrder = ref(null);
const newStatus = ref('');
const statusNote = ref('');
const notifyCustomer = ref(true);

// Opciones de estado
const statusOptions = [
  { title: 'Todos los estados', value: '' },
  { title: 'Pendiente', value: 'pending' },
  { title: 'Pagado', value: 'paid' },
  { title: 'Procesando', value: 'processing' },
  { title: 'Enviado', value: 'shipped' },
  { title: 'Entregado', value: 'delivered' },
  { title: 'Cancelado', value: 'cancelled' }
];

// Opciones de método de pago
const paymentOptions = [
  { title: 'Todos los métodos', value: '' },
  { title: 'Tarjeta de crédito', value: 'credit_card' },
  { title: 'Transferencia bancaria', value: 'bank_transfer' },
  { title: 'PayPal', value: 'paypal' },
  { title: 'Contra reembolso', value: 'cash_on_delivery' }
];

// Opciones de ordenamiento
const sortOptions = [
  { title: 'Fecha (más reciente)', value: 'date_desc' },
  { title: 'Fecha (más antiguo)', value: 'date_asc' },
  { title: 'Total (mayor a menor)', value: 'total_desc' },
  { title: 'Total (menor a mayor)', value: 'total_asc' },
  { title: 'Cliente (A-Z)', value: 'customer_asc' },
  { title: 'Cliente (Z-A)', value: 'customer_desc' }
];

// Encabezados de la tabla
const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Fecha', key: 'date', sortable: true },
  { title: 'Cliente', key: 'customer', sortable: true },
  { title: 'Total', key: 'total', sortable: true },
  { title: 'Método de pago', key: 'paymentMethod', sortable: true },
  { title: 'Estado', key: 'status', sortable: true },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'end' }
];

// Formatear precio
const formatPrice = (price) => {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Formatear fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Obtener color según estado
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'paid':
      return 'success';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'grey';
  }
};

// Obtener etiqueta según estado
const getStatusLabel = (status) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'paid':
      return 'Pagado';
    case 'processing':
      return 'Procesando';
    case 'shipped':
      return 'Enviado';
    case 'delivered':
      return 'Entregado';
    case 'cancelled':
      return 'Cancelado';
    default:
      return 'Desconocido';
  }
};

// Obtener color según método de pago
const getPaymentMethodColor = (method) => {
  switch (method) {
    case 'credit_card':
      return 'purple';
    case 'bank_transfer':
      return 'blue';
    case 'paypal':
      return 'indigo';
    case 'cash_on_delivery':
      return 'green';
    default:
      return 'grey';
  }
};

// Obtener etiqueta según método de pago
const getPaymentMethodLabel = (method) => {
  switch (method) {
    case 'credit_card':
      return 'Tarjeta de crédito';
    case 'bank_transfer':
      return 'Transferencia bancaria';
    case 'paypal':
      return 'PayPal';
    case 'cash_on_delivery':
      return 'Contra reembolso';
    default:
      return 'Desconocido';
  }
};

// Cargar pedidos
const loadOrders = async () => {
  loading.value = true;
  try {
    // Construir parámetros de filtro
    const params = {};
    
    if (searchQuery.value) {
      params.search = searchQuery.value;
    }
    
    if (statusFilter.value) {
      params.status = statusFilter.value;
    }
    
    if (paymentFilter.value) {
      params.paymentMethod = paymentFilter.value;
    }
    
    if (dateRange.value.start) {
      params.startDate = dateRange.value.start;
    }
    
    if (dateRange.value.end) {
      params.endDate = dateRange.value.end;
    }
    
    // Manejar ordenamiento
    if (sortBy.value) {
      const [field, direction] = sortBy.value.split('_');
      params.sort = `${field}:${direction}`;
    }
    
    const data = await orderService.getOrders(params);
    orders.value = data;
  } catch (error) {
    console.error('Error loading orders:', error);
    // Mostrar notificación de error
  } finally {
    loading.value = false;
  }
};

// Aplicar filtros
const applyFilters = () => {
  loadOrders();
};

// Resetear filtros
const resetFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
  paymentFilter.value = '';
  sortBy.value = 'date_desc';
  dateRange.value = {
    start: '',
    end: ''
  };
  loadOrders();
};

// Ver detalles del pedido
const viewOrderDetails = (order) => {
  selectedOrder.value = order;
  orderDetailsDialog.value = true;
};

// Abrir diálogo para actualizar estado
const openUpdateStatusDialog = (order) => {
  selectedOrder.value = order;
  newStatus.value = order.status;
  statusNote.value = '';
  notifyCustomer.value = true;
  updateStatusDialog.value = true;
};

// Actualizar estado del pedido
const updateOrderStatus = async () => {
  try {
    await orderService.updateOrderStatus(
      selectedOrder.value.id, 
      {
        status: newStatus.value,
        note: statusNote.value,
        notifyCustomer: notifyCustomer.value
      }
    );
    
    // Actualizar el pedido en la lista
    const index = orders.value.findIndex(o => o.id === selectedOrder.value.id);
    if (index !== -1) {
      orders.value[index].status = newStatus.value;
    }
    
    // Actualizar el pedido seleccionado si está abierto en detalles
    if (orderDetailsDialog.value) {
      selectedOrder.value.status = newStatus.value;
    }
    
    // Cerrar diálogo
    updateStatusDialog.value = false;
    
    // Mostrar notificación de éxito
  } catch (error) {
    console.error('Error updating order status:', error);
    // Mostrar notificación de error
  }
};

// Imprimir pedido
const printOrder = (order) => {
  // En una implementación real, aquí se generaría un PDF o se abriría una ventana de impresión
  console.log('Printing order:', order.id);
  
  // Ejemplo simple: abrir una nueva ventana con los detalles del pedido
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Pedido #${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          .section { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          .total { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Pedido #${order.id}</h1>
        <div class="section">
          <h2>Información del Cliente</h2>
          <p>Nombre: ${order.customer.name}</p>
          <p>Email: ${order.customer.email}</p>
          <p>Teléfono: ${order.customer.phone || 'No disponible'}</p>
        </div>
        <div class="section">
          <h2>Dirección de Envío</h2>
          <p>${order.shippingAddress.street}</p>
          <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
          <p>${order.shippingAddress.country}</p>
        </div>
        <div class="section">
          <h2>Detalles del Pedido</h2>
          <p>Fecha: ${formatDate(order.date)}</p>
          <p>Estado: ${getStatusLabel(order.status)}</p>
          <p>Método de pago: ${getPaymentMethodLabel(order.paymentMethod)}</p>
        </div>
        <div class="section">
          <h2>Productos</h2>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.product.name} (SKU: ${item.product.sku})</td>
                  <td>$${formatPrice(item.price)}</td>
                  <td>${item.quantity}</td>
                  <td>$${formatPrice(item.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="section">
          <h2>Resumen</h2>
          <table>
            <tr>
              <td>Subtotal</td>
              <td>$${formatPrice(order.subtotal)}</td>
            </tr>
            <tr>
              <td>Envío</td>
              <td>$${formatPrice(order.shippingCost)}</td>
            </tr>
            ${order.discount ? `
              <tr>
                <td>Descuento</td>
                <td>-$${formatPrice(order.discount)}</td>
              </tr>
            ` : ''}
            <tr class="total">
              <td>Total</td>
              <td>$${formatPrice(order.total)}</td>
            </tr>
          </table>
        </div>
      </body>
          </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

// Exportar pedidos
const exportOrders = () => {
  // En una implementación real, aquí se generaría un archivo CSV o Excel
  console.log('Exporting orders');
  
  // Crear un array con los datos a exportar
  const exportData = orders.value.map(order => ({
    ID: order.id,
    Fecha: formatDate(order.date),
    Cliente: order.customer.name,
    Email: order.customer.email,
    Total: `$${formatPrice(order.total)}`,
    'Método de Pago': getPaymentMethodLabel(order.paymentMethod),
    Estado: getStatusLabel(order.status)
  }));
  
  // Convertir a CSV
  const headers = Object.keys(exportData[0]);
  const csvContent = [
    headers.join(','),
    ...exportData.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n');
  
  // Crear un blob y descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `pedidos_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Cargar datos al montar el componente
onMounted(() => {
  loadOrders();
});
</script>

<style scoped>
.admin-order-list {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;
}

.v-data-table {
  background-color: white;
}
</style>