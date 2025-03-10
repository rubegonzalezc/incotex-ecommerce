<template>
  <div class="checkout-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <h1 class="text-h4 font-weight-bold mb-6">Finalizar compra</h1>

      <v-row>
        <!-- Checkout form -->
        <v-col cols="12" lg="8" class="pr-lg-6">
          <v-stepper v-model="currentStep" class="checkout-stepper">
            <!-- Stepper header -->
            <v-stepper-header>
              <v-stepper-item value="1" title="Datos personales"></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item value="2" title="Envío"></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item value="3" title="Pago"></v-stepper-item>
            </v-stepper-header>

            <!-- Stepper content -->
            <v-stepper-window>
              <!-- Step 1: Personal information -->
              <v-stepper-window-item value="1">
                <v-card class="mt-4 mb-6" elevation="0">
                  <v-card-title class="px-0">
                    <span class="text-h6">Información personal</span>
                  </v-card-title>
                  
                  <v-card-text class="px-0">
                    <v-form ref="personalForm">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="personalInfo.firstName"
                            label="Nombre"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="personalInfo.lastName"
                            label="Apellido"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12">
                          <v-text-field
                            v-model="personalInfo.email"
                            label="Correo electrónico"
                            variant="outlined"
                            density="comfortable"
                            type="email"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12">
                          <v-text-field
                            v-model="personalInfo.phone"
                            label="Teléfono"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  
                  <v-card-actions class="px-0">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      variant="flat"
                      @click="currentStep = '2'"
                    >
                      Continuar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-window-item>

              <!-- Step 2: Shipping information -->
              <v-stepper-window-item value="2">
                <v-card class="mt-4 mb-6" elevation="0">
                  <v-card-title class="px-0">
                    <span class="text-h6">Información de envío</span>
                  </v-card-title>
                  
                  <v-card-text class="px-0">
                    <v-form ref="shippingForm">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="shippingInfo.address"
                            label="Dirección"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="shippingInfo.city"
                            label="Ciudad"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="shippingInfo.postalCode"
                            label="Código postal"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12">
                          <v-select
                            v-model="shippingInfo.region"
                            :items="regions"
                            label="Región"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-select>
                        </v-col>
                        
                        <v-col cols="12">
                          <v-textarea
                            v-model="shippingInfo.notes"
                            label="Notas adicionales (opcional)"
                            variant="outlined"
                            density="comfortable"
                            rows="3"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  
                  <!-- Añadir un botón para simular el envío justo antes del botón de confirmar pedido -->
                  <v-card-actions class="px-0">
                    <v-btn
                      variant="text"
                      @click="currentStep = '1'"
                    >
                      Atrás
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      variant="flat"
                      @click="currentStep = '3'"
                    >
                      Continuar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-window-item>

              <!-- Step 3: Payment information -->
              <v-stepper-window-item value="3">
                <v-card class="mt-4 mb-6" elevation="0">
                  <v-card-title class="px-0">
                    <span class="text-h6">Información de pago</span>
                  </v-card-title>
                  
                  <v-card-text class="px-0">
                    <v-form ref="paymentForm">
                      <v-row>
                        <!-- Replace the radio group with payment method cards -->
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="12" sm="4">
                              <v-card
                                :color="paymentMethod === 'credit_card' ? 'primary' : undefined"
                                :variant="paymentMethod === 'credit_card' ? 'flat' : 'outlined'"
                                class="payment-method-card"
                                @click="paymentMethod = 'credit_card'"
                              >
                                <v-card-text class="d-flex align-center">
                                  <v-icon icon="fa-solid fa-credit-card" size="24" class="mr-3"
                                    :color="paymentMethod === 'credit_card' ? 'white' : 'primary'">
                                  </v-icon>
                                  <span class="payment-method-text" :class="{'text-white': paymentMethod === 'credit_card'}">
                                    Tarjeta de crédito
                                  </span>
                                </v-card-text>
                              </v-card>
                            </v-col>
                        
                            <v-col cols="12" sm="4">
                              <v-card
                                :color="paymentMethod === 'debit_card' ? 'primary' : undefined"
                                :variant="paymentMethod === 'debit_card' ? 'flat' : 'outlined'"
                                class="payment-method-card"
                                @click="paymentMethod = 'debit_card'"
                              >
                                <v-card-text class="d-flex align-center">
                                  <v-icon icon="fa-regular fa-credit-card" size="24" class="mr-3"
                                    :color="paymentMethod === 'debit_card' ? 'white' : 'primary'">
                                  </v-icon>
                                  <span class="payment-method-text" :class="{'text-white': paymentMethod === 'debit_card'}">
                                    Tarjeta de débito
                                  </span>
                                </v-card-text>
                              </v-card>
                            </v-col>
                        
                            <v-col cols="12" sm="4">
                              <v-card
                                :color="paymentMethod === 'transfer' ? 'primary' : undefined"
                                :variant="paymentMethod === 'transfer' ? 'flat' : 'outlined'"
                                class="payment-method-card"
                                @click="paymentMethod = 'transfer'"
                              >
                                <v-card-text class="d-flex align-center">
                                  <v-icon icon="fa-solid fa-building-columns" size="24" class="mr-3"
                                    :color="paymentMethod === 'transfer' ? 'white' : 'primary'">
                                  </v-icon>
                                  <span class="payment-method-text" :class="{'text-white': paymentMethod === 'transfer'}">
                                    Transferencia bancaria
                                  </span>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                        
                        <v-col v-if="paymentMethod === 'credit_card' || paymentMethod === 'debit_card'" cols="12">
                          <v-text-field
                            v-model="paymentInfo.cardNumber"
                            label="Número de tarjeta"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col v-if="paymentMethod === 'credit_card' || paymentMethod === 'debit_card'" cols="12" sm="6">
                          <v-text-field
                            v-model="paymentInfo.cardName"
                            label="Nombre en la tarjeta"
                            variant="outlined"
                            density="comfortable"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col v-if="paymentMethod === 'credit_card' || paymentMethod === 'debit_card'" cols="12" sm="3">
                          <v-text-field
                            v-model="paymentInfo.expiryDate"
                            label="Fecha de expiración"
                            variant="outlined"
                            density="comfortable"
                            placeholder="MM/AA"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col v-if="paymentMethod === 'credit_card' || paymentMethod === 'debit_card'" cols="12" sm="3">
                          <v-text-field
                            v-model="paymentInfo.cvv"
                            label="CVV"
                            variant="outlined"
                            density="comfortable"
                            type="password"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col v-if="paymentMethod === 'transfer'" cols="12">
                          <v-alert
                            type="info"
                            variant="tonal"
                            title="Información de transferencia"
                            text="Realiza la transferencia a la siguiente cuenta bancaria. Tu pedido será procesado una vez confirmado el pago."
                            class="mb-3"
                          ></v-alert>
                          
                          <div class="transfer-info pa-4 bg-grey-lighten-5 rounded">
                            <p class="mb-2"><strong>Banco:</strong> Banco de Chile</p>
                            <p class="mb-2"><strong>Titular:</strong> Incotex SpA</p>
                            <p class="mb-2"><strong>RUT:</strong> 76.123.456-7</p>
                            <p class="mb-2"><strong>Cuenta Corriente:</strong> 123-45678-90</p>
                            <p class="mb-0"><strong>Email:</strong> pagos@incotex.cl</p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  
                  <v-card-actions class="px-0">
                    <v-btn
                      variant="text"
                      @click="currentStep = '2'"
                    >
                      Atrás
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="info"
                      variant="outlined"
                      class="mr-2"
                      @click="simulateApiPost"
                    >
                      Simular envío
                    </v-btn>
                    <v-btn
                      color="success"
                      variant="flat"
                      @click="placeOrder"
                    >
                      Confirmar pedido
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>
        </v-col>
        
        <!-- Order summary -->
        <v-col cols="12" lg="4">
          <v-card elevation="1" class="order-summary">
            <v-card-title class="py-4 px-6 bg-grey-lighten-4">
              <span class="text-h6 font-weight-bold">Resumen del pedido</span>
            </v-card-title>
            
            <v-card-text class="pa-0">
              <v-list class="cart-items-list">
                <v-list-item
                  v-for="(item, index) in cartItems"
                  :key="index"
                  class="cart-item py-2 px-6"
                >
                  <template v-slot:prepend>
                    <v-img
                      :src="item.image"
                      :alt="item.name"
                      width="50"
                      height="50"
                      cover
                      class="rounded mr-3"
                    ></v-img>
                  </template>
                  
                  <v-list-item-title class="text-body-2 font-weight-medium">
                    {{ item.name }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle class="d-flex justify-space-between align-center">
                    <span class="text-caption">{{ item.quantity }} x ${{ formatPrice(item.price) }}</span>
                    <span class="text-body-2 font-weight-bold">${{ formatPrice(item.price * item.quantity) }}</span>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
              
              <v-divider></v-divider>
              
              <div class="pa-6">
                <div class="d-flex justify-space-between mb-3">
                  <span class="text-body-2">Subtotal:</span>
                  <span class="text-body-2 font-weight-medium">${{ formatPrice(cartSubtotal) }}</span>
                </div>
                
                <div class="d-flex justify-space-between mb-3">
                  <span class="text-body-2">Envío:</span>
                  <span class="text-body-2 font-weight-medium">
                    <template v-if="shippingCost > 0">${{ formatPrice(shippingCost) }}</template>
                    <template v-else>Gratis</template>
                  </span>
                </div>
                
                <div class="d-flex justify-space-between mb-3">
                  <span class="text-body-2">IVA (19%):</span>
                  <span class="text-body-2 font-weight-medium">${{ formatPrice(taxAmount) }}</span>
                </div>
                
                <v-divider class="my-3"></v-divider>
                
                <div class="d-flex justify-space-between">
                  <span class="text-subtitle-1 font-weight-bold">Total:</span>
                  <span class="text-subtitle-1 font-weight-bold">${{ formatPrice(orderTotal) }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Order confirmation dialog -->
    <v-dialog v-model="orderConfirmationDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5 py-4 px-6 bg-success text-white">
          <v-icon icon="fa-solid fa-check-circle" start class="mr-2"></v-icon>
          Pedido confirmado
        </v-card-title>
        
        <v-card-text class="pa-6">
          <p class="text-body-1 mb-4">¡Gracias por tu compra! Tu pedido ha sido recibido y está siendo procesado.</p>
          
          <div class="order-details bg-grey-lighten-5 pa-4 rounded mb-4">
            <p class="text-body-2 mb-2"><strong>Número de pedido:</strong> #{{ orderNumber }}</p>
            <!-- Remove this duplicate line -->
            <!-- <p class="text-body-2 mb-2"><strong>Número de pedido:</strong> #{{ orderNumber }}</p> -->
            <p class="text-body-2 mb-2"><strong>Fecha:</strong> {{ orderDate }}</p>
            <p class="text-body-2 mb-2"><strong>Total:</strong> ${{ formatPrice(orderTotal) }}</p>
            <p class="text-body-2 mb-0"><strong>Método de pago:</strong> {{ getPaymentMethodName() }}</p>
          </div>
          
          <p class="text-body-2 mb-4">
            Hemos enviado un correo electrónico con los detalles de tu pedido a <strong>{{ personalInfo.email }}</strong>.
          </p>
          
          <p class="text-body-2">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos a <strong>ventas@incotex.cl</strong> o llamar al <strong>+56 2 2123 4567</strong>.
          </p>
        </v-card-text>
        
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            to="/"
          >
            Volver a la tienda
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';

const router = useRouter();
const cartStore = useCartStore();

// Use cart store properties
const cartItems = computed(() => cartStore.cartItems);
const cartItemCount = computed(() => cartStore.cartItemCount);
const cartSubtotal = computed(() => cartStore.cartSubtotal);
const taxAmount = computed(() => cartStore.taxAmount);
const formatPrice = cartStore.formatPrice;

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    href: '/',
  },
  {
    title: 'Carrito',
    disabled: false,
    href: '/carrito',
  },
  {
    title: 'Finalizar compra',
    disabled: true,
  },
];

