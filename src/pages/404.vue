<template>
  <div class="not-found-page">
    <v-container class="h-100 d-flex align-center justify-center">
      <v-row>
        <v-col cols="12" class="text-center">
          <div class="error-code">404</div>
          <h1 class="text-h3 font-weight-bold mb-4">Página no encontrada</h1>
          <p class="text-body-1 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <v-btn
            color="primary"
            size="large"
            to="/"
            prepend-icon="fa-solid fa-home"
          >
            Volver al inicio
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// No se requiere lógica adicional para esta página
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: var(--v-primary-base, #1976d2);
  line-height: 1;
  margin-bottom: 24px;
  opacity: 0.8;
}

@media (max-width: 600px) {
  .error-code {
    font-size: 80px;
  }
}
</style>