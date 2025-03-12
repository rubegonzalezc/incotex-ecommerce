<template>
  <div class="admin-user-list">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <h1 class="text-h4 font-weight-bold">Gestión de Usuarios</h1>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="fa-solid fa-plus"
            @click="openUserDialog()"
          >
            Nuevo Usuario
          </v-btn>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" rounded="lg">
            <v-card-text class="pa-4">
              <!-- Filtros y búsqueda -->
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="searchQuery"
                    label="Buscar usuarios"
                    prepend-inner-icon="fa-solid fa-search"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="roleFilter"
                    label="Filtrar por rol"
                    :items="roles"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="sortBy"
                    label="Ordenar por"
                    :items="sortOptions"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-4"
                    @update:model-value="applyFilters"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" sm="2">
                  <v-btn
                    color="grey-darken-1"
                    variant="outlined"
                    block
                    @click="resetFilters"
                  >
                    Limpiar filtros
                  </v-btn>
                </v-col>
              </v-row>
              
              <!-- Tabla de usuarios -->
              <v-data-table
                :headers="headers"
                :items="users"
                :loading="loading"
                :items-per-page="10"
                :items-per-page-options="[10, 20, 50]"
                class="mt-4"
              >
                <!-- Columna de avatar -->
                <template v-slot:item.avatar="{ item }">
                  <v-avatar color="grey-lighten-1" size="40">
                    <v-img v-if="item.avatar" :src="item.avatar" cover></v-img>
                    <v-icon v-else icon="fa-solid fa-user" color="white"></v-icon>
                  </v-avatar>
                </template>
                
                <!-- Columna de rol -->
                <template v-slot:item.role="{ item }">
                  <v-chip
                    :color="getRoleColor(item.role)"
                    size="small"
                    class="text-caption"
                  >
                    {{ item.role }}
                  </v-chip>
                </template>
                
                <!-- Columna de estado -->
                <template v-slot:item.active="{ item }">
                  <v-chip
                    :color="item.active ? 'success' : 'error'"
                    size="small"
                    class="text-caption"
                  >
                    {{ item.active ? 'Activo' : 'Inactivo' }}
                  </v-chip>
                </template>
                
                <!-- Columna de acciones -->
                <template v-slot:item.actions="{ item }">
                  <div class="d-flex">
                    <v-btn
                      icon
                      variant="text"
                      density="compact"
                      color="primary"
                      class="mr-2"
                      @click="openUserDialog(item)"
                    >
                      <v-icon icon="fa-solid fa-pen-to-square"></v-icon>
                    </v-btn>
                    
                    <v-btn
                      icon
                      variant="text"
                      density="compact"
                      :color="item.active ? 'error' : 'success'"
                      @click="toggleUserStatus(item)"
                    >
                      <v-icon :icon="item.active ? 'fa-solid fa-ban' : 'fa-solid fa-check'"></v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Diálogo para crear/editar usuario -->
    <v-dialog v-model="userDialog" max-width="600">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
        </v-card-title>
        
        <v-divider></v-divider>
        
        <v-card-text class="pa-4">
          <v-form ref="form" @submit.prevent="saveUser">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.firstName"
                  label="Nombre"
                  variant="outlined"
                  :rules="[v => !!v || 'El nombre es obligatorio']"
                  required
                  class="mb-4"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.lastName"
                  label="Apellido"
                  variant="outlined"
                  :rules="[v => !!v || 'El apellido es obligatorio']"
                  required
                  class="mb-4"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.email"
                  label="Correo electrónico"
                  variant="outlined"
                  type="email"
                  :rules="[
                    v => !!v || 'El correo es obligatorio',
                    v => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
                  ]"
                  required
                  class="mb-4"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.phone"
                  label="Teléfono"
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedUser.role"
                  label="Rol"
                  :items="roles"
                  variant="outlined"
                  :rules="[v => !!v || 'El rol es obligatorio']"
                  required
                  class="mb-4"
                ></v-select>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-switch
                  v-model="editedUser.active"
                  label="Usuario activo"
                  color="success"
                  hide-details
                  class="mb-4"
                ></v-switch>
              </v-col>
            </v-row>
            
            <v-divider class="my-4"></v-divider>
            
            <v-row v-if="!isEditing">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedUser.password"
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  :rules="[v => !!v || 'La contraseña es obligatoria']"
                  required
                  class="mb-4"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="passwordConfirm"
                  label="Confirmar contraseña"
                  variant="outlined"
                  type="password"
                  :rules="[
                    v => !!v || 'La confirmación es obligatoria',
                    v => v === editedUser.password || 'Las contraseñas no coinciden'
                  ]"
                  required
                  class="mb-4"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row v-else>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  variant="text"
                  prepend-icon="fa-solid fa-key"
                  @click="resetPasswordDialog = true"
                  class="mb-4"
                >
                  Restablecer contraseña
                </v-btn>
              </v-col>
            </v-row>
            
            <v-divider class="my-4"></v-divider>
            
            <div class="d-flex flex-column align-center mb-4">
              <v-avatar color="grey-lighten-1" size="100" class="mb-4">
                <v-img v-if="editedUser.avatar" :src="editedUser.avatar" cover></v-img>
                <v-icon v-else icon="fa-solid fa-user" size="x-large" color="white"></v-icon>
              </v-avatar>
              
              <v-file-input
                v-model="avatarFile"
                label="Imagen de perfil"
                variant="outlined"
                accept="image/*"
                prepend-icon="fa-solid fa-upload"
                density="compact"
                hide-details
                @change="handleAvatarUpload"
              ></v-file-input>
            </div>
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="userDialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="saveUser">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Diálogo para restablecer contraseña -->
    <v-dialog v-model="resetPasswordDialog" max-width="500">
      <v-card>
        <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
          Restablecer contraseña
        </v-card-title>
        
        <v-divider></v-divider>
        
        <v-card-text class="pa-4">
          <v-form ref="resetPasswordForm" @submit.prevent="resetPassword">
            <v-text-field
              v-model="newPassword"
              label="Nueva contraseña"
              variant="outlined"
              type="password"
              :rules="[v => !!v || 'La contraseña es obligatoria']"
              required
              class="mb-4"
            ></v-text-field>
            
            <v-text-field
              v-model="newPasswordConfirm"
              label="Confirmar nueva contraseña"
              variant="outlined"
              type="password"
              :rules="[
                v => !!v || 'La confirmación es obligatoria',
                v => v === newPassword || 'Las contraseñas no coinciden'
              ]"
              required
              class="mb-4"
            ></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="resetPasswordDialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="resetPassword">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userService } from '@/services/userService';