// Stepper
const currentStep = ref('1');

// Form data
const personalInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
});

const shippingInfo = ref({
  address: '',
  city: '',
  postalCode: '',
  region: '',
  notes: '',
});

const regions = [
  'Región Metropolitana',
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'O\'Higgins',
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes'
];

const paymentMethod = ref('credit_card');
const paymentInfo = ref({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
});

// Remove this duplicate declaration of cartItems
// Cart items (this would typically come from a store or API)
// const cartItems = ref([
//   {
//     id: 1,
//     name: 'Taladro Percutor Inalámbrico DeWalt',
//     price: 129990,
//     quantity: 1,
//     image: 'https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg'
//   },
//   {
//     id: 2,
//     name: 'Set de Brocas DeWalt',
//     price: 24990,
//     quantity: 2,
//     image: 'https://m.media-amazon.com/images/I/71Qjg8M+zcL._AC_SL1500_.jpg'
//   }
// ]);

// Remove these duplicate cart calculations since we're using the store
// const cartItemCount = computed(() => {
//   return cartItems.value.reduce((total, item) => total + item.quantity, 0);
// });

// const cartSubtotal = computed(() => {
//   return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
// });

const shippingCost = ref(0); // Free shipping for now

// const taxAmount = computed(() => {
//   return Math.round(cartSubtotal.value * 0.19); // 19% IVA
// });

