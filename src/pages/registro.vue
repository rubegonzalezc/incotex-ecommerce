<template>
  <div class="register-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-6 rounded-lg">
            <div class="text-center mb-6">
              <h1 class="text-h4 font-weight-bold mb-2">Crear cuenta</h1>
              <p class="text-subtitle-1">Regístrate para acceder a ofertas exclusivas y realizar compras más rápido</p>
            </div>

            <v-form ref="form" v-model="valid" @submit.prevent="register">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.firstName"
                    label="Nombre"
                    variant="outlined"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.lastName"
                    label="Apellido"
                    variant="outlined"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.email"
                    label="Correo electrónico"
                    variant="outlined"
                    :rules="emailRules"
                    required
                    type="email"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.phone"
                    label="Teléfono"
                    variant="outlined"
                    :rules="phoneRules"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.password"
                    label="Contraseña"
                    variant="outlined"
                    :rules="passwordRules"
                    required
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                    @click:append-inner="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.confirmPassword"
                    label="Confirmar contraseña"
                    variant="outlined"
                    :rules="confirmPasswordRules"
                    required
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :append-inner-icon="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="formData.termsAccepted"
                    :rules="[v => !!v || 'Debes aceptar los términos y condiciones']"
                    required
                  >
                    <template v-slot:label>
                      <div>
                        Acepto los <router-link to="/terminos-y-condiciones" class="text-primary">términos y condiciones</router-link> y la <router-link to="/politica-de-privacidad" class="text-primary">política de privacidad</router-link>
                      </div>
                    </template>
                  </v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-checkbox v-model="formData.newsletter">
                    <template v-slot:label>
                      <div>Deseo recibir ofertas y novedades por correo electrónico</div>
                    </template>
                  </v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="loading"
                    :disabled="!valid || loading"
                  >
                    Crear cuenta
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>

            <v-divider class="my-6"></v-divider>

            <div class="text-center">
              <p class="mb-4">O regístrate con</p>
              <div class="d-flex justify-center">
                <v-btn
                  variant="outlined"
                  color="primary"
                  class="mx-2"
                  prepend-icon="fa-brands fa-google"
                  @click="socialLogin('google')"
                >
                  Google
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="primary"
                  class="mx-2"
                  prepend-icon="fa-brands fa-facebook"
                  @click="socialLogin('facebook')"
                >
                  Facebook
                </v-btn>
              </div>
            </div>

            <div class="text-center mt-6">
              <p>
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-primary font-weight-medium">Iniciar sesión</router-link>
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
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    title: 'Registro',
    disabled: true,
  },
];

// Estado del formulario
const form = ref(null);
const valid = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Datos del formulario
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
  newsletter: false,
});

// Reglas de validación
const nameRules = [
  v => !!v || 'Este campo es requerido',
  v => v.length >= 2 || 'El nombre debe tener al menos 2 caracteres',
];

const emailRules = [
  v => !!v || 'El correo electrónico es requerido',
  v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
];

const phoneRules = [
  v => !!v || 'El teléfono es requerido',
  v => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(v) || 'El teléfono debe ser válido',
];

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

// Método para registrar usuario
const register = async () => {
  if (!form.value.validate()) return;
  
  loading.value = true;
  
  try {
    // Aquí iría la lógica para registrar al usuario en el backend
    // Por ahora simulamos una espera
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mostrar mensaje de éxito
    snackbar.color = 'success';
    snackbar.text = '¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...';
    snackbar.show = true;
    
    // Redirigir al login después de un breve retraso
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    
    // Mostrar mensaje de error
    snackbar.color = 'error';
    snackbar.text = 'Ocurrió un error al crear la cuenta. Por favor, intenta nuevamente.';
    snackbar.show = true;
  } finally {
    loading.value = false;
  }
};

// Método para login con redes sociales
const socialLogin = async (provider) => {
  loading.value = true;
  
  try {
    // Aquí iría la lógica para autenticar con el proveedor social
    console.log(`Iniciando sesión con ${provider}`);
    
    // Simulamos una espera
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mostrar mensaje de éxito
    snackbar.color = 'success';
    snackbar.text = `Autenticación con ${provider} exitosa. Redirigiendo...`;
    snackbar.show = true;
    
    // Redirigir al home después de un breve retraso
    setTimeout(() => {
      router.push('/');
    }, 1500);
  } catch (error) {
    console.error(`Error al iniciar sesión con ${provider}:`, error);
    
    // Mostrar mensaje de error
    snackbar.color = 'error';
    snackbar.text = `Error al iniciar sesión con ${provider}. Por favor, intenta nuevamente.`;
    snackbar.show = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.v-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>