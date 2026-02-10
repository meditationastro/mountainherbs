
import React, { useState } from 'react';
import { useWishlist } from '../App';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
         <div className="bg-white p-8 rounded-full shadow-lg mb-6 shadow-red-100">
           <Heart className="h-12 w-12 text-red-200 fill-current" />
         </div>
         <h2 className="text-3xl font-bold text-stone-100 mb-3 font-serif">Your wishlist is empty</h2>
         <p className="text-stone-300 mb-8 max-w-md text-center">Looks like you haven't saved any items yet. Browse our collection and save your favorites.</p>
         <Link to="/shop" className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all hover:scale-105 shadow-xl shadow-emerald-200 flex items-center">
           <ShoppingBag className="h-5 w-5 mr-2" /> Explore Products
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center font-serif drop-shadow-md">
            <div className="bg-red-100 p-2 rounded-xl mr-4 shadow-sm">
              <Heart className="h-8 w-8 text-red-500 fill-current" /> 
            </div>
            My Wishlist <span className="ml-4 text-lg font-sans font-normal text-stone-600 bg-white px-3 py-1 rounded-full border border-stone-200 shadow-sm">{wishlist.length} items</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product, index) => (
             <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
