
import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowDownWideNarrow, ArrowUpDown, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useData } from '../App';
import { Seo } from '../components/Seo';

export const Shop: React.FC = () => {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Enhanced Filter Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const term = searchTerm.toLowerCase().trim();
        
        // comprehensive search across multiple fields
        const matchesSearch = 
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.longDescription.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          (product.botanicalName && product.botanicalName.toLowerCase().includes(term)) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)));

        const matchesCategory = category === 'All' || product.category === category;

        return (term === '' || matchesSearch) && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          default:
            // Featured logic: promote items with discount badges or high ratings
            if (a.discountBadge && !b.discountBadge) return -1;
            if (!a.discountBadge && b.discountBadge) return 1;
            return b.rating - a.rating;
        }
      });
  }, [products, searchTerm, category, sortBy]);

  return (
    <div className="py-12 min-h-screen">
      <Seo title="Shop Collection" description="Browse our full range of Himalayan organic products including Shilajit, Honey, and Herbs." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Bar */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg mb-10 border border-white/10 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Shop Collection</h1>
              <p className="text-stone-400 mt-1">Showing {filteredProducts.length} premium products</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {/* Comprehensive Search Input */}
              <div className="relative group w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search name, herb, tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-10 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full bg-white/5 focus:bg-white/10 text-white placeholder-stone-500 transition-all"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-stone-500 group-focus-within:text-emerald-500 transition-colors" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3.5 text-stone-500 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Category Dropdown */}
              <div className="relative group w-full sm:w-48">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-11 pr-10 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white/5 focus:bg-white/10 text-white w-full cursor-pointer transition-all"
                >
                  {categories.map(c => <option key={c} value={c} className="bg-stone-900 text-white">{c}</option>)}
                </select>
                <SlidersHorizontal className="absolute left-4 top-3.5 h-5 w-5 text-stone-500 group-focus-within:text-emerald-500 transition-colors" />
                <ArrowDownWideNarrow className="absolute right-4 top-3.5 h-4 w-4 text-stone-500 pointer-events-none" />
              </div>

               {/* Sort Dropdown */}
               <div className="relative group w-full sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-11 pr-10 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white/5 focus:bg-white/10 text-white w-full cursor-pointer transition-all"
                >
                  <option value="featured" className="bg-stone-900 text-white">Featured</option>
                  <option value="price-low" className="bg-stone-900 text-white">Price: Low to High</option>
                  <option value="price-high" className="bg-stone-900 text-white">Price: High to Low</option>
                  <option value="name-asc" className="bg-stone-900 text-white">Name: A to Z</option>
                </select>
                <ArrowUpDown className="absolute left-4 top-3.5 h-5 w-5 text-stone-500 group-focus-within:text-emerald-500 transition-colors" />
                <ArrowDownWideNarrow className="absolute right-4 top-3.5 h-4 w-4 text-stone-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm font-bold text-stone-500 self-center mr-2 uppercase tracking-wide">Filters:</span>
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  category === c 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20' 
                    : 'bg-white/5 text-stone-400 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-black/40 backdrop-blur-xl rounded-3xl border border-dashed border-white/10">
            <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
               <Search className="h-8 w-8 text-stone-500" />
            </div>
            <h3 className="text-xl font-bold text-stone-300">No products match your search.</h3>
            <p className="text-stone-500 mt-2 max-w-xs mx-auto">
              Try checking your spelling or use broader keywords like "herb" or "oil".
            </p>
            <button 
              onClick={() => {setCategory('All'); setSearchTerm('')}}
              className="mt-6 px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
