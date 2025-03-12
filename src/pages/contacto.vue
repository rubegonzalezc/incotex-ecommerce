<template>
  <div class="contact-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4 text-dark">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <!-- Título de la página -->
      <div class="mb-8">
        <h1 class="text-h3 font-weight-bold mb-2 text-dark">Contacto</h1>
        <p class="text-subtitle-1 text-dark">
          Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
        </p>
      </div>

      <v-row>
        <!-- Formulario de contacto -->
        <v-col cols="12" md="7" class="pr-md-6">
          <v-card class="bg-white">
            <v-card-text class="pa-6">
              <h2 class="text-h5 font-weight-bold mb-4 text-dark">Envíanos un mensaje</h2>
              
              <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.name"
                      label="Nombre"
                      variant="outlined"
                      :rules="nameRules"
                      required
                      class="text-dark"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Correo electrónico"
                      variant="outlined"
                      :rules="emailRules"
                      required
                      class="text-dark"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.phone"
                      label="Teléfono"
                      variant="outlined"
                      class="text-dark"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-select
                      v-model="formData.subject"
                      :items="subjectOptions"
                      label="Asunto"
                      variant="outlined"
                      required
                      :rules="subjectRules"
                      class="text-dark"
                    ></v-select>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.message"
                      label="Mensaje"
                      variant="outlined"
                      rows="5"
                      required
                      :rules="messageRules"
                      class="text-dark"
                    ></v-textarea>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-btn 
                      color="primary" 
                      type="submit" 
                      size="large"
                      :loading="loading"
                      :disabled="!valid || loading"
                      class="mt-2"
                    >
                      Enviar mensaje
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        
        <!-- Información de contacto -->
        <v-col cols="12" md="5">
          <v-card class="bg-white mb-6">
            <v-card-text class="pa-6">
              <h2 class="text-h5 font-weight-bold mb-4 text-dark">Información de contacto</h2>
              
              <div class="contact-info">
                <div class="d-flex mb-4">
                  <v-icon icon="fa-solid fa-location-dot" color="primary" class="mr-4 mt-1"></v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold text-dark">Dirección</h3>
                    <p class="text-body-2 text-dark">Av. Providencia 1234, Providencia</p>
                    <p class="text-body-2 text-dark">Santiago, Chile</p>
                  </div>
                </div>
                
                <div class="d-flex mb-4">
                  <v-icon icon="fa-solid fa-phone" color="primary" class="mr-4 mt-1"></v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold text-dark">Teléfono</h3>
                    <p class="text-body-2 text-dark">+56 2 2123 4567</p>
                    <p class="text-body-2 text-dark">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>
                
                <div class="d-flex mb-4">
                  <v-icon icon="fa-solid fa-envelope" color="primary" class="mr-4 mt-1"></v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold text-dark">Email</h3>
                    <p class="text-body-2 text-dark">contacto@incotex.cl</p>
                    <p class="text-body-2 text-dark">ventas@incotex.cl</p>
                  </div>
                </div>
                
                <div class="d-flex">
                  <v-icon icon="fa-solid fa-globe" color="primary" class="mr-4 mt-1"></v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold text-dark">Redes Sociales</h3>
                    <div class="d-flex mt-2">
                      <v-btn icon variant="text" color="primary" class="mr-2">
                        <v-icon icon="fa-brands fa-facebook"></v-icon>
                      </v-btn>
                      <v-btn icon variant="text" color="primary" class="mr-2">
                        <v-icon icon="fa-brands fa-instagram"></v-icon>
                      </v-btn>
                      <v-btn icon variant="text" color="primary" class="mr-2">
                        <v-icon icon="fa-brands fa-twitter"></v-icon>
                      </v-btn>
                      <v-btn icon variant="text" color="primary">
                        <v-icon icon="fa-brands fa-linkedin"></v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
          
          <!-- Mapa -->
          <v-card class="bg-white">
            <v-card-text class="pa-0">
              <div class="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8457900582364!2d-70.61026492428032!3d-33.42710997357545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf69995fb2a5%3A0x8bb5b36d86b41e7b!2sAv.%20Providencia%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1682458234567!5m2!1ses!2scl" 
                  width="100%" 
                  height="300" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Preguntas frecuentes -->
      <v-card class="mt-8 bg-white">
        <v-card-text class="pa-6">
          <h2 class="text-h4 font-weight-bold mb-6 text-primary text-center">Preguntas Frecuentes</h2>
          
          <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
              <v-expansion-panel-title class="text-dark font-weight-medium">
                {{ faq.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="text-dark">
                {{ faq.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          
          <div class="text-center mt-6">
            <v-btn 
              color="primary" 
              variant="outlined" 
              to="/preguntas-frecuentes"
              class="mt-4"
            >
              Ver todas las preguntas frecuentes
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
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
import { ref, reactive } from 'vue';

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    title: 'Contacto',
    disabled: true,
  },
];

// Estado del formulario
const valid = ref(false);
const form = ref(null);
const loading = ref(false);

// Datos del formulario
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

// Opciones para el asunto
const subjectOptions = [
  'Consulta general',
  'Soporte técnico',
  'Ventas',
  'Reclamos',
  'Sugerencias',
  'Otro',
];

// Reglas de validación
const nameRules = [
  v => !!v || 'El nombre es requerido',
  v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres',
];

const emailRules = [
  v => !!v || 'El correo electrónico es requerido',
  v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
];

const subjectRules = [
  v => !!v || 'El asunto es requerido',
];

const messageRules = [
  v => !!v || 'El mensaje es requerido',
  v => v.length >= 10 || 'El mensaje debe tener al menos 10 caracteres',
];

// Snackbar para mensajes
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000,
});

// Preguntas frecuentes
const faqs = [
  {
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer: 'Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), tarjetas de débito, transferencias bancarias y pago contra entrega en algunas zonas.',
  },
  {
    question: '¿Cuánto tiempo tarda el envío?',
    answer: 'Los tiempos de envío varían según la ubicación. Generalmente, para Santiago es de 1-2 días hábiles y para regiones de 2-5 días hábiles.',
  },
  {
    question: '¿Tienen tienda física?',
    answer: 'Sí, contamos con una tienda física ubicada en Av. Providencia 1234, Providencia, Santiago. Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 hrs.',
  },
  {
    question: '¿Cómo puedo realizar un seguimiento de mi pedido?',
    answer: 'Una vez que tu pedido sea despachado, recibirás un correo electrónico con el número de seguimiento. También puedes revisar el estado de tu pedido en la sección "Mi cuenta" de nuestra página web.',
  },
];

// Método para enviar el formulario
const submitForm = async () => {
  if (!form.value.validate()) return;
  
  loading.value = true;
  
  try {
    // Aquí iría la lógica para enviar el formulario a un backend
    // Por ahora simulamos una espera
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mostrar mensaje de éxito
    snackbar.color = 'success';
    snackbar.text = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
    snackbar.show = true;
    
    // Resetear formulario
    form.value.reset();
    Object.keys(formData).forEach(key => {
      formData[key] = '';
    });
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    
    // Mostrar mensaje de error
    snackbar.color = 'error';
    snackbar.text = 'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.';
    snackbar.show = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.map-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.contact-info {
  margin-bottom: 16px;
}
</style>