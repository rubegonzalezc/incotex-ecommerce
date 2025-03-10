const API_BASE_URL = 'your-api-base-url';

export const userService = {
  async getUserProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  async updateUserProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
  
  async changePassword(passwordData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(passwordData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
  
  async getUserOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/user/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },
  
  async getOrderDetails(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching order details for order ${orderId}:`, error);
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