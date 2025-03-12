import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

const routes = [
  // Rutas públicas
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/index.vue')
      },
      {
        path: 'carrito',
        name: 'cart',
        component: () => import('@/pages/carrito/index.vue')
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('@/pages/checkout/index.vue')
      },
      {
        path: 'productos',
        name: 'productos',
        component: () => import('@/pages/productos/index.vue')
      },
      {
        path: 'productos/:id',
        name: 'product-detail',
        component: () => import('@/pages/productos/[id].vue')
      },
      {
        path: 'ofertas',
        name: 'ofertas',
        component: () => import('@/pages/ofertas.vue')
      },
      // Nuevas rutas públicas
      {
        path: 'mi-cuenta',
        name: 'account',
        component: () => import('@/pages/mi-cuenta/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'sobre-nosotros',
        name: 'about',
        component: () => import('@/pages/sobre-nosotros.vue')
      },
      {
        path: 'contacto',
        name: 'contact',
        component: () => import('@/pages/contacto.vue')
      },
    ]
  },
  
  // Rutas de administración
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/Admin/AdminDashboard.vue')
      },
      {
        path: 'productos',
        name: 'admin-products',
        component: () => import('@/views/Admin/AdminProductList.vue')
      },
      {
        path: 'productos/nuevo',
        name: 'admin-product-new',
        component: () => import('@/views/Admin/AdminProductForm.vue')
      },
      {
        path: 'productos/:id',
        name: 'admin-product-edit',
        component: () => import('@/views/Admin/AdminProductForm.vue'),
        props: true
      },
      {
        path: 'categorias',
        name: 'admin-categories',
        component: () => import('@/views/Admin/AdminCategoryList.vue')
      },
      {
        path: 'pedidos',
        name: 'admin-orders',
        component: () => import('@/views/Admin/AdminOrderList.vue')
      },
      {
        path: 'usuarios',
        name: 'admin-users',
        component: () => import('@/views/Admin/AdminUserList.vue')
      },
      {
        path: 'configuracion',
        name: 'admin-settings',
        component: () => import('@/views/Admin/AdminSettings.vue')
      }
    ]
  },
  
  // Ruta de login
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
  
  // Ruta de registro
  {
    path: '/registro',
    name: 'register',
    component: () => import('@/pages/registro.vue')
  },
  
  // Ruta de recuperación de contraseña
  {
    path: '/restablecer-contrasena',
    name: 'password-recovery',
    component: () => import('@/pages/restablecer-contrasena.vue')
  },
  
  // Ruta 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Guardia de navegación para proteger rutas de administración
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;
  const isAdmin = user && user.role === 'admin';
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } });
    } else if (to.matched.some(record => record.meta.isAdmin) && !isAdmin) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
