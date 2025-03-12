<template>
  <div class="about-page">
    <v-container class="py-8">
      <!-- Breadcrumbs -->
      <v-breadcrumbs :items="breadcrumbs" class="px-0 py-2 mb-4 text-dark">
        <template v-slot:divider>
          <v-icon icon="fa-solid fa-chevron-right" size="small"></v-icon>
        </template>
      </v-breadcrumbs>

      <!-- Título de la página -->
      <div class="mb-8">
        <h1 class="text-h3 font-weight-bold mb-2 text-dark">Sobre Nosotros</h1>
        <p class="text-subtitle-1 text-dark">
          Conoce nuestra historia y nuestro compromiso con la calidad
        </p>
      </div>

      <!-- Sección de historia -->
      <v-card class="mb-8 bg-white">
        <v-card-text class="pa-6">
          <div class="d-flex flex-column flex-md-row">
            <div class="flex-grow-1 pr-md-6">
              <h2 class="text-h4 font-weight-bold mb-4 text-primary">Nuestra Historia</h2>
              <p class="text-body-1 mb-4 text-dark">
                Fundada en 2010, Incotex nació con la visión de transformar la manera en que las empresas adquieren sus productos de oficina y tecnología. Lo que comenzó como una pequeña tienda en Santiago, ha crecido hasta convertirse en uno de los líderes del mercado en Chile.
              </p>
              <p class="text-body-1 mb-4 text-dark">
                A lo largo de los años, hemos expandido nuestra oferta de productos y servicios para satisfacer las necesidades cambiantes de nuestros clientes. Nuestra dedicación a la excelencia y al servicio al cliente nos ha permitido establecer relaciones duraderas con empresas de todos los tamaños.
              </p>
              <p class="text-body-1 text-dark">
                Hoy, con más de una década de experiencia, seguimos comprometidos con nuestra misión original: proporcionar soluciones de calidad que ayuden a nuestros clientes a alcanzar sus objetivos comerciales.
              </p>
            </div>
            <div class="about-image-container mt-6 mt-md-0">
              <v-img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                height="300"
                width="100%"
                cover
                class="rounded-lg"
              ></v-img>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Misión y Visión -->
      <v-row class="mb-8">
        <v-col cols="12" md="6">
          <v-card height="100%" class="bg-white">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-icon icon="fa-solid fa-bullseye" size="x-large" color="primary" class="mr-4"></v-icon>
                <h2 class="text-h5 font-weight-bold text-dark">Nuestra Misión</h2>
              </div>
              <p class="text-body-1 text-dark">
                Proporcionar soluciones integrales de alta calidad para empresas de todos los tamaños, facilitando su operación diaria y contribuyendo a su crecimiento a través de productos innovadores y un servicio excepcional.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card height="100%" class="bg-white">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-icon icon="fa-solid fa-eye" size="x-large" color="primary" class="mr-4"></v-icon>
                <h2 class="text-h5 font-weight-bold text-dark">Nuestra Visión</h2>
              </div>
              <p class="text-body-1 text-dark">
                Ser reconocidos como el socio preferido de las empresas chilenas en la provisión de productos y servicios, destacándonos por nuestra innovación, calidad y compromiso con la satisfacción del cliente.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Valores -->
      <v-card class="mb-8 bg-white">
        <v-card-text class="pa-6">
          <h2 class="text-h4 font-weight-bold mb-6 text-primary text-center">Nuestros Valores</h2>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <div class="text-center">
                <v-icon icon="fa-solid fa-handshake" size="x-large" color="primary" class="mb-4"></v-icon>
                <h3 class="text-h6 font-weight-bold mb-2 text-dark">Integridad</h3>
                <p class="text-body-2 text-dark">
                  Actuamos con honestidad y transparencia en todas nuestras relaciones comerciales.
                </p>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <div class="text-center">
                <v-icon icon="fa-solid fa-star" size="x-large" color="primary" class="mb-4"></v-icon>
                <h3 class="text-h6 font-weight-bold mb-2 text-dark">Excelencia</h3>
                <p class="text-body-2 text-dark">
                  Nos esforzamos por superar las expectativas en todo lo que hacemos.
                </p>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <div class="text-center">
                <v-icon icon="fa-solid fa-lightbulb" size="x-large" color="primary" class="mb-4"></v-icon>
                <h3 class="text-h6 font-weight-bold mb-2 text-dark">Innovación</h3>
                <p class="text-body-2 text-dark">
                  Buscamos constantemente nuevas formas de mejorar nuestros productos y servicios.
                </p>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <div class="text-center">
                <v-icon icon="fa-solid fa-users" size="x-large" color="primary" class="mb-4"></v-icon>
                <h3 class="text-h6 font-weight-bold mb-2 text-dark">Trabajo en equipo</h3>
                <p class="text-body-2 text-dark">
                  Colaboramos para lograr objetivos comunes y brindar el mejor servicio.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Equipo -->
      <v-card class="mb-8 bg-white">
        <v-card-text class="pa-6">
          <h2 class="text-h4 font-weight-bold mb-6 text-primary text-center">Nuestro Equipo</h2>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="(member, index) in teamMembers" :key="index">
              <v-card class="team-card" elevation="0">
                <v-img
                  :src="member.image"
                  height="250"
                  cover
                  class="rounded-lg mb-4"
                ></v-img>
                <h3 class="text-h6 font-weight-bold mb-1 text-dark">{{ member.name }}</h3>
                <p class="text-subtitle-2 mb-2 text-primary">{{ member.position }}</p>
                <p class="text-body-2 text-dark">{{ member.description }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Contacto CTA -->
      <v-card class="bg-primary text-white">
        <v-card-text class="pa-6 text-center">
          <h2 class="text-h4 font-weight-bold mb-4">¿Quieres saber más sobre nosotros?</h2>
          <p class="text-body-1 mb-6">
            Estamos aquí para responder a todas tus preguntas y ayudarte a encontrar las soluciones que necesitas.
          </p>
          <v-btn
            color="white"
            variant="outlined"
            size="large"
            to="/contacto"
            class="text-white"
          >
            Contáctanos
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    title: 'Sobre Nosotros',
    disabled: true,
  },
];

// Datos del equipo
const teamMembers = ref([
  {
    name: 'Carlos Rodríguez',
    position: 'Director General',
    description: 'Con más de 15 años de experiencia en el sector, Carlos ha liderado la transformación de Incotex desde sus inicios.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'María González',
    position: 'Directora de Operaciones',
    description: 'María supervisa todas las operaciones diarias, asegurando que nuestros clientes reciban productos de calidad a tiempo.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Javier Méndez',
    position: 'Director de Tecnología',
    description: 'Javier lidera nuestras iniciativas tecnológicas, manteniendo nuestra plataforma a la vanguardia del comercio electrónico.',
    image: 'https://randomuser.me/api/portraits/men/68.jpg',
  },
]);
</script>

<style scoped>
.about-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.text-dark {
  color: rgba(0, 0, 0, 0.87) !important;
}

.team-card {
  height: 100%;
  transition: transform 0.3s;
}

.team-card:hover {
  transform: translateY(-5px);
}

@media (max-width: 960px) {
  .about-image-container {
    max-width: 100%;
  }
}
</style>