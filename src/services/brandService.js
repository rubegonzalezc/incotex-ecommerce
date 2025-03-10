const API_BASE_URL = 'your-api-base-url'

export const brandService = {
  async getBrands() {
    try {
      const response = await fetch(`${API_BASE_URL}/brands`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching brands:', error)
      throw error
    }
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