const orderTotal = computed(() => {
  return cartSubtotal.value + shippingCost.value + taxAmount.value;
});

// Order confirmation
const orderConfirmationDialog = ref(false);
const orderNumber = ref('');
const orderDate = ref('');

// Remove this duplicate function since we're using the one from the store
// Format price with thousand separators
// const formatPrice = (price) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

// Get payment method name for display
const getPaymentMethodName = () => {
  const methods = {
    'credit_card': 'Tarjeta de crédito',
    'debit_card': 'Tarjeta de débito',
    'transfer': 'Transferencia bancaria'
  };
  return methods[paymentMethod.value] || paymentMethod.value;
};

// Place order
const placeOrder = () => {
  // Here you would typically validate forms and send data to your backend
  
  // Generate random order number
  orderNumber.value = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Set current date
  const now = new Date();
  orderDate.value = now.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Show confirmation dialog
  orderConfirmationDialog.value = true;
  
  // In a real application, you would clear the cart here
  // cartStore.clearCart();
};

// Simular envío a API
const simulateApiPost = () => {
  // Crear objeto con todos los datos del pedido
  const orderData = {
    order: {
      orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
      orderDate: new Date().toISOString(),
      customer: {
        firstName: personalInfo.value.firstName,
        lastName: personalInfo.value.lastName,
        email: personalInfo.value.email,
        phone: personalInfo.value.phone
      },
      shipping: {
        address: shippingInfo.value.address,
        city: shippingInfo.value.city,
        postalCode: shippingInfo.value.postalCode,
        region: shippingInfo.value.region,
        notes: shippingInfo.value.notes || ''
      },
      payment: {
        method: paymentMethod.value,
        methodName: getPaymentMethodName(),
        details: paymentMethod.value === 'transfer' ? 
          { transferInfo: 'Banco de Chile, Cuenta 123-45678-90' } : 
          {
            cardNumber: paymentInfo.value.cardNumber ? 
              '****' + paymentInfo.value.cardNumber.slice(-4) : '',
            cardName: paymentInfo.value.cardName || '',
            expiryDate: paymentInfo.value.expiryDate || ''
          }
      },
      items: cartItems.value.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      summary: {
        subtotal: cartSubtotal.value,
        shipping: shippingCost.value,
        tax: taxAmount.value,
        total: orderTotal.value
      }
    }
  };
  
  // Mostrar en consola el JSON que se enviaría
  console.log('Datos que se enviarían a la API:');
  console.log(JSON.stringify(orderData, null, 2));
  
  // Mostrar alerta con los datos
  alert('Datos listos para enviar. Revisa la consola para ver el JSON completo.');
  
  // En una aplicación real, aquí se haría el fetch o axios.post
  // Ejemplo:
  // fetch('https://api.incotex.cl/orders', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(orderData)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  //   orderNumber.value = data.orderNumber;
  //   orderConfirmationDialog.value = true;
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });
};
</script>

