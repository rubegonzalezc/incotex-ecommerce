const API_BASE_URL = 'your-api-base-url'

export const brandService = {
  async getBrands() {
    try {
      // For development, return default data until API is ready
      return this.getDefaultBrands()
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/brands`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
      */
    } catch (error) {
      console.error('Error fetching brands:', error)
      return this.getDefaultBrands()
    }
  },

  // Default data for brands
  getDefaultBrands() {
    return [
      { id: 1, name: 'DeWalt', count: 28, logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/DeWalt_Logo.svg' },
      { id: 2, name: 'Bosch', count: 35, logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Bosch-logo.svg' },
      { id: 3, name: 'Makita', count: 22, logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makita_Logo.svg' },
      { id: 4, name: 'Stanley', count: 19, logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Stanley_Hand_Tools_logo.svg' },
      { id: 5, name: 'Black & Decker', count: 24, logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Black_and_Decker_logo.svg' },
      { id: 6, name: 'Milwaukee', count: 17, logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Milwaukee_Logo.svg' },
      { id: 7, name: 'Truper', count: 31, logo: 'https://www.truper.com/images/truper-logo.png' },
      { id: 8, name: 'Hilti', count: 12, logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Hilti_logo.svg' }
    ]
  }
}

/* Expected API response format for brands:
[
  {
    id: 1,
    name: "DeWalt",
    logo: "https://example.com/images/brands/dewalt.png"
  },
  {
    id: 2,
    name: "Bosch",
    logo: "https://example.com/images/brands/bosch.png"
  },
  // etc.
]
*/

/*
Para las imágenes de las marcas, recomiendo:

- Ancho: 200-300px
- Alto: 60-80px
- Formato: PNG con fondo transparente
- Resolución: 72-96 DPI
- Tamaño máximo: 50KB
*/