const API_BASE_URL = 'your-api-base-url'

export const bannerService = {
  async getBanners() {
    try {
      const response = await fetch(`${API_BASE_URL}/banners`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching banners:', error)
      throw error
    }
  }
}