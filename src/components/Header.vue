<template>
  <header>
    <!-- Top Bar - Barra azul con contacto y redes sociales (se oculta en móviles) -->
    <v-sheet class="top-bar d-none d-sm-block" color="primary">
      <div class="container d-flex justify-space-between align-center py-2">
        <div class="contact-info d-flex align-center">
          <v-btn variant="text" color="white" href="tel:+56912345678" class="px-2 text-body-2" density="compact">
            <v-icon icon="fa-solid fa-phone" size="small" class="mr-2" />
            +56 9 1234 5678
          </v-btn>
          <v-btn variant="text" color="white" href="mailto:contacto@ferrepro.cl" class="px-2 text-body-2" density="compact">
            <v-icon icon="fa-solid fa-envelope" size="small" class="mr-2" />
            contacto@ferrepro.cl
          </v-btn>
        </div>
        <div class="social-links d-flex">
          <v-btn icon variant="text" color="white" href="#" size="small" class="social-btn">
            <v-icon icon="fa-brands fa-facebook-f" size="small" />
          </v-btn>
          <v-btn icon variant="text" color="white" href="#" size="small" class="social-btn">
            <v-icon icon="fa-brands fa-instagram" size="small" />
          </v-btn>
          <v-btn icon variant="text" color="white" href="#" size="small" class="social-btn">
            <v-icon icon="fa-brands fa-whatsapp" size="small" />
          </v-btn>
        </div>
      </div>
    </v-sheet>

    <!-- Mobile Header -->
    <v-sheet color="white" elevation="1" class="d-flex d-md-none mobile-header">
      <div class="container d-flex align-center justify-space-between py-2">
        <!-- Mobile menu button -->
        <v-btn
          icon
          variant="text"
          @click="mobileDrawer = !mobileDrawer"
          color="primary"
        >
          <v-icon icon="fa-solid fa-bars" />
        </v-btn>

        <!-- Logo -->
        <div class="logo-mobile">
          <router-link to="/">
            <v-img
              src="https://incotexhv.cl/wp-content/uploads/2021/07/Logo-Incotex-1024x318.png"
              alt="INCOTEX HV SERVICIOS SPA"
              width="140"
              height="40"
              contain
              eager
            />
          </router-link>
        </div>

        <!-- Cart icon -->
        <div class="d-flex align-center">
          <v-btn
            icon
            variant="text"
            color="primary"
            @click="mobileSearch = !mobileSearch"
            class="mr-2"
          >
            <v-icon icon="fa-solid fa-magnifying-glass" />
          </v-btn>
          
          <v-btn
            icon
            variant="text"
            color="primary"
            to="/carrito"
          >
            <v-badge :content="cartItemCount.toString()" color="error" location="top end" offset-x="5" offset-y="5">
              <v-icon icon="fa-solid fa-shopping-cart" />
            </v-badge>
          </v-btn>
        </div>
      </div>
    </v-sheet>

    <!-- Mobile Search Bar (aparece cuando se hace clic en el icono de búsqueda) -->
    <v-expand-transition>
      <v-sheet v-if="mobileSearch" color="white" class="d-md-none py-2 px-4">
        <div class="d-flex align-center">
          <v-text-field
            variant="outlined"
            density="compact"
            hide-details
            placeholder="¿Qué estás buscando?"
            class="search-input"
            color="primary"
            autofocus
            append-inner-icon="fa-solid fa-times"
            @click:append-inner="mobileSearch = false"
          />
          <v-btn color="primary" class="ml-2" size="small">
            <v-icon icon="fa-solid fa-magnifying-glass" />
          </v-btn>
        </div>
      </v-sheet>
    </v-expand-transition>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="mobileDrawer"
      temporary
      location="left"
      width="280"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6 font-weight-bold">Menú</v-list-item-title>
          <template v-slot:append>
            <v-btn icon variant="text" @click="mobileDrawer = false">
              <v-icon icon="fa-solid fa-times" />
            </v-btn>
          </template>
        </v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <v-list-item to="/" @click="mobileDrawer = false">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-home" class="mr-2" />
          </template>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/mi-cuenta" @click="mobileDrawer = false">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-user" class="mr-2" />
          </template>
          <v-list-item-title>Mi Cuenta</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/carrito" @click="mobileDrawer = false">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-shopping-cart" class="mr-2" />
          </template>
          <v-list-item-title>Carrito</v-list-item-title>
        </v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <v-list-subheader>Categorías</v-list-subheader>
        
        <v-list-group
          v-for="category in mainCategories"
          :key="category.name"
          :value="category.name"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="category.name"
              @click="mobileDrawer = false"
            >
              <template v-slot:prepend>
                <v-icon :icon="category.icon" class="mr-2" />
              </template>
            </v-list-item>
          </template>
          
          <v-list-item
            v-for="subcategory in category.subcategories"
            :key="subcategory"
            :title="subcategory"
            @click="mobileDrawer = false"
            class="pl-4"
          />
        </v-list-group>
        
        <v-divider class="my-2"></v-divider>
        
        <v-list-item to="/ofertas" @click="mobileDrawer = false">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-tag" class="mr-2" />
          </template>
          <v-list-item-title>Ofertas</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/novedades" @click="mobileDrawer = false">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-star" class="mr-2" />
          </template>
          <v-list-item-title>Novedades</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/marcas" @click="mobileDrawer = false">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-certificate" class="mr-2" />
          </template>
          <v-list-item-title>Marcas</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/contacto" @click="mobileDrawer = false">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-envelope" class="mr-2" />
          </template>
          <v-list-item-title>Contacto</v-list-item-title>
        </v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <v-list-item href="tel:+56912345678">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-phone" class="mr-2" />
          </template>
          <v-list-item-title>+56 9 1234 5678</v-list-item-title>
        </v-list-item>
        
        <v-list-item href="mailto:contacto@ferrepro.cl">
          <template v-slot:prepend>
            <v-icon icon="fa-solid fa-envelope" class="mr-2" />
          </template>
          <v-list-item-title>contacto@ferrepro.cl</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Navigation - Logo, búsqueda y cuenta/carrito (se oculta en móviles) -->
    <v-sheet color="white" elevation="0" class="py-3 d-none d-md-block">
      <div class="container d-flex align-center">
        <div class="logo mr-6">
          <v-img
            src="https://incotexhv.cl/wp-content/uploads/2021/07/Logo-Incotex-1024x318.png"
            alt="INCOTEX HV SERVICIOS SPA"
            max-width="220"
            :aspect-ratio="3.2"
            contain
            eager
          />
        </div>
        
        <div class="search-container flex-grow-1 mx-auto">
          <div class="d-flex align-center">
            <v-select
              class="category-select mr-0 rounded-r-0"
              :items="categories"
              variant="outlined"
              hide-details
              model-value="Todas las categorías"
              density="compact"
              color="primary"
            />
            <v-text-field
              variant="outlined"
              density="compact"
              hide-details
              placeholder="¿Qué estás buscando?"
              class="search-input rounded-0"
              color="primary"
            />
            <v-btn color="primary" elevation="0" class="search-button rounded-l-0" height="40">
              <v-icon icon="fa-solid fa-magnifying-glass" />
            </v-btn>
          </div>
        </div>

        <div class="nav-actions d-flex ml-6">
          <v-btn to="/mi-cuenta" variant="text" class="account-btn d-flex flex-column pa-2" color="black">
            <v-icon icon="fa-solid fa-user" class="mb-1" />
            <span class="text-caption">Mi Cuenta</span>
          </v-btn>
          
          <!-- Cart with dropdown -->
          <v-menu
            v-model="cartMenuOpen"
            :close-on-content-click="false"
            location="bottom end"
            offset="10"
            min-width="350"
          >
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props"
                variant="text" 
                class="cart-btn d-flex flex-column pa-2 ml-4" 
                color="black"
              >
                <v-badge :content="cartItemCount.toString()" color="error" location="top end" offset-x="10" offset-y="10">
                  <v-icon icon="fa-solid fa-shopping-cart" class="mb-1" />
                </v-badge>
                <span class="text-caption">Carrito</span>
              </v-btn>
            </template>

            <v-card class="cart-dropdown">
              <v-card-title class="d-flex justify-space-between align-center py-3 px-4 bg-grey-lighten-4">
                <span class="text-subtitle-1 font-weight-bold">Mi Carrito</span>
                <span class="text-subtitle-2">{{ cartItemCount }} productos</span>
              </v-card-title>

              <v-card-text class="pa-0">
                <div v-if="cartItems.length > 0">
                  <v-list class="cart-items-list">
                    <v-list-item
                      v-for="item in cartItems"
                      :key="item.id"
                      class="cart-item py-2"
                    >
                      <template v-slot:prepend>
                        <v-img
                          :src="item.image"
                          :alt="item.name"
                          width="60"
                          height="60"
                          cover
                          class="rounded mr-3"
                        ></v-img>
                      </template>

                      <v-list-item-title class="text-body-2 font-weight-medium mb-1">
                        {{ item.name }}
                      </v-list-item-title>

                      <v-list-item-subtitle class="d-flex justify-space-between align-center">
                        <span class="text-caption">{{ item.quantity }} x ${{ formatPrice(item.price) }}</span>
                        <span class="text-body-2 font-weight-bold">${{ formatPrice(item.price * item.quantity) }}</span>
                      </v-list-item-subtitle>

                      <template v-slot:append>
                        <v-btn
                          icon
                          variant="text"
                          density="compact"
                          color="grey"
                          @click="removeFromCart(item.id)"
                        >
                          <v-icon icon="fa-solid fa-times" size="small"></v-icon>
                        </v-btn>
                      </template>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <div class="cart-summary pa-4">
                    <div class="d-flex justify-space-between mb-2">
                      <span class="text-body-2">Subtotal:</span>
                      <span class="text-body-2 font-weight-bold">${{ formatPrice(cartSubtotal) }}</span>
                    </div>

                    <div class="d-flex flex-column mt-4">
                      <v-btn
                        color="primary"
                        variant="flat"
                        block
                        class="mb-2"
                        to="/carrito"
                        @click="cartMenuOpen = false"
                      >
                        Ver carrito
                      </v-btn>

                      <v-btn
                        color="success"
                        variant="flat"
                        block
                        to="/checkout"
                        @click="cartMenuOpen = false"
                      >
                        Finalizar compra
                      </v-btn>
                    </div>
                  </div>
                </div>

                <div v-else class="empty-cart text-center py-6 px-4">
                  <v-icon icon="fa-solid fa-shopping-cart" size="48" color="grey-lighten-2" class="mb-3"></v-icon>
                  <p class="text-body-1 mb-4">Tu carrito está vacío</p>
                  <v-btn
                    color="primary"
                    variant="flat"
                    to="/productos"
                    @click="cartMenuOpen = false"
                  >
                    Explorar productos
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-sheet>

    <!-- Menu Navigation - Categorías y enlaces principales (se oculta en móviles) -->
    <v-sheet color="white" elevation="1" class="border-t d-none d-md-block">
      <div class="container">
        <div class="d-flex">
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                variant="flat"
                class="px-4 text-none font-weight-medium"
                rounded="0"
              >
                <v-icon icon="fa-solid fa-bars" start />
                Categorías
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="category in mainCategories"
                :key="category.name"
                :value="category.name"
              >
                <template v-slot:prepend>
                  <v-icon :icon="category.icon"></v-icon>
                </template>
                <v-list-item-title>{{ category.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          
          <v-tabs
            color="primary"
            align-tabs="center"
            slider-color="primary"
            class="ml-4"
          >
            <v-tab to="/" class="text-none px-4">Inicio</v-tab>
            <v-tab to="/ofertas" class="text-none px-4">Ofertas</v-tab>
            <v-tab to="/novedades" class="text-none px-4">Novedades</v-tab>
            <v-tab to="/marcas" class="text-none px-4">Marcas</v-tab>
            <v-tab to="/contacto" class="text-none px-4">Contacto</v-tab>
          </v-tabs>
        </div>
      </div>
    </v-sheet>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';

// Variables para el menú móvil
const mobileDrawer = ref(false);
const mobileSearch = ref(false);

const categories = ['Todas las categorías', 'Herramientas', 'Electricidad', 'Plomería'];

const mainCategories = [
  {
    name: 'Herramientas',
    icon: 'fa-solid fa-tools',
    subcategories: [
      'Herramientas Eléctricas',
      'Herramientas Manuales',
      'Herramientas de Medición',
      'Herramientas de Jardín'
    ]
  },
  {
    name: 'Electricidad',
    icon: 'fa-solid fa-bolt',
    subcategories: [
      'Cables y Conductores',
      'Iluminación',
      'Enchufes y Interruptores',
      'Tableros Eléctricos'
    ]
  }
];

// Cart functionality
const cartStore = useCartStore();
const cartMenuOpen = ref(false);

// Use cart store properties
const cartItems = computed(() => cartStore.cartItems);
const cartItemCount = computed(() => cartStore.cartItemCount);
const cartSubtotal = computed(() => cartStore.cartSubtotal);

// Use cart store methods
const formatPrice = cartStore.formatPrice;
const removeFromCart = cartStore.removeFromCart;
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.top-bar {
  font-size: 0.9rem;
}

.social-btn {
  width: 28px !important;
  height: 28px !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 50%;
}

.search-container {
  max-width: 600px;
}

.category-select {
  min-width: 180px;
  max-width: 180px;
}

.search-button {
  min-width: 48px !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.account-btn, 
.cart-btn {
  height: auto !important;
}

.border-t {
  border-top: 1px solid #e0e0e0;
}

.logo {
  min-width: 160px;
  display: flex;
  align-items: center;
}

.logo-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  max-width: 140px;
  height: 40px;
}

.mobile-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.cart-dropdown {
  border-radius: 8px;
  overflow: hidden;
}

.cart-items-list {
  max-height: 300px;
  overflow-y: auto;
}

.cart-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.cart-item:last-child {
  border-bottom: none;
}

.empty-cart {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Ajustes responsive */
@media (max-width: 960px) {
  .category-select {
    min-width: 120px;
    max-width: 120px;
  }
  
  .nav-actions {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .contact-info span {
    display: none;
  }
  
  .search-container {
    margin: 0 10px;
  }
}

@media (max-width: 599px) {
  .logo {
    min-width: 120px;
  }
  
  .logo .v-img {
    max-width: 150px !important;
  }
}
</style>