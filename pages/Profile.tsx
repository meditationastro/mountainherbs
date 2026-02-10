
import React, { useEffect, useState } from 'react';
import { useAuth, useData } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { Package, User as UserIcon, LogOut, MapPin, Mail, Phone, Wallet as WalletIcon, Copy, Users, TrendingUp, Gift, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { Order, User } from '../types';
import { supabase } from '../services/supabase';

export const Profile: React.FC = () => {
  const { user, logout, refreshProfile } = useAuth();
  const { orders: contextOrders, settings } = useData(); 
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [referredUsers, setReferredUsers] = useState<User[]>([]);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const navigate = useNavigate();

  const referralBonus = settings?.referralBonusAmount || 200;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      // Load Orders
      if (contextOrders.length > 0) {
         setMyOrders(contextOrders.filter(o => o.customerDetails.email === user.email));
      } else {
         try {
           if (user.id) {
             const data = await api.getUserOrders(user.id);
             setMyOrders(data);
           }
         } catch (e) {
           console.error("Failed to load orders", e);
         }
      }

      // Load Referrals
      if (user.id && user.id !== 'guest') {
          try {
             const refs = await api.getReferredUsers(user.id);
             setReferredUsers(refs);
          } catch(e) {
              console.error("Failed to load referrals", e);
          }
      }
    };
    loadData();

    // --- Realtime Subscriptions ---
    if (user.id && user.id !== 'guest') {
        const channel = supabase
          .channel('profile_dashboard_changes')
          // Listen for new referrals (people where referred_by = current user)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'profiles',
              filter: `referred_by=eq.${user.id}`,
            },
            async (payload) => {
              // Reload referrals list
              const refs = await api.getReferredUsers(user.id);
              setReferredUsers(refs);
              // Also refresh profile to get new wallet balance
              await refreshProfile();
            }
          )
          // Listen for balance updates (when wallet transaction occurs)
          .on(
              'postgres_changes',
              {
                event: 'UPDATE', 
                schema: 'public',
                table: 'profiles',
                filter: `id=eq.${user.id}`,
              },
              async () => {
                 await refreshProfile();
              }
          )
          .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }
  }, [user, navigate, contextOrders]);

  const handleGenerateCode = async () => {
      if (!user || user.id === 'guest') return;
      setIsGeneratingCode(true);
      try {
          await api.generateReferralCode(user.id, user.name);
          await refreshProfile();
      } catch (e) {
          console.error("Manual code gen failed", e);
      } finally {
          setIsGeneratingCode(false);
      }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 font-serif drop-shadow-md">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Card & Wallet */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-3xl font-bold mb-4 border-4 border-white shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
                <span className="inline-block px-3 py-1 bg-stone-100 text-stone-500 text-xs rounded-full mt-2 font-bold uppercase tracking-wide">
                  {user.role}
                </span>
                
                {/* Wallet Balance Widget */}
                <Link to="/wallet" className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-xl flex items-center justify-between hover:shadow-lg transition-all group">
                   <div className="text-left">
                     <p className="text-xs text-emerald-100 uppercase">Wallet Balance</p>
                     <p className="text-xl font-bold">Rs. {user.walletBalance.toLocaleString()}</p>
                   </div>
                   <WalletIcon className="h-6 w-6 text-emerald-200 group-hover:scale-110 transition-transform" />
                </Link>
                
                <div className="w-full space-y-4 text-left mt-8">
                  <div className="flex items-center text-stone-600 text-sm bg-stone-50 p-3 rounded-xl">
                    <Mail className="h-4 w-4 mr-3 text-emerald-500" /> 
                    <span className="truncate">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-stone-600 text-sm bg-stone-50 p-3 rounded-xl">
                      <Phone className="h-4 w-4 mr-3 text-emerald-500" /> {user.phone}
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-center text-stone-600 text-sm bg-stone-50 p-3 rounded-xl">
                      <MapPin className="h-4 w-4 mr-3 text-emerald-500" /> {user.address}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="mt-8 w-full flex items-center justify-center px-4 py-3 border-2 border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors font-bold"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Referral Dashboard & Orders */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Referral Dashboard */}
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-white/10">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Users className="h-40 w-40" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-blue-200" />
                        </div>
                        <h2 className="text-2xl font-bold">Referral Dashboard</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-blue-200 text-sm font-medium">Your Unique Code</p>
                                {!user.referralCode && (
                                    <button 
                                        onClick={handleGenerateCode} 
                                        disabled={isGeneratingCode}
                                        className="text-xs bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 flex items-center gap-1"
                                    >
                                        <RefreshCw className={`h-3 w-3 ${isGeneratingCode ? 'animate-spin' : ''}`} /> 
                                        {isGeneratingCode ? 'Generating...' : 'Generate Code'}
                                    </button>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-between bg-black/20 rounded-lg p-3 cursor-pointer hover:bg-black/30 transition-colors"
                                onClick={() => {
                                    if(user.referralCode) {
                                        navigator.clipboard.writeText(user.referralCode);
                                        alert("Code copied!");
                                    }
                                }}
                            >
                                <span className="font-mono font-bold text-xl tracking-wider text-white">
                                    {user.referralCode || (isGeneratingCode ? 'Generating...' : '---')}
                                </span>
                                {user.referralCode && <Copy className="h-5 w-5 text-blue-300" />}
                            </div>
                            <p className="text-xs text-blue-300 mt-2 flex items-center gap-1"><Gift className="h-3 w-3"/> Earn Rs. {referralBonus} per friend!</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-center">
                             <p className="text-blue-200 text-sm font-medium">Total Successful Referrals</p>
                             <p className="text-4xl font-bold mt-2">{referredUsers.length}</p>
                             <p className="text-xs text-green-300 mt-1 font-bold">+ Rs. {(referredUsers.length * referralBonus).toLocaleString()} Earned</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-blue-200 uppercase tracking-wide mb-3">Recent Referrals</h3>
                        {referredUsers.length > 0 ? (
                            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                                {referredUsers.slice(0, 5).map((ref, i) => (
                                    <div key={ref.id} className={`flex justify-between items-center p-3 ${i !== referredUsers.length -1 ? 'border-b border-white/5' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold">
                                                {ref.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{ref.name}</p>
                                                <p className="text-xs text-blue-300">Joined: {ref.joinDate}</p>
                                            </div>
                                        </div>
                                        <span className="text-green-400 text-xs font-bold bg-green-500/20 px-2 py-1 rounded">Completed</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-white/5 rounded-xl border border-dashed border-white/10">
                                <p className="text-blue-200 text-sm">No referrals yet. Share your code!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg mr-3">
                  <Package className="h-5 w-5" />
                </div>
                Order History
              </h3>
              
              {myOrders.length > 0 ? (
                <div className="space-y-4">
                  {myOrders.map(order => (
                    <div key={order.id} className="border border-stone-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="font-bold text-stone-800 text-lg group-hover:text-emerald-700 transition-colors">{order.id}</span>
                          <p className="text-xs text-stone-400 font-medium mt-1">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                           order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                           order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                           order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="bg-stone-50 rounded-xl p-3 mb-3">
                        <p className="text-sm text-stone-600 line-clamp-2">
                          {order.items.map(i => `${i.quantity} x ${i.name}`).join(', ')}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                         <span className="font-bold text-stone-900">Total: <span className="text-emerald-600">Rs. {order.total.toLocaleString()}</span></span>
                         <span className="text-stone-400 font-medium bg-stone-100 px-2 py-1 rounded">{order.paymentMethod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                   <Package className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                   <p className="text-stone-400 font-medium">No orders found.</p>
                   <button onClick={() => navigate('/shop')} className="mt-4 text-emerald-600 font-bold hover:underline">Start Shopping</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