<style scoped>
.cart-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-items-list {
  max-height: 300px;
  overflow-y: auto;
}

.order-summary {
  position: sticky;
  top: 24px;
}

.checkout-stepper {
  background-color: transparent;
}

/* Custom styles for radio buttons */
:deep(.v-selection-control) {
  opacity: 1 !important;
}

:deep(.v-selection-control__input) {
  opacity: 1 !important;
  color: rgba(0, 0, 0, 0.6) !important;
}

:deep(.v-selection-control--dirty .v-selection-control__input) {
  color: var(--v-theme-primary) !important;
}

:deep(.v-label) {
  opacity: 1 !important;
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep(.v-radio-group .v-selection-control-group) {
  column-gap: 16px;
}

/* Modificar los estilos de las tarjetas de método de pago */
.payment-method-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-method-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.payment-method-card .v-card-text {
  font-size: 1rem;
  font-weight: 500;
}

/* Eliminar estos estilos que podrían estar causando conflictos */
.payment-method-card span {
  color: rgba(0, 0, 0, 0.87) !important;
}
/*
.payment-method-card:hover span {
  color: rgba(0, 0, 0, 0.87) !important;
}

.payment-method-card[color="primary"] span {
  color: white !important;
} */

@media (max-width: 1264px) {
  .order-summary {
    position: static;
  }
}
</style>