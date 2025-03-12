<template>
    <div class="login-page">
      <v-container class="h-100">
        <v-row class="h-100 align-center justify-center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="mx-auto pa-6 rounded-lg" elevation="8">
              <div class="text-center mb-6">
                <h1 class="text-h4 font-weight-bold mb-2">Iniciar Sesión</h1>
                <p class="text-subtitle-1">Accede a tu cuenta para continuar</p>
              </div>
  
              <v-form ref="form" v-model="isFormValid" @submit.prevent="handleLogin">
                <!-- Email -->
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Correo electrónico"
                  prepend-inner-icon="fa-solid fa-envelope"
                  variant="outlined"
                  required
                  class="mb-3"
                ></v-text-field>
  
                <!-- Password -->
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                  prepend-inner-icon="fa-solid fa-lock"
                  variant="outlined"
                  required
                  class="mb-2"
                  :append-inner-icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
  
                <!-- Remember me & Forgot password -->
                <div class="d-flex justify-space-between align-center mb-6">
                  <v-checkbox
                    v-model="rememberMe"
                    label="Recordarme"
                    density="compact"
                    hide-details
                  ></v-checkbox>
                  <v-btn
                    variant="text"
                    color="primary"
                    density="compact"
                    to="/restablecer-contrasena"
                    class="text-body-2"
                  >
                    ¿Olvidaste tu contraseña?
                  </v-btn>
                </div>
  
                <!-- Login button -->
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  :loading="loading"
                  :disabled="!isFormValid || loading"
                >
                  Iniciar Sesión
                </v-btn>
  
                <!-- Divider -->
                <div class="my-6 position-relative">
                  <div class="divider-text">o continúa con</div>
                </div>
  
                <!-- Social login buttons -->
                <div class="d-flex gap-2 mb-6">
                  <v-btn
                    variant="outlined"
                    prepend-icon="fa-brands fa-google"
                    block
                    @click="handleSocialLogin('google')"
                    :loading="socialLoading === 'google'"
                  >
                    Google
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    prepend-icon="fa-brands fa-facebook"
                    block
                    @click="handleSocialLogin('facebook')"
                    :loading="socialLoading === 'facebook'"
                  >
                    Facebook
                  </v-btn>
                </div>
  
                <!-- Register link -->
                <div class="text-center">
                  <span class="text-body-2">¿No tienes una cuenta?</span>
                  <v-btn
                    variant="text"
                    color="primary"
                    to="/registro"
                    class="text-body-2 font-weight-bold"
                  >
                    Regístrate
                  </v-btn>
                </div>
              </v-form>
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
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  // Aquí importaríamos el servicio de autenticación cuando esté implementado
  // import { authService } from '@/services/authService';
  
  const router = useRouter();
  
  // Estado del formulario
  const form = ref(null);
  const isFormValid = ref(false);
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  const showPassword = ref(false);
  const loading = ref(false);
  const socialLoading = ref(null);
  
  // Reglas de validación
  const emailRules = [
    v => !!v || 'El correo electrónico es requerido',
    v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
  ];
  
  const passwordRules = [
    v => !!v || 'La contraseña es requerida',
    v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
  ];
  
  // Snackbar para mensajes
  const snackbar = reactive({
    show: false,
    text: '',
    color: 'success',
    timeout: 3000
  });
  
  // Método para iniciar sesión
  const handleLogin = async () => {
    if (!isFormValid.value) return;
    
    loading.value = true;
    
    try {
      // Aquí iría la llamada al servicio de autenticación
      // const response = await authService.login(email.value, password.value, rememberMe.value);
      
      // Simulamos un retraso para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos un inicio de sesión exitoso
      showMessage('Inicio de sesión exitoso', 'success');
      
      // Redirigir al usuario a la página principal o a la página a la que intentaba acceder
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
      showMessage('Credenciales incorrectas. Por favor, intenta nuevamente.', 'error');
    } finally {
      loading.value = false;
    }
  };
  
  // Método para iniciar sesión con redes sociales
  const handleSocialLogin = async (provider) => {
    socialLoading.value = provider;
    
    try {
      // Aquí iría la llamada al servicio de autenticación para el proveedor social
      // const response = await authService.socialLogin(provider);
      
      // Simulamos un retraso para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos un inicio de sesión exitoso
      showMessage(`Inicio de sesión con ${provider} exitoso`, 'success');
      
      // Redirigir al usuario a la página principal
      router.push('/');
    } catch (error) {
      console.error(`Error during ${provider} login:`, error);
      showMessage(`Error al iniciar sesión con ${provider}. Por favor, intenta nuevamente.`, 'error');
    } finally {
      socialLoading.value = null;
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
  .login-page {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 40px 0;
  }
  
  .h-100 {
    height: 100%;
  }
  
  .divider-text {
    position: relative;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .divider-text::before,
  .divider-text::after {
    content: "";
    position: absolute;
    top: 50%;
    width: calc(50% - 70px);
    height: 1px;
    background-color: rgba(0, 0, 0, 0.12);
  }
  
  .divider-text::before {
    left: 0;
  }
  
  .divider-text::after {
    right: 0;
  }
  
  .gap-2 {
    gap: 8px;
  }
  
  @media (max-width: 600px) {
    .login-page {
      padding: 20px 0;
    }
  }
  </style>