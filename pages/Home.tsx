
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Leaf, Truck, Users, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useData } from '../App';
import { Seo } from '../components/Seo';

export const Home: React.FC = () => {
  const { products } = useData();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      <Seo title="Home" description="Authentic Himalayan herbs, organic products, and shilajit sourced ethically from Nepal." />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Transparent background to let Galaxy show through */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-sm font-bold mb-8 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide uppercase bg-gradient-to-r from-emerald-300 via-white to-emerald-300 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                100% Organic Sourced from Nepal
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              <span className="text-stone-100">Pure Nature from</span> <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 animate-gradient-x bg-[length:200%_auto]">The Himalayas</span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed max-w-2xl font-light drop-shadow-lg">
              Discover authentic Shilajit, wild honey, and ethically woven textiles. 
              Sourced directly from local farmers to bring the healing power of nature to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/shop" 
                className="inline-flex justify-center items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all hover:scale-105 shadow-xl border border-emerald-500/50"
              >
                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/about" 
                className="inline-flex justify-center items-center px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Strip */}
      <div className="bg-white/5 backdrop-blur-xl border-y border-white/5 py-10 relative z-20 mx-4 md:mx-auto max-w-7xl rounded-2xl shadow-xl flex flex-wrap justify-around gap-8 md:gap-0 mt-[-50px]">
          <div className="text-center">
             <p className="text-3xl font-bold text-emerald-400">15k+</p>
             <p className="text-stone-400 text-sm font-medium uppercase tracking-wide">Happy Customers</p>
          </div>
          <div className="w-px bg-white/10 hidden md:block"></div>
          <div className="text-center">
             <p className="text-3xl font-bold text-emerald-400">100%</p>
             <p className="text-stone-400 text-sm font-medium uppercase tracking-wide">Organic Certified</p>
          </div>
          <div className="w-px bg-white/10 hidden md:block"></div>
           <div className="text-center">
             <p className="text-3xl font-bold text-emerald-400">50+</p>
             <p className="text-stone-400 text-sm font-medium uppercase tracking-wide">Local Farmers</p>
          </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 block">Our Promise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif drop-shadow-md">Why Mountain Herbs?</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "100% Organic", text: "Certified organic products sourced directly from nature, free from additives.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: ShieldCheck, title: "Lab Tested", text: "Every batch is tested for purity, potency and safety in certified labs.", color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: Users, title: "Ethical Trade", text: "We ensure fair wages and safe conditions for our farmers and artisans.", color: "text-purple-400", bg: "bg-purple-500/10" },
              { icon: Truck, title: "Global Delivery", text: "Fast, reliable shipping worldwide with eco-friendly packaging.", color: "text-orange-400", bg: "bg-orange-500/10" },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-black/40 backdrop-blur-xl rounded-[2rem] text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border border-white/5 relative overflow-hidden"
              >
                <div className={`inline-flex p-5 rounded-2xl ${feature.bg} shadow-inner mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 font-serif drop-shadow-md">Featured Collection</h2>
              <p className="text-stone-300 max-w-lg text-lg">Handpicked essentials that our customers love the most.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-white font-bold hover:text-emerald-300 transition-colors group bg-white/10 border border-white/10 px-6 py-3 rounded-full shadow-lg backdrop-blur-md">
              View All Products <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-full font-bold shadow-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white font-serif drop-shadow-lg">Loved by the Community</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Emily R.", text: "The Shilajit changed my energy levels completely. I feel 10 years younger! The packaging was also beautiful.", role: "Yoga Instructor" },
              { name: "Mark T.", text: "Incredible quality. The honey tastes like wildflowers. Fast shipping to the US as well. Will buy again.", role: "Verified Buyer" },
              { name: "Sarah L.", text: "I love the sustainable approach. It feels good to support ethical businesses while getting top-tier products.", role: "Eco Activist" }
            ].map((t, idx) => (
              <div key={idx} className="bg-black/40 backdrop-blur-xl p-8 rounded-[2rem] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/5 relative group">
                <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif">"</div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />)}
                </div>
                <p className="text-stone-300 italic mb-8 leading-relaxed text-lg font-light">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-800 to-teal-800 flex items-center justify-center text-emerald-100 font-bold text-xl shadow-inner border border-white/10">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-stone-400 uppercase tracking-wide font-bold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="max-w-3xl mx-auto animate-fade-in-up relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif drop-shadow-lg">Join the Himalayan Journey</h2>
          <p className="text-stone-200 mb-10 text-lg font-light">Subscribe to receive exclusive offers, wellness tips, and stories from the mountains.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:bg-white/20 focus:border-emerald-400 backdrop-blur-sm transition-all"
            />
            <button className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 shadow-lg transition-all transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
    