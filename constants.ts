
import { Product, BlogPost, User } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Himalayan Shilajit (Pure Resin)',
    price: 4500,
    description: 'Pure, organic Shilajit resin sourced from high altitude rocks.',
    longDescription: 'Our Shilajit is harvested from the pristine heights of the Himalayas (16,000+ ft). It is purified using traditional methods to ensure safety and potency. Rich in Fulvic acid and 84+ minerals, it boosts energy, immunity, and cognitive health.',
    image: 'https://images.unsplash.com/photo-1629196924294-f25b2a0c2049?w=800&q=80',
    category: 'Wellness',
    rating: 4.9,
    reviews: 128,
    discountBadge: 'Best Seller',
    stock: 50
  },
  {
    id: '2',
    name: 'Wild Forest Honey',
    price: 1800,
    description: 'Raw, unprocessed honey collected from wild hives.',
    longDescription: 'This honey is not your average sweetener. Collected by local tribes from wild hives in deep forests, it contains natural pollen and enzymes often lost in commercial processing.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
    category: 'Food',
    rating: 5.0,
    reviews: 210,
    discountBadge: '15% OFF',
    stock: 100
  },
  {
    id: '3',
    name: 'Lavender Oil',
    price: 450,
    description: 'Calming floral aroma for relaxation.',
    longDescription: 'Steam distilled Lavender oil. Promotes deep sleep and relaxation. Sourced from organic farms.',
    image: 'https://images.unsplash.com/photo-1593007577531-40994503714b?w=800&q=80',
    category: 'Essential Oils',
    rating: 4.8,
    reviews: 85,
    stock: 30
  },
  {
    id: '4',
    name: 'Jatamansi',
    price: 1200,
    description: 'Himalayan Spikenard.',
    longDescription: 'Raw dried roots for calm and sleep. Famous in Ayurveda for reducing stress.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
    category: 'Herbs',
    rating: 4.9,
    reviews: 24,
    stock: 50
  },
  {
    id: '5',
    name: 'Turmeric Powder',
    price: 220,
    description: 'High curcumin organic turmeric.',
    longDescription: 'Potent anti-inflammatory powder.',
    image: 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?w=800&q=80',
    category: 'Powders',
    rating: 4.9,
    reviews: 56,
    stock: 200
  },
  {
    id: '6',
    name: 'Himalayan Green Tea',
    price: 280,
    description: 'High altitude organic green tea.',
    longDescription: 'Rich in antioxidants and grown in the high Himalayas.',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80',
    category: 'Teas',
    rating: 4.8,
    reviews: 42,
    stock: 150
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    author: 'Bikash Gupta',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100',
    content: 'Just visited our Shilajit sourcing partners in the Dolpo region. The purity of the resin this season is unmatched! Truly proud of what we are bringing to the world. 🏔️ #MountainHerbs #OrganicJourney',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    likes: 342,
    comments: 45,
    timestamp: '2 hours ago',
    title: 'Journey to Dolpo'
  },
  {
    id: '2',
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100',
    content: 'The Yak Wool Shawl saved me during my winter trip to Canada. So warm and soft! Highly recommend.',
    likes: 89,
    comments: 12,
    timestamp: '5 hours ago',
    title: 'Winter Essentials'
  }
];

export const MOCK_USERS: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', joinDate: '2023-01-15', walletBalance: 0, referralCode: 'JOHN123' },
  { id: '2', name: 'Alice Smith', email: 'alice@example.com', role: 'user', joinDate: '2023-03-22', walletBalance: 0, referralCode: 'ALICE123' },
  { id: '3', name: 'Robert Brown', email: 'robert@example.com', role: 'user', joinDate: '2023-06-10', walletBalance: 0, referralCode: 'ROBERT123' },
];
