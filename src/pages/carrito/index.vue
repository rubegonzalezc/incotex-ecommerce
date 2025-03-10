<template>
  <div class="cart-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <h1 class="text-h4 font-weight-bold mb-6">Mi Carrito</h1>

      <div v-if="cartItems.length > 0">
        <v-row>
          <!-- Cart items -->
          <v-col cols="12" lg="8" class="pr-lg-6">
            <v-card class="mb-4" elevation="1">
              <v-card-title class="py-4 px-6 bg-grey-lighten-4">
                <span class="text-h6 font-weight-bold">Productos ({{ cartItemCount }})</span>
              </v-card-title>
              
              <v-card-text class="pa-0">
                <v-list class="cart-items-list">
                  <v-list-item
                    v-for="(item, index) in cartItems"
                    :key="index"
                    class="cart-item py-4 px-6"
                  >
                    <div class="d-flex w-100">
                      <!-- Product image -->
                      <v-img
                        :src="item.image"
                        :alt="item.name"
                        width="100"
                        height="100"
                        cover
                        class="rounded mr-4"
                      ></v-img>
                      
                      <!-- Product details -->
                      <div class="flex-grow-1 d-flex flex-column justify-space-between">
                        <div>
                          <div class="d-flex justify-space-between align-start">
                            <h3 class="text-subtitle-1 font-weight-medium mb-1">{{ item.name }}</h3>
                            <v-btn
                              icon
                              variant="text"
                              density="compact"
                              color="grey"
                              @click="removeFromCart(item.id)"
                            >
                              <v-icon icon="fa-solid fa-times" size="small"></v-icon>
                            </v-btn>
                          </div>
                          
                          <div class="text-caption text-grey mb-4">
                            SKU: {{ item.id.toString().padStart(6, '0') }}
                          </div>
                        </div>
                        
                        <div class="d-flex justify-space-between align-center">
                          <!-- Quantity selector -->
                          <div class="quantity-selector d-flex align-center">
                            <v-btn
                              icon
                              variant="outlined"
                              size="small"
                              density="comfortable"
                              color="grey"
                              @click="decreaseQuantity(item.id)"
                              :disabled="item.quantity <= 1"
                            >
                              <v-icon icon="fa-solid fa-minus" size="x-small"></v-icon>
                            </v-btn>
                            
                            <span class="mx-3 text-body-1">{{ item.quantity }}</span>
                            
                            <v-btn
                              icon
                              variant="outlined"
                              size="small"
                              density="comfortable"
                              color="grey"
                              @click="increaseQuantity(item.id)"
                            >
                              <v-icon icon="fa-solid fa-plus" size="x-small"></v-icon>
                            </v-btn>
                          </div>
                          
                          <!-- Price -->
                          <div class="text-right">
                            <div class="text-body-2 text-grey-darken-1">
                              ${{ formatPrice(item.price) }} c/u
                            </div>
                            <div class="text-subtitle-1 font-weight-bold">
                              ${{ formatPrice(item.price * item.quantity) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
            
            <!-- Continue shopping button -->
            <div class="d-flex mb-6">
              <v-btn
                variant="text"
                color="primary"
                prepend-icon="fa-solid fa-arrow-left"
                to="/productos"
              >
                Seguir comprando
              </v-btn>
            </div>
          </v-col>
          
          <!-- Order summary -->
          <v-col cols="12" lg="4">
            <v-card elevation="1" class="order-summary">
              <v-card-title class="py-4 px-6 bg-grey-lighten-4">
                <span class="text-h6 font-weight-bold">Resumen del pedido</span>
              </v-card-title>
              
              <v-card-text class="pa-6">
                <div class="d-flex justify-space-between mb-4">
                  <span class="text-body-1">Subtotal:</span>
                  <span class="text-body-1 font-weight-medium">${{ formatPrice(cartSubtotal) }}</span>
                </div>
                
                <div class="d-flex justify-space-between mb-4">
                  <span class="text-body-1">Envío:</span>
                  <span class="text-body-1 font-weight-medium">
                    <template v-if="shippingCost > 0">${{ formatPrice(shippingCost) }}</template>
                    <template v-else>Gratis</template>
                  </span>
                </div>
                
                <div class="d-flex justify-space-between mb-4">
                  <span class="text-body-1">IVA (19%):</span>
                  <span class="text-body-1 font-weight-medium">${{ formatPrice(taxAmount) }}</span>
                </div>
                
                <v-divider class="mb-4"></v-divider>
                
                <div class="d-flex justify-space-between mb-6">
                  <span class="text-h6 font-weight-bold">Total:</span>
                  <span class="text-h6 font-weight-bold">${{ formatPrice(orderTotal) }}</span>
                </div>
                
                <v-btn
                  color="success"
                  variant="flat"
                  block
                  size="large"
                  to="/checkout"
                  class="mb-3"
                >
                  Finalizar compra
                </v-btn>
                
                <div class="payment-methods text-center mt-4">
                  <p class="text-caption text-grey mb-2">Métodos de pago aceptados</p>
                  <div class="d-flex justify-center">
                    <v-icon icon="fa-brands fa-cc-visa" class="mx-1" color="grey-darken-1"></v-icon>
                    <v-icon icon="fa-brands fa-cc-mastercard" class="mx-1" color="grey-darken-1"></v-icon>
                    <v-icon icon="fa-brands fa-cc-amex" class="mx-1" color="grey-darken-1"></v-icon>
                    <v-icon icon="fa-solid fa-credit-card" class="mx-1" color="grey-darken-1"></v-icon>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      
      <!-- Empty cart state -->
      <div v-else class="empty-cart-page text-center py-8">
        <v-icon icon="fa-solid fa-shopping-cart" size="64" color="grey-lighten-2" class="mb-4"></v-icon>
        <h2 class="text-h5 font-weight-medium mb-3">Tu carrito está vacío</h2>
        <p class="text-body-1 text-grey-darken-1 mb-6">Parece que aún no has agregado productos a tu carrito.</p>
        <v-btn
          color="primary"
          variant="flat"
          size="large"
          to="/productos"
        >
          Explorar productos
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    href: '/',
  },
  {
    title: 'Mi Carrito',
    disabled: true,
  },
];

// Use cart store
const cartStore = useCartStore();

// Cart items from store
const cartItems = computed(() => cartStore.cartItems);
const cartItemCount = computed(() => cartStore.cartItemCount);
const cartSubtotal = computed(() => cartStore.cartSubtotal);
const taxAmount = computed(() => cartStore.taxAmount);

// Shipping cost
const shippingCost = ref(0); // Free shipping for now

// Order total
const orderTotal = computed(() => cartSubtotal.value + shippingCost.value + taxAmount.value);

// Cart methods from store
const formatPrice = cartStore.formatPrice;
const removeFromCart = cartStore.removeFromCart;
const increaseQuantity = cartStore.increaseQuantity;
const decreaseQuantity = cartStore.decreaseQuantity;
</script>

<style scoped>
.cart-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.cart-item:last-child {
  border-bottom: none;
}

.empty-cart-page {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
}

.order-summary {
  position: sticky;
  top: 24px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Add these text color styles */
.text-h4, .text-h5, .text-h6, 
.text-subtitle-1, .text-body-1, .text-body-2,
.text-caption {
  color: rgba(0, 0, 0, 0.87) !important;
}

.text-grey, .text-grey-darken-1 {
  color: rgba(0, 0, 0, 0.6) !important;
}

@media (max-width: 1264px) {
  .order-summary {
    position: static;
  }
}
</style>