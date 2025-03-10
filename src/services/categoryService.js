const API_BASE_URL = 'your-api-base-url'

export const categoryService = {
  async getPopularCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/popular`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching popular categories:', error)
      throw error
    }
  },
  
  async getAllCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching all categories:', error)
      throw error
    }
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