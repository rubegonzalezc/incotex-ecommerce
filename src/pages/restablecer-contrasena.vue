<template>
  <div class="reset-password-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <v-row justify="center">
        <v-col cols="12" md="8" lg="5">
          <v-card class="pa-6 rounded-lg">
            <div class="text-center mb-6">
              <v-icon icon="fa-solid fa-key" size="x-large" color="primary" class="mb-4"></v-icon>
              <h1 class="text-h4 font-weight-bold mb-2">Restablecer contraseña</h1>
              <p class="text-subtitle-1">Crea una nueva contraseña para tu cuenta</p>
            </div>

            <div v-if="!isValidToken" class="text-center">
              <v-alert
                type="error"
                variant="tonal"
                class="mb-6"
              >
                El enlace de recuperación no es válido o ha expirado. Por favor, solicita un nuevo enlace.
              </v-alert>
              
              <v-btn
                color="primary"
                to="/recuperar-contrasena"
                class="mt-2"
              >
                Solicitar nuevo enlace
              </v-btn>
            </div>

            <v-form ref="form" v-model="valid" @submit.prevent="resetPassword" v-if="isValidToken && !passwordReset">
              <v-text-field
                v-model="formData.password"
                label="Nueva contraseña"
                variant="outlined"
                :rules="passwordRules"
                required
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                @click:append-inner="showPassword = !showPassword"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="formData.confirmPassword"
                label="Confirmar contraseña"
                variant="outlined"
                :rules="confirmPasswordRules"
                required
                :type="showConfirmPassword ? 'text' : 'password'"
                :append-inner-icon="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                class="mb-4"
              ></v-text-field>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!valid || loading"
                class="mt-2"
              >
                Cambiar contraseña
              </v-btn>
            </v-form>

            <div v-if="passwordReset" class="text-center">
              <v-icon icon="fa-solid fa-circle-check" size="x-large" color="success" class="mb-4"></v-icon>
              <h2 class="text-h5 font-weight-bold mb-2">¡Contraseña actualizada!</h2>
              <p class="mb-6">Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.</p>
              
              <v-btn
                color="primary"
                to="/login"
                class="mt-2"
              >
                Iniciar sesión
              </v-btn>
            </div>

            <v-divider class="my-6" v-if="isValidToken"></v-divider>

            <div class="text-center" v-if="isValidToken">
              <p>
                ¿Necesitas ayuda?
                <router-link to="/contacto" class="text-primary font-weight-medium">Contáctanos</router-link>
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    title: 'Restablecer contraseña',
    disabled: true,
  },
];

// Estado del formulario
const form = ref(null);
const valid = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isValidToken = ref(true); // Por defecto asumimos que el token es válido
const passwordReset = ref(false);

// Datos del formulario
const formData = reactive({
  password: '',
  confirmPassword: '',
  token: '',
});

// Reglas de validación
const passwordRules = [
  v => !!v || 'La contraseña es requerida',
  v => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
  v => /[A-Z]/.test(v) || 'La contraseña debe contener al menos una letra mayúscula',
  v => /[0-9]/.test(v) || 'La contraseña debe contener al menos un número',
];

const confirmPasswordRules = [
  v => !!v || 'Confirma tu contraseña',
  v => v === formData.password || 'Las contraseñas no coinciden',
];

// Snackbar para mensajes
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000,
});

// Verificar token al montar el componente
onMounted(async () => {
  const token = route.query.token;
  
  if (!token) {
    isValidToken.value = false;
    return;
  }
  
  formData.token = token;
  
  try {
    // Aquí iría la lógica para verificar el token con el backend
    // Por ahora simulamos una verificación
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Para simular un token inválido, descomentar la siguiente línea:
    // isValidToken.value = false;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    isValidToken.value = false;
  }
});

// Método para restablecer la contraseña
const resetPassword = async () => {
  if (!form.value.validate()) return;
  
  loading.value = true;
  
  try {
    // Aquí iría la lógica para enviar la nueva contraseña al backend
    // Por ahora simulamos una espera
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mostrar mensaje de éxito
    passwordReset.value = true;
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    
    // Mostrar mensaje de error
    snackbar.color = 'error';
    snackbar.text = 'Ocurrió un error al cambiar la contraseña. Por favor, intenta nuevamente.';
    snackbar.show = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.reset-password-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.v-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>