// Estado para usuarios y filtros
const users = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const roleFilter = ref('');
const sortBy = ref('name_asc');

// Estado para diálogos
const userDialog = ref(false);
const resetPasswordDialog = ref(false);
const editedUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'user',
  active: true,
  avatar: ''
});
const isEditing = ref(false);
const avatarFile = ref(null);
const passwordConfirm = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');

// Roles disponibles
const roles = [
  { title: 'Todos los roles', value: '' },
  { title: 'Administrador', value: 'admin' },
  { title: 'Usuario', value: 'user' },
  { title: 'Vendedor', value: 'seller' }
];

// Opciones de ordenamiento
const sortOptions = [
  { title: 'Nombre (A-Z)', value: 'name_asc' },
  { title: 'Nombre (Z-A)', value: 'name_desc' },
  { title: 'Email (A-Z)', value: 'email_asc' },
  { title: 'Email (Z-A)', value: 'email_desc' },
  { title: 'Más recientes', value: 'date_desc' },
  { title: 'Más antiguos', value: 'date_asc' }
];

// Encabezados de la tabla
const headers = [
  { title: 'Avatar', key: 'avatar', sortable: false },
  { title: 'Nombre', key: 'fullName', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Teléfono', key: 'phone', sortable: false },
  { title: 'Rol', key: 'role', sortable: true },
  { title: 'Estado', key: 'active', sortable: true },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'end' }
];

