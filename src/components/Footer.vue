<template>
  <v-footer class="footer-container bg-dark">
    <v-container>
      <v-row>
        <!-- Sobre Nosotros -->
        <v-col cols="12" md="3" class="mb-4">
          <h3 class="text-h6 font-weight-bold mb-4 text-white">Sobre Nosotros</h3>
          <p class="text-body-2 text-grey-lighten-1 mb-4">
            Especialistas en ferretería con más de 20 años conformando productos para lo que realmente piden los proyectos.
          </p>
          <div class="d-flex gap-2">
            <v-btn icon variant="text" color="white" aria-label="Facebook">
              <v-icon>fa-brands fa-facebook-f</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" aria-label="Instagram">
              <v-icon>fa-brands fa-instagram</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" aria-label="Twitter">
              <v-icon>fa-brands fa-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" aria-label="YouTube">
              <v-icon>fa-brands fa-youtube</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Enlaces Útiles -->
        <v-col cols="12" md="3" class="mb-4">
          <h3 class="text-h6 font-weight-bold mb-4 text-white">Enlaces Útiles</h3>
          <ul class="footer-links pa-0">
            <li>
              <router-link to="/sobre-nosotros" class="text-decoration-none text-grey-lighten-1">
                Sobre Nosotros
              </router-link>
            </li>
            <li>
              <router-link to="/terminos-condiciones" class="text-decoration-none text-grey-lighten-1">
                Términos y Condiciones
              </router-link>
            </li>
            <li>
              <router-link to="/politica-privacidad" class="text-decoration-none text-grey-lighten-1">
                Política de Privacidad
              </router-link>
            </li>
            <li>
              <router-link to="/politica-devoluciones" class="text-decoration-none text-grey-lighten-1">
                Política de Devoluciones
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- Contacto -->
        <v-col cols="12" md="3" class="mb-4">
          <h3 class="text-h6 font-weight-bold mb-4 text-white">Contacto</h3>
          <ul class="footer-links pa-0">
            <li class="d-flex align-center mb-2">
              <v-icon color="primary" class="mr-2">fa-solid fa-phone</v-icon>
              <span class="text-grey-lighten-1">+56 9 1234 5678</span>
            </li>
            <li class="d-flex align-center mb-2">
              <v-icon color="primary" class="mr-2">fa-solid fa-envelope</v-icon>
              <a href="mailto:contacto@incotex.cl" class="text-decoration-none text-grey-lighten-1">
                contacto@incotex.cl
              </a>
            </li>
            <li class="d-flex align-center mb-2">
              <v-icon color="primary" class="mr-2">fa-solid fa-location-dot</v-icon>
              <span class="text-grey-lighten-1">Av. Principal 123, Santiago</span>
            </li>
            <li class="d-flex align-center mb-2">
              <v-icon color="primary" class="mr-2">fa-solid fa-clock</v-icon>
              <span class="text-grey-lighten-1">Lun - Vie: 9:00 - 18:00</span>
            </li>
          </ul>
        </v-col>

        <!-- Newsletter -->
        <v-col cols="12" md="3" class="mb-4">
          <h3 class="text-h6 font-weight-bold mb-4 text-white">Newsletter</h3>
          <p class="text-body-2 text-grey-lighten-1 mb-4">
            Suscríbete para recibir ofertas exclusivas y novedades sobre nuestros productos en tu correo.
          </p>
          <v-form @submit.prevent="subscribeNewsletter">
            <v-text-field
              v-model="email"
              label="Ingresa tu correo electrónico"
              variant="outlined"
              density="compact"
              bg-color="grey-darken-3"
              color="primary"
              class="mb-3"
            ></v-text-field>
            <v-btn 
              type="submit" 
              color="primary" 
              block
              class="text-none"
            >
              Suscribirse
              <v-icon class="ml-2">fa-solid fa-paper-plane</v-icon>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>

      <v-divider class="my-4 bg-grey-darken-3"></v-divider>

      <div class="d-flex flex-column flex-md-row justify-space-between align-center">
        <div class="text-center text-md-left mb-3 mb-md-0">
          <span class="text-caption text-grey-lighten-1">
            © {{ new Date().getFullYear() }} Incotex - Todos los derechos reservados
          </span>
        </div>
        <div class="d-flex justify-center">
          <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png" alt="Visa" height="24" width="40" class="mx-1"></v-img>
          <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" height="24" width="40" class="mx-1"></v-img>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

const subscribeNewsletter = () => {
  // Aquí iría la lógica para suscribir al newsletter
  console.log('Suscrito:', email.value);
  email.value = '';
  // Mostrar mensaje de éxito o error
};
</script>

<style scoped>
.footer-container {
  background-color: #1E2530 !important;
  color: #fff;
  padding-top: 3rem;
  padding-bottom: 1rem;
}

.footer-links {
  list-style-type: none;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #1867C0 !important;
}

.v-btn.v-btn--icon {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-btn.v-btn--icon:hover {
  background-color: #1867C0;
}
</style>