// Mock API for demo purposes since backend is not running
export const api = {
  get: async (url: string, config?: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url === '/products') {
      return {
        data: {
          products: [
            {
              _id: '1',
              name: 'Wireless Bluetooth Headphones',
              price: 199.99,
              image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
              rating: 4.5,
              numReviews: 128,
              stock: 25,
              category: 'electronics',
              description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.'
            },
            {
              _id: '2',
              name: 'Smartphone 12 Pro',
              price: 999.99,
              image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
              rating: 4.8,
              numReviews: 256,
              stock: 15,
              category: 'electronics',
              description: 'Latest smartphone with advanced camera system and lightning-fast performance.'
            },
            {
              _id: '3',
              name: 'Cotton Casual T-Shirt',
              price: 29.99,
              image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
              rating: 4.2,
              numReviews: 89,
              stock: 50,
              category: 'clothing',
              description: 'Comfortable 100% cotton t-shirt perfect for everyday wear.'
            },
            {
              _id: '4',
              name: 'JavaScript Programming Guide',
              price: 45.99,
              image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=500',
              rating: 4.7,
              numReviews: 167,
              stock: 30,
              category: 'books',
              description: 'Comprehensive guide to modern JavaScript programming techniques.'
            },
            {
              _id: '5',
              name: 'Yoga Mat Premium',
              price: 79.99,
              image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
              rating: 4.6,
              numReviews: 94,
              stock: 40,
              category: 'sports',
              description: 'Non-slip premium yoga mat with extra cushioning for comfort.'
            },
            {
              _id: '6',
              name: 'Coffee Maker Deluxe',
              price: 149.99,
              image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500',
              rating: 4.4,
              numReviews: 112,
              stock: 20,
              category: 'home',
              description: 'Programmable coffee maker with built-in grinder and thermal carafe.'
            }
          ]
        }
      };
    }
    
    if (url.startsWith('/products/')) {
      const productId = url.split('/')[2];
      const products = [
        {
          _id: '1',
          name: 'Wireless Bluetooth Headphones',
          price: 199.99,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
          rating: 4.5,
          numReviews: 128,
          stock: 25,
          category: 'electronics',
          description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.'
        },
        {
          _id: '2',
          name: 'Smartphone 12 Pro',
          price: 999.99,
          image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
          rating: 4.8,
          numReviews: 256,
          stock: 15,
          category: 'electronics',
          description: 'Latest smartphone with advanced camera system and lightning-fast performance.'
        }
      ];
      
      const product = products.find(p => p._id === productId) || products[0];
      return { data: product };
    }
    
    return { data: {} };
  },
  
  post: async (url: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url === '/auth/login') {
      return {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: 'Demo User',
            email: data.email
          }
        }
      };
    }
    
    if (url === '/auth/register') {
      return {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: data.name,
            email: data.email
          }
        }
      };
    }
    
    if (url === '/orders') {
      return {
        data: {
          orderId: 'ORDER-' + Date.now(),
          message: 'Order placed successfully'
        }
      };
    }
    
    return { data: {} };
  }
};

// Mock token handling
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};