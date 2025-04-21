export const products = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      price: 199.99,
      image: "https://placehold.co/300x200?text=Headphones",
      description: "Experience crystal-clear sound and immersive noise cancellation for music, calls, and media on the go."
    },
    {
      id: 2,
      name: "4K Ultra HD Smart TV",
      price: 499.99,
      image: "https://placehold.co/300x200?text=Smart+TV",
      description: "Enjoy vivid colors and sharp detail with this 55-inch smart TV, perfect for streaming, gaming, and more."
    },
    {
      id: 3,
      name: "Bluetooth Fitness Tracker",
      price: 59.99,
      image: "https://placehold.co/300x200?text=Fitness+Tracker",
      description: "Track your steps, heart rate, and sleep patterns with this sleek and water-resistant fitness tracker."
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 139.00,
      image: "https://placehold.co/300x200?text=Office+Chair",
      description: "Stay comfortable during long work sessions with adjustable lumbar support and breathable mesh."
    },
    {
      id: 5,
      name: "Smartphone Gimbal Stabilizer",
      price: 89.95,
      image: "https://placehold.co/300x200?text=Gimbal",
      description: "Capture smooth, cinematic video footage using your phone with this 3-axis motorized gimbal."
    },
    {
      id: 6,
      name: "USB-C Hub with HDMI",
      price: 34.99,
      image: "https://placehold.co/300x200?text=USB-C+Hub",
      description: "Expand your laptop's connectivity with HDMI, USB 3.0, SD card reader, and power passthrough."
    },
    {
      id: 7,
      name: "Stainless Steel Air Fryer",
      price: 129.99,
      image: "https://placehold.co/300x200?text=Air+Fryer",
      description: "Crisp your favorite foods using hot air with less oil, healthier cooking in a stylish countertop unit."
    },
    {
      id: 8,
      name: "Mechanical Gaming Keyboard",
      price: 74.95,
      image: "https://placehold.co/300x200?text=Keyboard",
      description: "Enjoy tactile feedback and RGB lighting with this responsive mechanical keyboard for gaming and productivity."
    },
    {
      id: 9,
      name: "Portable Bluetooth Speaker",
      price: 45.00,
      image: "https://placehold.co/300x200?text=Speaker",
      description: "Take your music anywhere with this waterproof Bluetooth speaker featuring deep bass and long battery life."
    },
    {
      id: 10,
      name: "Smart WiFi LED Light Bulbs (4-Pack)",
      price: 29.99,
      image: "https://placehold.co/300x200?text=LED+Bulbs",
      description: "Control your lighting remotely, set schedules, and choose from millions of colors using your smartphone or voice."
    }
  ];
  
    export const categories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Laptops' },
        { id: 3, name: 'Smartphones' }
    ];

    export const getProductById = (id) => {
        return products.find(product => product.id === id);
    };
    export const getProductsByCategory = (categoryId) => {
        return products.filter(product => product.categoryId === categoryId);
    };
    export const getAllProducts = () => {
        return products;
    };
    export const getAllCategories = () => {
        return categories;
    };
    export const getCategoryById = (id) => {
        return categories.find(category => category.id === id);
    };
    export const getCategoryByName = (name) => {
        return categories.find(category => category.name === name);
    };
    export const getProductByName = (name) => {
        return products.find(product => product.name === name);
    };
    export const getProductsByPriceRange = (min, max) => {
        return products.filter(product => product.price >= min && product.price <= max);
    };
    export const getProductsBySearchTerm = (searchTerm) => {
        return products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };
    export const getProductsByIds = (ids) => {
        return products.filter(product => ids.includes(product.id));
    };  