// Obtener color según rol
const getRoleColor = (role) => {
  switch (role) {
    case 'admin':
      return 'error';
    case 'seller':
      return 'warning';
    case 'user':
      return 'primary';
    default:
      return 'grey';
  }
};

// Cargar usuarios
const loadUsers = async () => {
  loading.value = true;
  try {
    // Construir parámetros de filtro
    const params = {};
    
    if (searchQuery.value) {
      params.search = searchQuery.value;
    }
    
    if (roleFilter.value) {
      params.role = roleFilter.value;
    }
    
    // Manejar ordenamiento
    if (sortBy.value) {
      const [field, direction] = sortBy.value.split('_');
      params.sort = `${field}:${direction}`;
    }
    
    const data = await userService.getUsers(params);
    users.value = data.map(user => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`
    }));
  } catch (error) {
    console.error('Error loading users:', error);
    // Mostrar notificación de error
  } finally {
    loading.value = false;
  }
};

// Aplicar filtros
const applyFilters = () => {
  loadUsers();
};

// Resetear filtros
const resetFilters = () => {
  searchQuery.value = '';
  roleFilter.value = '';
  sortBy.value = 'name_asc';
  loadUsers();
};

// Abrir diálogo para crear/editar usuario
const openUserDialog = (user = null) => {
  if (user) {
    // Editar usuario existente
    editedUser.value = { ...user };
    isEditing.value = true;
  } else {
    // Nuevo usuario
    editedUser.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'user',
      active: true,
      avatar: '',
      password: ''
    };
    passwordConfirm.value = '';
    isEditing.value = false;
  }
  
  avatarFile.value = null;
  userDialog.value = true;
};

// Manejar carga de avatar
const handleAvatarUpload = async () => {
  if (!avatarFile.value) return;
  
  try {
    // En un caso real, aquí subiríamos la imagen a un servidor
    // Por ahora, simulamos con URL.createObjectURL
    editedUser.value.avatar = URL.createObjectURL(avatarFile.value);
    
    // Implementación real:
    // const formData = new FormData();
    // formData.append('avatar', avatarFile.value);
    // const response = await fetch(`${API_BASE_URL}/upload`, {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    // editedUser.value.avatar = data.imageUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    // Mostrar notificación de error
  }
};

// Guardar usuario
const saveUser = async () => {
  try {
    if (isEditing.value) {
      await userService.updateUser(editedUser.value.id, editedUser.value);
      
      // Actualizar el usuario en la lista
      const index = users.value.findIndex(u => u.id === editedUser.value.id);
      if (index !== -1) {
        users.value[index] = {
          ...editedUser.value,
          fullName: `${editedUser.value.firstName} ${editedUser.value.lastName}`
        };
      }
    } else {
      const newUser = await userService.createUser(editedUser.value);
      
      // Agregar el nuevo usuario a la lista
      users.value.push({
        ...newUser,
        fullName: `${newUser.firstName} ${newUser.lastName}`
      });
    }
    
    // Cerrar diálogo
    userDialog.value = false;
    
    // Mostrar notificación de éxito
  } catch (error) {
    console.error('Error saving user:', error);
    // Mostrar notificación de error
  }
};

// Cambiar estado del usuario (activar/desactivar)
const toggleUserStatus = async (user) => {
  try {
    const updatedUser = await userService.updateUserStatus(
      user.id, 
      { active: !user.active }
    );
    
    // Actualizar el usuario en la lista
    const index = users.value.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users.value[index].active = updatedUser.active;
    }
    
    // Mostrar notificación de éxito
  } catch (error) {
    console.error('Error toggling user status:', error);
    // Mostrar notificación de error
  }
};

// Restablecer contraseña
const resetPassword = async () => {
  try {
    await userService.resetPassword(
      editedUser.value.id, 
      { password: newPassword.value }
    );
    
    // Cerrar diálogo
    resetPasswordDialog.value = false;
    newPassword.value = '';
    newPasswordConfirm.value = '';
    
    // Mostrar notificación de éxito
  } catch (error) {
    console.error('Error resetting password:', error);
    // Mostrar notificación de error
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.admin-user-list {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;
}

.v-data-table {
  background-color: white;
}
</style>