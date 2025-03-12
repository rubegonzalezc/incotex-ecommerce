<template>
  <div class="admin-settings">
    <v-container fluid>
      <!-- Título de la página -->
      <div class="d-flex align-center mb-6">
        <v-icon icon="fa-solid fa-gear" size="large" class="mr-3"></v-icon>
        <h1 class="text-h4 font-weight-bold">Configuración</h1>
      </div>

      <!-- Tarjetas de configuración -->
      <v-card class="mb-6">
        <v-tabs v-model="activeTab" bg-color="primary" align-tabs="start">
          <v-tab value="general">
            <v-icon icon="fa-solid fa-store" class="mr-2"></v-icon>
            General
          </v-tab>
          <v-tab value="payment">
            <v-icon icon="fa-solid fa-credit-card" class="mr-2"></v-icon>
            Pagos
          </v-tab>
          <v-tab value="shipping">
            <v-icon icon="fa-solid fa-truck" class="mr-2"></v-icon>
            Envíos
          </v-tab>
          <v-tab value="email">
            <v-icon icon="fa-solid fa-envelope" class="mr-2"></v-icon>
            Correos
          </v-tab>
          <v-tab value="appearance">
            <v-icon icon="fa-solid fa-palette" class="mr-2"></v-icon>
            Apariencia
          </v-tab>
        </v-tabs>

        <v-card-text class="pa-6">
          <v-window v-model="activeTab">
            <!-- Configuración General -->
            <v-window-item value="general">
              <h2 class="text-h5 font-weight-bold mb-4">Configuración General</h2>
              
              <v-form ref="generalForm" v-model="forms.general.valid">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.general.storeName"
                      label="Nombre de la tienda"
                      variant="outlined"
                      :rules="[v => !!v || 'El nombre de la tienda es requerido']"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.general.storeEmail"
                      label="Email de la tienda"
                      variant="outlined"
                      :rules="[
                        v => !!v || 'El email es requerido',
                        v => /.+@.+\..+/.test(v) || 'El email debe ser válido'
                      ]"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.general.storePhone"
                      label="Teléfono de contacto"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.general.storeAddress"
                      label="Dirección"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-textarea
                      v-model="settings.general.storeDescription"
                      label="Descripción de la tienda"
                      variant="outlined"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="settings.general.currency"
                      :items="currencyOptions"
                      label="Moneda"
                      variant="outlined"
                      required
                    ></v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="settings.general.timezone"
                      :items="timezoneOptions"
                      label="Zona horaria"
                      variant="outlined"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>
            
            <!-- Configuración de Pagos -->
            <v-window-item value="payment">
              <h2 class="text-h5 font-weight-bold mb-4">Configuración de Pagos</h2>
              
              <v-form ref="paymentForm" v-model="forms.payment.valid">
                <v-row>
                  <v-col cols="12">
                    <v-switch
                      v-model="settings.payment.enableCreditCard"
                      label="Habilitar pago con tarjeta de crédito"
                      color="primary"
                      hide-details
                      class="mb-4"
                    ></v-switch>
                    
                    <v-expand-transition>
                      <div v-if="settings.payment.enableCreditCard" class="pl-4 mb-6">
                        <v-text-field
                          v-model="settings.payment.apiKey"
                          label="API Key"
                          variant="outlined"
                          class="mb-3"
                        ></v-text-field>
                        
                        <v-text-field
                          v-model="settings.payment.secretKey"
                          label="Secret Key"
                          variant="outlined"
                          type="password"
                        ></v-text-field>
                      </div>
                    </v-expand-transition>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-switch
                      v-model="settings.payment.enableBankTransfer"
                      label="Habilitar transferencia bancaria"
                      color="primary"
                      hide-details
                      class="mb-4"
                    ></v-switch>
                    
                    <v-expand-transition>
                      <div v-if="settings.payment.enableBankTransfer" class="pl-4 mb-6">
                        <v-text-field
                          v-model="settings.payment.bankName"
                          label="Nombre del banco"
                          variant="outlined"
                          class="mb-3"
                        ></v-text-field>
                        
                        <v-text-field
                          v-model="settings.payment.accountNumber"
                          label="Número de cuenta"
                          variant="outlined"
                          class="mb-3"
                        ></v-text-field>
                        
                        <v-text-field
                          v-model="settings.payment.accountHolder"
                          label="Titular de la cuenta"
                          variant="outlined"
                        ></v-text-field>
                      </div>
                    </v-expand-transition>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-switch
                      v-model="settings.payment.enableCashOnDelivery"
                      label="Habilitar pago contra entrega"
                      color="primary"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>
            
            <!-- Configuración de Envíos -->
            <v-window-item value="shipping">
              <h2 class="text-h5 font-weight-bold mb-4">Configuración de Envíos</h2>
              
              <v-form ref="shippingForm" v-model="forms.shipping.valid">
                <v-row>
                  <v-col cols="12">
                    <v-switch
                      v-model="settings.shipping.freeShipping"
                      label="Habilitar envío gratuito"
                      color="primary"
                      hide-details
                      class="mb-4"
                    ></v-switch>
                    
                    <v-expand-transition>
                      <div v-if="settings.shipping.freeShipping" class="pl-4 mb-6">
                        <v-text-field
                          v-model="settings.shipping.freeShippingMinAmount"
                          label="Monto mínimo para envío gratuito"
                          variant="outlined"
                          type="number"
                          prefix="$"
                        ></v-text-field>
                      </div>
                    </v-expand-transition>
                  </v-col>
                  
                  <v-col cols="12">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Zonas de envío</h3>
                    
                    <v-card variant="outlined" class="mb-4" v-for="(zone, index) in settings.shipping.zones" :key="index">
                      <v-card-text>
                        <div class="d-flex justify-space-between align-center mb-4">
                          <h4 class="text-h6">{{ zone.name }}</h4>
                          <v-btn icon variant="text" color="error" @click="removeShippingZone(index)">
                            <v-icon icon="fa-solid fa-trash"></v-icon>
                          </v-btn>
                        </div>
                        
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="zone.name"
                              label="Nombre de la zona"
                              variant="outlined"
                            ></v-text-field>
                          </v-col>
                          
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="zone.price"
                              label="Precio de envío"
                              variant="outlined"
                              type="number"
                              prefix="$"
                            ></v-text-field>
                          </v-col>
                          
                          <v-col cols="12">
                            <v-combobox
                              v-model="zone.regions"
                              :items="regionOptions"
                              label="Regiones"
                              multiple
                              chips
                              variant="outlined"
                            ></v-combobox>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    
                    <v-btn color="primary" variant="outlined" prepend-icon="fa-solid fa-plus" @click="addShippingZone">
                      Agregar zona de envío
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>
            
            <!-- Configuración de Correos -->
            <v-window-item value="email">
              <h2 class="text-h5 font-weight-bold mb-4">Configuración de Correos</h2>
              
              <v-form ref="emailForm" v-model="forms.email.valid">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.email.fromEmail"
                      label="Email remitente"
                      variant="outlined"
                      :rules="[
                        v => !!v || 'El email es requerido',
                        v => /.+@.+\..+/.test(v) || 'El email debe ser válido'
                      ]"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.email.fromName"
                      label="Nombre remitente"
                      variant="outlined"
                      :rules="[v => !!v || 'El nombre es requerido']"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Plantillas de correo</h3>
                    
                    <v-expansion-panels variant="accordion">
                      <v-expansion-panel v-for="(template, key) in settings.email.templates" :key="key">
                        <v-expansion-panel-title>
                          {{ template.name }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-text-field
                            v-model="template.subject"
                            label="Asunto"
                            variant="outlined"
                            class="mb-3"
                          ></v-text-field>
                          
                          <v-textarea
                            v-model="template.content"
                            label="Contenido"
                            variant="outlined"
                            rows="10"
                            hint="Puedes usar variables como {nombre}, {orden_id}, etc."
                            persistent-hint
                          ></v-textarea>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>
            
            <!-- Configuración de Apariencia -->
            <v-window-item value="appearance">
              <h2 class="text-h5 font-weight-bold mb-4">Configuración de Apariencia</h2>
              
              <v-form ref="appearanceForm" v-model="forms.appearance.valid">
                <v-row>
                  <v-col cols="12" md="6">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Logo</h3>
                    
                    <div class="mb-4">
                      <v-img
                        v-if="settings.appearance.logo"
                        :src="settings.appearance.logo"
                        max-width="200"
                        class="mb-3"
                      ></v-img>
                      
                      <v-file-input
                        label="Subir logo"
                        variant="outlined"
                        accept="image/*"
                        prepend-icon="fa-solid fa-upload"
                        @change="handleLogoUpload"
                      ></v-file-input>
                    </div>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Favicon</h3>
                    
                    <div class="mb-4">
                      <v-img
                        v-if="settings.appearance.favicon"
                        :src="settings.appearance.favicon"
                        max-width="64"
                        class="mb-3"
                      ></v-img>
                      
                      <v-file-input
                        label="Subir favicon"
                        variant="outlined"
                        accept="image/*"
                        prepend-icon="fa-solid fa-upload"
                        @change="handleFaviconUpload"
                      ></v-file-input>
                    </div>
                  </v-col>
                </v-row>
                
                <v-divider class="my-6"></v-divider>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Colores</h3>
                    
                    <v-row>
                      <v-col cols="12" sm="6">
                        <label class="text-body-2 mb-2 d-block">Color primario</label>
                        <v-color-picker
                          v-model="settings.appearance.primaryColor"
                          hide-inputs
                          hide-canvas
                          show-swatches
                          swatches-max-height="120"
                        ></v-color-picker>
                      </v-col>
                      
                      <v-col cols="12" sm="6">
                        <label class="text-body-2 mb-2 d-block">Color secundario</label>
                        <v-color-picker
                          v-model="settings.appearance.secondaryColor"
                          hide-inputs
                          hide-canvas
                          show-swatches
                          swatches-max-height="120"
                        ></v-color-picker>
                      </v-col>
                    </v-row>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Banner principal</h3>
                    
                    <div class="mb-4">
                      <v-img
                        v-if="settings.appearance.mainBanner"
                        :src="settings.appearance.mainBanner"
                        max-height="150"
                        class="mb-3"
                      ></v-img>
                      
                      <v-file-input
                        label="Subir banner"
                        variant="outlined"
                        accept="image/*"
                        prepend-icon="fa-solid fa-upload"
                        @change="handleBannerUpload"
                      ></v-file-input>
                    </div>
                  </v-col>
                </v-row>
                
                <v-divider class="my-6"></v-divider>
                
                <v-row>
                  <v-col cols="12">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">Redes sociales</h3>
                    
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="settings.appearance.socialMedia.facebook"
                          label="Facebook"
                          variant="outlined"
                          prepend-inner-icon="fa-brands fa-facebook"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="settings.appearance.socialMedia.instagram"
                          label="Instagram"
                          variant="outlined"
                          prepend-inner-icon="fa-brands fa-instagram"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="settings.appearance.socialMedia.twitter"
                          label="Twitter"
                          variant="outlined"
                          prepend-inner-icon="fa-brands fa-twitter"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="settings.appearance.socialMedia.youtube"
                          label="YouTube"
                          variant="outlined"
                          prepend-inner-icon="fa-brands fa-youtube"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
      
      <!-- Botones de acción -->
      <div class="d-flex justify-end">
        <v-btn
          color="error"
          variant="outlined"
          class="mr-4"
          @click="resetSettings"
        >
          Cancelar
        </v-btn>
        
        <v-btn
          color="primary"
          :loading="loading"
          @click="saveSettings"
        >
          Guardar cambios
        </v-btn>
      </div>
    </v-container>
    
    <!-- Snackbar para mensajes -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

// Estado de la pestaña activa
const activeTab = ref('general');

// Estado de carga
const loading = ref(false);

// Referencias a los formularios
const generalForm = ref(null);
const paymentForm = ref(null);
const shippingForm = ref(null);
const emailForm = ref(null);
const appearanceForm = ref(null);

// Estado de validación de formularios
const forms = reactive({
  general: { valid: false },
  payment: { valid: false },
  shipping: { valid: false },
  email: { valid: false },
  appearance: { valid: false }
});

// Opciones para selects
const currencyOptions = [
  { title: 'Peso Chileno (CLP)', value: 'CLP' },
  { title: 'Dólar Estadounidense (USD)', value: 'USD' },
  { title: 'Euro (EUR)', value: 'EUR' }
];

const timezoneOptions = [
  { title: 'Santiago (GMT-3)', value: 'America/Santiago' },
  { title: 'Buenos Aires (GMT-3)', value: 'America/Argentina/Buenos_Aires' },
  { title: 'Bogotá (GMT-5)', value: 'America/Bogota' },
  { title: 'Ciudad de México (GMT-6)', value: 'America/Mexico_City' }
];

const regionOptions = [
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
  'Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes'
];

// Configuración de la tienda
const settings = reactive({
  general: {
    storeName: 'Incotex',
    storeEmail: 'contacto@incotex.cl',
    storePhone: '+56 2 2123 4567',
    storeAddress: 'Av. Providencia 1234, Providencia, Santiago',
    storeDescription: 'Tienda especializada en productos de oficina y tecnología para empresas.',
    currency: 'CLP',
    timezone: 'America/Santiago'
  },
  payment: {
    enableCreditCard: true,
    apiKey: '',
    secretKey: '',
    enableBankTransfer: true,
    bankName: 'Banco Estado',
    accountNumber: '12345678',
    accountHolder: 'Incotex SpA',
    enableCashOnDelivery: false
  },
  shipping: {
    freeShipping: true,
    freeShippingMinAmount: 50000,
    zones: [
      {
        name: 'Santiago',
        price: 3000,
        regions: ['Región Metropolitana']
      },
      {
        name: 'Zona Centro',
        price: 5000,
        regions: ['Valparaíso', 'O\'Higgins']
      },
      {
        name: 'Resto del país',
        price: 8000,
        regions: ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Maule', 'Ñuble', 'Biobío', 'Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes']
      }
    ]
  },
  email: {
    fromEmail: 'no-reply@incotex.cl',
    fromName: 'Incotex',
    templates: {
      orderConfirmation: {
        name: 'Confirmación de pedido',
        subject: 'Confirmación de tu pedido #{orden_id}',
        content: 'Hola {nombre},\n\nGracias por tu compra. Tu pedido #{orden_id} ha sido recibido y está siendo procesado.\n\nDetalles del pedido:\n{detalles_pedido}\n\nTotal: ${total}\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos,\nEquipo Incotex'
      },
      shipping: {
        name: 'Envío de pedido',
        subject: 'Tu pedido #{orden_id} ha sido enviado',
        content: 'Hola {nombre},\n\nTu pedido #{orden_id} ha sido enviado y está en camino.\n\nPuedes seguir tu envío con el siguiente código de seguimiento: {codigo_seguimiento}\n\nSaludos,\nEquipo Incotex'
      },
      welcome: {
        name: 'Bienvenida',
        subject: 'Bienvenido/a a Incotex',
        content: 'Hola {nombre},\n\n¡Bienvenido/a a Incotex! Gracias por registrarte en nuestra tienda.\n\nAhora puedes disfrutar de todos nuestros productos y beneficios exclusivos para clientes registrados.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos,\nEquipo Incotex'
      },
      passwordReset: {
        name: 'Recuperación de contraseña',
        subject: 'Recuperación de contraseña',
        content: 'Hola {nombre},\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:\n\n{enlace_recuperacion}\n\nSi no solicitaste este cambio, puedes ignorar este correo.\n\nSaludos,\nEquipo Incotex'
      }
    }
  },
  appearance: {
    logo: 'https://via.placeholder.com/200x80?text=Incotex',
    favicon: 'https://via.placeholder.com/32x32',
    primaryColor: '#1976D2',
    secondaryColor: '#424242',
    mainBanner: 'https://via.placeholder.com/1200x400?text=Banner+Principal',
    socialMedia: {
      facebook: 'https://facebook.com/incotex',
      instagram: 'https://instagram.com/incotex',
      twitter: 'https://twitter.com/incotex',
      youtube: ''
    }
  }
});

// Snackbar para mensajes
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000
});

