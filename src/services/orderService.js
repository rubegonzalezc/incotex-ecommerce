// API base URL - adjust this to match your backend API endpoint
const API_BASE_URL = 'https://api.example.com/api';

/**
 * Service for handling order-related API requests
 */
export const orderService = {
  /**
   * Get all orders with optional filtering
   * @param {Object} params - Query parameters for filtering orders
   * @returns {Promise<Object>} - Promise with orders data
   */
  async getOrders(params = {}) {
    try {
      // Construct the URL with query parameters
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.status) queryParams.append('status', params.status);
      if (params.payment) queryParams.append('payment', params.payment);
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const url = `${API_BASE_URL}/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
  
  /**
   * Get a single order by ID
   * @param {string|number} id - Order ID
   * @returns {Promise<Object>} - Promise with order data
   */
  async getOrderById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Update the status of an order
   * @param {string|number} id - Order ID
   * @param {Object} data - Status update data
   * @returns {Promise<Object>} - Promise with updated order data
   */
  async updateOrderStatus(id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating order ${id} status:`, error);
      throw error;
    }
  },
  
  /**
   * Export orders to CSV or other format
   * @param {Object} params - Filter parameters for export
   * @returns {Promise<Blob>} - Promise with file blob
   */
  async exportOrders(params = {}) {
    try {
      // Construct the URL with query parameters
      const queryParams = new URLSearchParams();
      
      if (params.status) queryParams.append('status', params.status);
      if (params.payment) queryParams.append('payment', params.payment);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.format) queryParams.append('format', params.format);
      
      const url = `${API_BASE_URL}/orders/export${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error exporting orders:', error);
      throw error;
    }
  },
  
  /**
   * Generate invoice for an order
   * @param {string|number} id - Order ID
   * @returns {Promise<Blob>} - Promise with PDF blob
   */
  async generateInvoice(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}/invoice`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.blob();
    } catch (error) {
      console.error(`Error generating invoice for order ${id}:`, error);
      throw error;
    }
  }
};