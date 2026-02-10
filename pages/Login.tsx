
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mountain, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../App';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);
    
    if (error) {
      alert(error.message);
    } else {
      navigate('/');
    }
  };

  const handleGuest = () => {
    guestLogin();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg w-full max-w-md animate-fade-in-up relative">
        <div className="absolute top-6 left-6">
           <Link to="/" className="flex items-center text-sm text-stone-500 hover:text-emerald-600 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
           </Link>
        </div>
        
        <div className="text-center mb-8 mt-4">
           <div className="flex justify-center mb-4">
             <Mountain className="h-12 w-12 text-emerald-600" />
           </div>
           <h1 className="text-2xl font-bold text-stone-900">Welcome Back</h1>
           <p className="text-stone-500 mt-2">Sign in to Mountain Herbs Nepal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
             <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
             <input 
               type="email" 
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900"
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
             <input 
               type="password" 
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900"
             />
           </div>
           
           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-70"
           >
             {loading ? 'Signing In...' : 'Sign In'}
           </button>
        </form>

        <div className="mt-6">
           <div className="relative">
              <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-stone-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                 <span className="px-2 bg-white text-stone-500">Or continue as</span>
              </div>
           </div>
           
           <button 
             onClick={handleGuest}
             className="mt-6 w-full bg-stone-100 text-stone-700 py-3 rounded-xl font-bold hover:bg-stone-200 transition-colors flex items-center justify-center"
           >
             Guest User <ArrowRight className="ml-2 h-4 w-4" />
           </button>
        </div>

        <p className="mt-8 text-center text-sm text-stone-500">
          Don't have an account? <Link to="/signup" className="text-emerald-600 font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
