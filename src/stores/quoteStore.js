import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useQuoteStore = defineStore('quote', () => {
  // State
  const quoteItems = ref([
    {
      id: 1,
      name: 'Taladro Percutor Inalámbrico DeWalt',
      quantity: 1,
      image: 'https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg',
      sku: 'DW-10023',
      brand: 'DeWalt'
    },
    {
      id: 2,
      name: 'Set de Brocas DeWalt',
      quantity: 2,
      image: 'https://m.media-amazon.com/images/I/71Qjg8M+zcL._AC_SL1500_.jpg',
      sku: 'DW-20045',
      brand: 'DeWalt'
    }
  ]);

  // Metadata para la cotización
  const quoteMetadata = ref({
    quoteNumber: null,
    createdAt: null,
    expiresAt: null,
    status: 'draft', // draft, submitted, expired
    customerNotes: ''
  });

  // Getters
  const quoteItemCount = computed(() => {
    return quoteItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalItems = computed(() => {
    return quoteItems.value.length;
  });

  // Actions
  function addToQuote(product, quantity = 1) {
    const existingItem = quoteItems.value.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      quoteItems.value.push({
        id: product.id,
        name: product.name,
        quantity: quantity,
        image: product.image,
        sku: product.sku || `SKU-${product.id}`,
        brand: product.brand || 'Sin especificar'
      });
    }
  }

  function removeFromQuote(productId) {
    const index = quoteItems.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      quoteItems.value.splice(index, 1);
    }
  }

  function updateQuantity(productId, quantity) {
    const item = quoteItems.value.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  function increaseQuantity(productId) {
    const item = quoteItems.value.find(item => item.id === productId);
    if (item) {
      item.quantity++;
    }
  }

  function decreaseQuantity(productId) {
    const item = quoteItems.value.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  function clearQuote() {
    quoteItems.value = [];
    resetQuoteMetadata();
  }

  function submitQuote(customerData) {
    // Generar número de cotización (en producción, esto vendría del backend)
    const timestamp = Date.now();
    const randomDigits = Math.floor(Math.random() * 1000);
    quoteMetadata.value.quoteNumber = `QUOTE-${timestamp}-${randomDigits}`;
    
    // Establecer fechas
    quoteMetadata.value.createdAt = new Date();
    
    // Fecha de expiración (30 días después)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    quoteMetadata.value.expiresAt = expiryDate;
    
    // Actualizar estado
    quoteMetadata.value.status = 'submitted';
    
    // Aquí iría la lógica para enviar la cotización al backend
    console.log('Quote submitted', {
      metadata: quoteMetadata.value,
      items: quoteItems.value,
      customer: customerData
    });
    
    // En un sistema real, llamaríamos a una API aquí
    return {
      success: true,
      quoteNumber: quoteMetadata.value.quoteNumber
    };
  }

  function resetQuoteMetadata() {
    quoteMetadata.value = {
      quoteNumber: null,
      createdAt: null,
      expiresAt: null,
      status: 'draft',
      customerNotes: ''
    };
  }

  function setCustomerNotes(notes) {
    quoteMetadata.value.customerNotes = notes;
  }

  return {
    quoteItems,
    quoteMetadata,
    quoteItemCount,
    totalItems,
    addToQuote,
    removeFromQuote,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearQuote,
    submitQuote,
    setCustomerNotes
  };
});