// Cargar configuración al montar el componente
onMounted(async () => {
  try {
    // Aquí iría la lógica para cargar la configuración desde el backend
    // Por ahora usamos los valores por defecto definidos arriba
    
    // Simulamos una carga
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    loading.value = false;
    
  } catch (error) {
    console.error('Error al cargar la configuración:', error);
    showMessage('Error al cargar la configuración', 'error');
    loading.value = false;
  }
});

// Métodos para manejar la subida de archivos
const handleLogoUpload = (file) => {
  if (!file) return;
  
  // Aquí iría la lógica para subir el archivo al servidor
  // Por ahora simulamos con una URL local
  const reader = new FileReader();
  reader.onload = (e) => {
    settings.appearance.logo = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleFaviconUpload = (file) => {
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    settings.appearance.favicon = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleBannerUpload = (file) => {
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    settings.appearance.mainBanner = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Métodos para zonas de envío
const addShippingZone = () => {
  settings.shipping.zones.push({
    name: 'Nueva zona',
    price: 0,
    regions: []
  });
};

const removeShippingZone = (index) => {
  settings.shipping.zones.splice(index, 1);
};

// Método para guardar la configuración
const saveSettings = async () => {
  // Validar formularios según la pestaña activa
  let isValid = true;
  
  switch (activeTab.value) {
    case 'general':
      isValid = generalForm.value.validate();
      break;
    case 'payment':
      isValid = paymentForm.value.validate();
      break;
    case 'shipping':
      isValid = shippingForm.value.validate();
      break;
    case 'email':
      isValid = emailForm.value.validate();
      break;
    case 'appearance':
      isValid = appearanceForm.value.validate();
      break;
  }
  
  if (!isValid) {
    showMessage('Por favor, completa todos los campos requeridos', 'error');
    return;
  }
  
  loading.value = true;
  
  try {
    // Aquí iría la lógica para guardar la configuración en el backend
    // Por ahora simulamos una espera
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showMessage('Configuración guardada correctamente', 'success');
  } catch (error) {
    console.error('Error al guardar la configuración:', error);
    showMessage('Error al guardar la configuración', 'error');
  } finally {
    loading.value = false;
  }
};

// Método para resetear la configuración
const resetSettings = async () => {
  try {
    // Simulamos una carga
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Aquí iría la lógica para recargar la configuración desde el backend
    // Por ahora simplemente recargamos la página
    window.location.reload();
  } catch (error) {
    console.error('Error al resetear la configuración:', error);
    showMessage('Error al resetear la configuración', 'error');
  } finally {
    loading.value = false;
  }
};

// Método para mostrar mensajes
const showMessage = (text, color = 'success') => {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
};
</script>

<style scoped>
.admin-settings {
  background-color: #f8f9fa;
}

.v-expansion-panel-title {
  font-weight: 500;
}

.v-card {
  border-radius: 8px;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
    