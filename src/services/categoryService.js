const API_BASE_URL = 'your-api-base-url'

export const categoryService = {
  async getPopularCategories() {
    try {
      // For development, just return default data until API is ready
      return this.getDefaultPopularCategories()
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/categories/popular`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
      */
    } catch (error) {
      console.error('Error fetching popular categories:', error)
      return this.getDefaultPopularCategories()
    }
  },
  
  async getAllCategories() {
    try {
      // For development, just return default data until API is ready
      return this.getDefaultCategories()
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/categories`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
      */
    } catch (error) {
      console.error('Error fetching all categories:', error)
      return this.getDefaultCategories()
    }
  },

  async getCategories() {
    try {
      // For development, just return default data until API is ready
      return this.getDefaultCategories()
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/categories`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
      */
    } catch (error) {
      console.error('Error fetching categories:', error)
      return this.getDefaultCategories()
    }
  },

  // Default data for popular categories
  getDefaultPopularCategories() {
    return [
      {
        name: 'Herramientas',
        image: 'https://picsum.photos/id/101/300/300',
        link: '/categorias/herramientas'
      },
      {
        name: 'Materiales de Construcción',
        image: 'https://picsum.photos/id/102/300/300',
        link: '/categorias/materiales-construccion'
      },
      {
        name: 'Electricidad',
        image: 'https://picsum.photos/id/103/300/300',
        link: '/categorias/electricidad'
      },
      {
        name: 'Ferretería',
        image: 'https://picsum.photos/id/104/300/300',
        link: '/categorias/ferreteria'
      },
      {
        name: 'Pinturas',
        image: 'https://picsum.photos/id/105/300/300',
        link: '/categorias/pinturas'
      },
      {
        name: 'Seguridad Industrial',
        image: 'https://picsum.photos/id/106/300/300',
        link: '/categorias/seguridad-industrial'
      }
    ]
  },

  // Default data for all categories and getCategories method
  getDefaultCategories() {
    return [
      { id: 1, name: 'Herramientas Eléctricas', count: 45 },
      { id: 2, name: 'Herramientas Manuales', count: 32 },
      { id: 3, name: 'Materiales de Construcción', count: 28 },
      { id: 4, name: 'Ferretería', count: 56 },
      { id: 5, name: 'Pinturas y Accesorios', count: 19 },
      { id: 6, name: 'Seguridad Industrial', count: 24 },
      { id: 7, name: 'Electricidad', count: 37 },
      { id: 8, name: 'Plomería', count: 22 }
    ]
  }
}

/* Expected API response format for popular categories:
[
  {
    name: 'Herramientas',
    image: 'https://example.com/images/herramientas.jpg',
    link: '/categorias/herramientas'
  },
  {
    name: 'Materiales de Construcción',
    image: 'https://example.com/images/materiales.jpg',
    link: '/categorias/materiales-construccion'
  },
  {
    name: 'Electricidad',
    image: 'https://example.com/images/electricidad.jpg',
    link: '/categorias/electricidad'
  }
]
*/