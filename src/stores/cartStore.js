import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // State
  const cartItems = ref([
    {
      id: 1,
      name: 'Taladro Percutor Inalámbrico DeWalt',
      price: 129990,
      quantity: 1,
      image: 'https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg'
    },
    {
      id: 2,
      name: 'Set de Brocas DeWalt',
      price: 24990,
      quantity: 2,
      image: 'https://m.media-amazon.com/images/I/71Qjg8M+zcL._AC_SL1500_.jpg'
    }
  ]);

  // Getters
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartSubtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  const taxAmount = computed(() => {
    return Math.round(cartSubtotal.value * 0.19); // 19% IVA
  });

  const orderTotal = computed(() => {
    return cartSubtotal.value + taxAmount.value;
  });

  // Actions
  function addToCart(product, quantity = 1) {
    const existingItem = cartItems.value.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }
  }

  function removeFromCart(productId) {
    const index = cartItems.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  }

  function updateQuantity(productId, quantity) {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  function increaseQuantity(productId) {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      item.quantity++;
    }
  }

  function decreaseQuantity(productId) {
    const item = cartItems.value.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  function clearCart() {
    cartItems.value = [];
  }

  // Helper functions
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return {
    cartItems,
    cartItemCount,
    cartSubtotal,
    taxAmount,
    orderTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    formatPrice
  };
});