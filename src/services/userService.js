const API_BASE_URL = 'your-api-base-url';

export const userService = {
  // Admin login
  async adminLogin(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      localStorage.setItem('admin_token', data.token);
      return data;
    } catch (error) {
      console.error('Error during admin login:', error);
      throw error;
    }
  },
  
  // Admin logout
  adminLogout() {
    localStorage.removeItem('admin_token');
    return true;
  },
  
  // Check if admin is logged in
  isAdminLoggedIn() {
    return !!localStorage.getItem('admin_token');
  },
  
  // Get all users (admin only)
  async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  // Get user by ID (admin only)
  async getUserById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  },
  
  // Update user (admin only)
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
  },
  
  // Delete user (admin only)
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  },
  // Admin login
  async adminLogin(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      localStorage.setItem('admin_token', data.token);
      return data;
    } catch (error) {
      console.error('Error during admin login:', error);
      throw error;
    }
  },
  
  // Admin logout
  adminLogout() {
    localStorage.removeItem('admin_token');
    return true;
  },
  
  // Check if admin is logged in
  isAdminLoggedIn() {
    return !!localStorage.getItem('admin_token');
  },
  
  // Get all users (admin only)
  async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  // Get user by ID (admin only)
  async getUserById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  },
  
  // Update user (admin only)
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
  },
  
  // Delete user (admin only)
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  }
};



/* Expected API response format for user profile:
{
  id: 1,
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@example.com",
  phone: "+56 9 1234 5678",
  address: "Av. Providencia 1234",
  apartment: "42B",
  comuna: "Providencia",
  region: "Región Metropolitana",
  zipCode: "7500000"
}
*/

/* Expected API response format for user orders:
[
  {
    id: 1,
    number: "10001",
    date: "15/04/2024",
    time: "14:30",
    status: "Entregado",
    items: [
      {
        id: 101,
        name: "Taladro Percutor Inalámbrico DeWalt",
        price: 129990,
        quantity: 1,
        image: "https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg"
      },
      {
        id: 102,
        name: "Set de Brocas DeWalt",
        price: 24990,
        quantity: 2,
        image: "https://m.media-amazon.com/images/I/71Qjg8M+zcL._AC_SL1500_.jpg"
      }
    ],
    subtotal: 179970,
    shipping: 5000,
    tax: 34294,
    total: 219264,
    paymentMethod: "Tarjeta de crédito",
    shippingAddress: {
      name: "Juan Pérez",
      street: "Av. Providencia 1234",
      apartment: "42B",
      comuna: "Providencia",
      region: "Región Metropolitana",
      phone: "+56 9 1234 5678"
    }
  },
  // ... more orders
]
*/