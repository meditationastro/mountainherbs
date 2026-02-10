import { Product, BlogPost, User, Order } from '../types';
import { INITIAL_PRODUCTS, INITIAL_POSTS, MOCK_USERS } from '../constants';

const STORAGE_KEYS = {
  PRODUCTS: 'hn_products',
  POSTS: 'hn_posts',
  USERS: 'hn_users',
  ORDERS: 'hn_orders',
  CURRENT_USER: 'hn_current_user'
};

export const storageService = {
  // Products
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  addProduct: (product: Product): Product[] => {
    const products = storageService.getProducts();
    const newProducts = [product, ...products];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
    return newProducts;
  },

  updateProduct: (updatedProduct: Product): Product[] => {
    const products = storageService.getProducts();
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
    return newProducts;
  },

  deleteProduct: (id: string): Product[] => {
    const products = storageService.getProducts();
    const newProducts = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
    return newProducts;
  },

  // Blog
  getPosts: (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(stored);
  },

  addPost: (post: BlogPost): BlogPost[] => {
    const posts = storageService.getPosts();
    const newPosts = [post, ...posts];
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(newPosts));
    return newPosts;
  },

  updatePost: (updatedPost: BlogPost): BlogPost[] => {
    const posts = storageService.getPosts();
    const newPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(newPosts));
    return newPosts;
  },

  deletePost: (id: string): BlogPost[] => {
    const posts = storageService.getPosts();
    const newPosts = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(newPosts));
    return newPosts;
  },

  // Users
  getUsers: (): User[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
      return MOCK_USERS;
    }
    return JSON.parse(stored);
  },

  addUser: (user: User): User[] => {
    const users = storageService.getUsers();
    const newUsers = [...users, user];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(newUsers));
    return newUsers;
  },

  updateUser: (updatedUser: User): User[] => {
    const users = storageService.getUsers();
    const newUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(newUsers));
    return newUsers;
  },
  
  // Orders
  getOrders: (): Order[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  },

  addOrder: (order: Order): Order[] => {
    const orders = storageService.getOrders();
    const newOrders = [order, ...orders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(newOrders));
    return newOrders;
  }
};