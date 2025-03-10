const API_BASE_URL = 'your-api-base-url'

export const productService = {
  async getFeaturedProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/featured`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching featured products:', error)
      throw error
    }
  },
  
  async getProductsByCategory(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching products by category:', error)
      throw error
    }
  },
  
  async getRecentProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/recent`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching recent products:', error)
      throw error
    }
  },
  async getProducts(params = {}) {
    try {
      // Construir la URL con los parámetros de consulta
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.category) queryParams.append('category', params.category);
      if (params.brand && params.brand.length) queryParams.append('brand', params.brand.join(','));
      if (params.price) queryParams.append('price_min', params.price[0]);
      if (params.price) queryParams.append('price_max', params.price[1]);
      if (params.inStock) queryParams.append('in_stock', params.inStock);
      
      const url = `${API_BASE_URL}/products?${queryParams.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
async getProductById(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
}
}

/* Expected API response format for product details:
{
  id: "dcd778s2t-qw",
  name: "Taladro Percutor Inalámbrico DeWalt DCD778S2T-QW",
  price: 129990,
  originalPrice: 159990,
  image: "https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg",
  images: [
    "https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_1.jpg",
    "https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_2.jpg",
    "https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_3.jpg",
    "https://www.dewalt.es/NA/product/images/3000x3000x96/DCD778S2T-QW/DCD778S2T-QW_4.jpg"
  ],
  rating: 4.8,
  reviewCount: 24,
  badge: "Oferta",
  badgeType: "discount",
  inStock: true,
  description: "Taladro percutor inalámbrico de 18V con 2 baterías de litio de 1.5Ah. Motor sin escobillas que proporciona un 57% más de autonomía. 2 velocidades variables y reversibles (0-600 / 0-2000 rpm). Par máximo de 65 Nm para las aplicaciones más exigentes. Portabrocas metálico de cierre rápido de 13mm. Incluye maletín, cargador y 2 baterías.",
  category: "Herramientas Eléctricas",
  categoryId: 1,
  brand: "DeWalt",
  brandId: 1,
  sku: "DCD778S2T-QW",
  specifications: [
    { name: "Modelo", value: "DCD778S2T-QW" },
    { name: "Voltaje", value: "18V" },
    { name: "Tipo de batería", value: "Li-Ion" },
    { name: "Capacidad de batería", value: "1.5Ah" },
    { name: "Velocidad sin carga", value: "0-600 / 0-2000 rpm" },
    { name: "Par máximo", value: "65 Nm" },
    { name: "Capacidad portabrocas", value: "13mm" },
    { name: "Peso", value: "1.6 kg" },
    { name: "Dimensiones", value: "31 x 21.5 x 7.6 cm" },
    { name: "Garantía", value: "3 años" }
  ],
  features: [
    "Motor sin escobillas para mayor eficiencia y durabilidad",
    "Luz LED para iluminar el área de trabajo",
    "Empuñadura ergonómica con revestimiento de goma",
    "Selector de par con 15 posiciones",
    "Incluye 2 baterías, cargador y maletín de transporte"
  ],
  reviews: [
    {
      id: 1,
      userName: "Cliente 1",
      rating: 5,
      date: "2024-01-15",
      comment: "Excelente herramienta, muy potente y la batería dura bastante."
    },
    {
      id: 2,
      userName: "Cliente 2",
      rating: 4,
      date: "2024-01-10",
      comment: "Muy buena calidad, aunque un poco pesado para trabajos prolongados."
    },
    {
      id: 3,
      userName: "Cliente 3",
      rating: 5,
      date: "2024-01-05",
      comment: "La mejor inversión que he hecho. El maletín es muy práctico."
    }
  ],
  relatedProducts: [
    {
      id: "related-1",
      name: "Batería DeWalt DCB184 18V 5.0Ah",
      price: 49990,
      image: "path/to/battery-image.jpg",
      rating: 4.7,
      reviewCount: 15,
      inStock: true
    },
    // ... more related products
  ]
}
*/
/*
Para este diseño, recomiendo las siguientes dimensiones para las imágenes de productos:

- Ancho : 500px
- Alto : 500px
- Relación de aspecto : 1:1 (cuadrada)
- Formato : JPG o PNG
- Resolución : 72-96 DPI
- Tamaño máximo : 200KB
*/
