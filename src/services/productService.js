const API_BASE_URL = 'your-api-base-url';

export const productService = {
  async getFeaturedProducts() {
    try {
      // Return default data for development
      return this.getDefaultFeaturedProducts();
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/products/featured`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
      */
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return this.getDefaultFeaturedProducts();
    }
  },
  
  async getProductsByCategory(categoryId) {
    try {
      // Return default data for development
      return this.getDefaultProductsByCategory(categoryId);
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
      */
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return this.getDefaultProductsByCategory(categoryId);
    }
  },
  
  async getRecentProducts() {
    try {
      // Return default data for development
      return this.getDefaultRecentProducts();
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/products/recent`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
      */
    } catch (error) {
      console.error('Error fetching recent products:', error)
      return this.getDefaultRecentProducts();
    }
  },
  
  async getProducts(params = {}) {
    try {
      // Return default data for development
      return this.getDefaultProducts(params);
      
      /* Uncomment when API is ready
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
      */
    } catch (error) {
      console.error('Error fetching products:', error);
      return this.getDefaultProducts(params);
    }
  },
  
  async getProductById(productId) {
    try {
      // Return default data for development
      return this.getDefaultProductById(productId);
      
      /* Uncomment when API is ready
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
      */
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return this.getDefaultProductById(productId);
    }
  },

  // Add the discounted products method
  async getDiscountedProducts(params = {}) {
    try {
      // Return default data for development
      return this.getDefaultDiscountedProducts(params);
      
      /* Uncomment when API is ready
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.category) queryParams.append('category', params.category);
      if (params.brand && params.brand.length) queryParams.append('brand', params.brand.join(','));
      if (params.price) queryParams.append('price_min', params.price[0]);
      if (params.price) queryParams.append('price_max', params.price[1]);
      
      const url = `${API_BASE_URL}/products/discounted?${queryParams.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
      */
    } catch (error) {
      console.error('Error fetching discounted products:', error);
      return this.getDefaultDiscountedProducts(params);
    }
  },
  
  getDefaultDiscountedProducts(params = {}) {
    // Generar productos de ejemplo con descuento
    const allDiscountedProducts = Array.from({ length: 30 }, (_, i) => {
      const price = Math.floor(Math.random() * 80000) + 10000;
      const originalPrice = price + Math.floor(Math.random() * 50000) + 10000; // Siempre mayor que price
      const discountPercentage = Math.floor((originalPrice - price) / originalPrice * 100);
      
      return {
        id: i + 1000, // IDs diferentes a los productos normales
        name: `Oferta especial ${i + 1}`,
        price: price,
        originalPrice: originalPrice,
        image: `https://picsum.photos/id/${(i % 30) + 150}/500/500`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 100),
        badge: `-${discountPercentage}%`,
        badgeType: 'discount',
        inStock: Math.random() > 0.1, // Mayor probabilidad de estar en stock
        description: 'Producto con descuento especial por tiempo limitado.',
        category: Math.floor(Math.random() * 8) + 1,
        brand: Math.floor(Math.random() * 8) + 1,
        link: `/productos/oferta-${i + 1}`
      };
    });
    
    // Aplicar filtros si existen
    let filteredProducts = [...allDiscountedProducts];
    
    if (params.category) {
      filteredProducts = filteredProducts.filter(p => p.category == params.category);
    }
    
    if (params.brand && params.brand.length) {
      filteredProducts = filteredProducts.filter(p => params.brand.includes(p.brand));
    }
    
    if (params.price) {
      filteredProducts = filteredProducts.filter(
        p => p.price >= params.price[0] && p.price <= params.price[1]
      );
    }
    
    // Ordenar productos
    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'discount_desc':
          filteredProducts.sort((a, b) => {
            const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
            const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
            return discountB - discountA;
          });
          break;
        case 'name_asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case 'popularity':
          filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }
    
    // Paginación
    const page = params.page || 1;
    const limit = params.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      page: page,
      limit: limit
    };
  },  // Añadida la coma que faltaba aquí

  getDefaultFeaturedProducts() {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Producto destacado ${i + 1}`,
      price: Math.floor(Math.random() * 100000) + 10000,
      originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 150000) + 20000 : null,
      image: `https://picsum.photos/id/${(i % 10) + 30}/500/500`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 100),
      badge: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Nuevo' : '-15%') : null,
      badgeType: Math.random() > 0.5 ? 'new' : 'discount',
      inStock: Math.random() > 0.2,
      link: `/productos/producto-destacado-${i + 1}`
    }));
  },

  getDefaultRecentProducts() {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i + 100,
      name: `Producto nuevo ${i + 1}`,
      price: Math.floor(Math.random() * 100000) + 10000,
      originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 150000) + 20000 : null,
      image: `https://picsum.photos/id/${(i % 10) + 40}/500/500`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 100),
      badge: 'Nuevo',
      badgeType: 'new',
      inStock: true,
      link: `/productos/producto-nuevo-${i + 1}`
    }));
  },

  getDefaultProductsByCategory(categoryId) {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 200 + (categoryId * 100),
      name: `Producto categoría ${categoryId} - ${i + 1}`,
      price: Math.floor(Math.random() * 100000) + 10000,
      originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 150000) + 20000 : null,
      image: `https://picsum.photos/id/${(i % 10) + 50 + categoryId}/500/500`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 100),
      badge: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Nuevo' : '-15%') : null,
      badgeType: Math.random() > 0.5 ? 'new' : 'discount',
      inStock: Math.random() > 0.2,
      category: categoryId,
      link: `/productos/categoria-${categoryId}-producto-${i + 1}`
    }));
  },

  getDefaultProducts(params = {}) {
    // Generar productos de ejemplo
    const allProducts = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Producto de ejemplo ${i + 1}`,
      price: Math.floor(Math.random() * 100000) + 10000,
      originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 150000) + 20000 : null,
      image: `https://picsum.photos/id/${(i % 30) + 10}/500/500`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 100),
      badge: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Nuevo' : '-15%') : null,
      badgeType: Math.random() > 0.5 ? 'new' : 'discount',
      inStock: Math.random() > 0.2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      category: Math.floor(Math.random() * 8) + 1, // ID de categoría aleatorio
      brand: Math.floor(Math.random() * 8) + 1, // ID de marca aleatorio
      link: `/productos/producto-ejemplo-${i + 1}`
    }));

    // Aplicar filtros si existen
    let filteredProducts = [...allProducts];
    
    if (params.category) {
      filteredProducts = filteredProducts.filter(p => p.category == params.category);
    }
    
    if (params.brand && params.brand.length) {
      filteredProducts = filteredProducts.filter(p => params.brand.includes(p.brand));
    }
    
    if (params.price) {
      filteredProducts = filteredProducts.filter(
        p => p.price >= params.price[0] && p.price <= params.price[1]
      );
    }
    
    if (params.inStock) {
      filteredProducts = filteredProducts.filter(p => p.inStock);
    }
    
    // Ordenar productos
    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name_asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'newest':
          // Simulamos que los IDs más altos son los más recientes
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case 'popularity':
          filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }
    
    // Paginación
    const page = params.page || 1;
    const limit = params.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      page: page,
      limit: limit
    };
  },

  getDefaultProductById(productId) {
    // Crear un producto detallado de ejemplo basado en el ID
    const id = parseInt(productId) || 1;
    
    return {
      id: id,
      name: `Taladro Percutor Inalámbrico Modelo ${id}`,
      price: 129990,
      originalPrice: 159990,
      image: `https://picsum.photos/id/${(id % 30) + 100}/500/500`,
      images: [
        `https://picsum.photos/id/${(id % 30) + 100}/500/500`,
        `https://picsum.photos/id/${(id % 30) + 101}/500/500`,
        `https://picsum.photos/id/${(id % 30) + 102}/500/500`,
        `https://picsum.photos/id/${(id % 30) + 103}/500/500`
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
      sku: `MODEL-${id}`,
      specifications: [
        { name: "Modelo", value: `MODEL-${id}` },
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
      relatedProducts: Array.from({ length: 4 }, (_, i) => ({
        id: id + i + 1,
        name: `Producto relacionado ${i + 1}`,
        price: Math.floor(Math.random() * 50000) + 10000,
        image: `https://picsum.photos/id/${(id + i) % 30 + 200}/500/500`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 100),
        inStock: true,
        link: `/productos/producto-relacionado-${i + 1}`
      }))
    };
  },

  // Add the new products method
  async getNewProducts(params = {}) {
    try {
      // Return default data for development
      return this.getDefaultNewProducts(params);
      
      /* Uncomment when API is ready
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.category) queryParams.append('category', params.category);
      if (params.brand && params.brand.length) queryParams.append('brand', params.brand.join(','));
      if (params.price) queryParams.append('price_min', params.price[0]);
      if (params.price) queryParams.append('price_max', params.price[1]);
      
      const url = `${API_BASE_URL}/products/new?${queryParams.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
      */
    } catch (error) {
      console.error('Error fetching new products:', error);
      return this.getDefaultNewProducts(params);
    }
  },
  
  getDefaultNewProducts(params = {}) {
    // Generar productos de ejemplo con etiqueta "Nuevo"
    const allNewProducts = Array.from({ length: 30 }, (_, i) => {
      const price = Math.floor(Math.random() * 80000) + 10000;
      const hasDiscount = Math.random() > 0.7;
      const originalPrice = hasDiscount ? price + Math.floor(Math.random() * 30000) + 5000 : null;
      
      return {
        id: i + 2000, // IDs diferentes a los productos normales
        name: `Nuevo producto ${i + 1}`,
        price: price,
        originalPrice: originalPrice,
        image: `https://picsum.photos/id/${(i % 30) + 200}/500/500`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 50), // Menos reviews por ser nuevos
        badge: 'Nuevo',
        badgeType: 'new',
        inStock: Math.random() > 0.05, // Alta probabilidad de estar en stock
        description: 'Producto recién llegado a nuestro catálogo.',
        category: Math.floor(Math.random() * 8) + 1,
        brand: Math.floor(Math.random() * 8) + 1,
        link: `/productos/nuevo-${i + 1}`
      };
    });
    
    // Aplicar filtros si existen
    let filteredProducts = [...allNewProducts];
    
    if (params.category) {
      filteredProducts = filteredProducts.filter(p => p.category == params.category);
    }
    
    if (params.brand && params.brand.length) {
      filteredProducts = filteredProducts.filter(p => params.brand.includes(p.brand));
    }
    
    if (params.price) {
      filteredProducts = filteredProducts.filter(
        p => p.price >= params.price[0] && p.price <= params.price[1]
      );
    }
    
    // Ordenar productos
    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name_asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case 'popularity_desc':
          filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    } else {
      // Por defecto, ordenar por más recientes
      filteredProducts.sort((a, b) => b.id - a.id);
    }
    
    // Paginación
    const page = params.page || 1;
    const limit = params.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      page: page,
      limit: limit
    };
  },

  /* Expected API response format for product details:
  {
    id: 1,
    name: "Product Name",
    price: 129990,
    originalPrice: 159990,
    image: "https://example.com/image.jpg",
    images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    rating: 4.8,
    reviewCount: 24,
    badge: "Oferta",
    badgeType: "discount",
    inStock: true,
    description: "Product description...",
    category: "Category Name",
    categoryId: 1,
    brand: "Brand Name",
    brandId: 1,
    sku: "SKU123",
    specifications: [
      { name: "Spec1", value: "Value1" },
      { name: "Spec2", value: "Value2" }
    ],
    features: ["Feature 1", "Feature 2"],
    reviews: [
      {
        id: 1,
        userName: "User Name",
        rating: 5,
        date: "2024-01-15",
        comment: "Review comment..."
      }
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Related Product",
        price: 99990,
        image: "https://example.com/related.jpg",
        rating: 4.5,
        reviewCount: 18,
        inStock: true,
        link: "/productos/related-product"
      }
    ]
  }
  */
}