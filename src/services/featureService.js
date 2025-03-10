const API_BASE_URL = 'your-api-base-url'

export const featureService = {
  async getFeatures() {
    try {
      const response = await fetch(`${API_BASE_URL}/features`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching features:', error)
      throw error
    }
  }
}

/* Respuesta de la API
[
  {
    icon: 'fa-solid fa-truck',
    title: 'Envío Gratis',
    description: 'En compras sobre $50.000'
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Compra Segura',
    description: 'Pago 100% seguro'
  },
  {
    icon: 'fa-solid fa-medal',
    title: 'Garantía',
    description: '30 días de garantía'
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Soporte 24/7',
    description: 'Atención personalizada'
  }
]
*/