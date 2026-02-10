
import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { api } from '../services/api';
import { WalletTransaction } from '../types';
import { CreditCard, Download, Upload, Clock, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, AlertTriangle, Phone, Banknote, Smartphone } from 'lucide-react';

export const Wallet: React.FC = () => {
  const { user, refreshProfile } = useAuth();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [amount, setAmount] = useState('');
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'bank' | 'phonepe'>('esewa');

  useEffect(() => {
    if (user && user.id !== 'guest') {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if(!user) return;
    try {
      const data = await api.getWalletTransactions(user.id);
      setTransactions(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a demo. In a real app, you would be redirected to the payment gateway.");
    // Simulating a successful deposit after manual verification (for this demo, we add it directly)
    if (!user) return;
    setLoading(true);
    try {
      await api.topUpWallet(user.id, Number(amount), `Deposit via ${selectedMethod.toUpperCase()}`);
      await refreshProfile();
      await loadTransactions();
      setAmount('');
      setShowDeposit(false);
      alert('Deposit Successful! (Demo)');
    } catch (e) {
      alert('Deposit Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (Number(amount) < 2000) {
        alert("Minimum withdrawal amount is Rs. 2000");
        return;
    }

    setLoading(true);
    try {
      const res = await api.withdrawWallet(user.id, Number(amount));
      if (res.error) {
        alert(res.error.message || 'Withdrawal Failed');
      } else {
        await refreshProfile();
        await loadTransactions();
        setAmount('');
        setShowWithdraw(false);
        alert('Withdrawal Request Submitted!');
      }
    } catch (e) {
      alert('Error processing withdrawal');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.id === 'guest') {
    return <div className="min-h-screen pt-24 text-center text-white">Please login to access wallet.</div>;
  }

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">My Digital Wallet</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Card UI */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <WalletIcon className="h-32 w-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <span className="text-emerald-100 font-medium tracking-wider">Current Balance</span>
                 <CreditCard className="h-8 w-8 text-emerald-200" />
              </div>
              <div className="my-6">
                <span className="text-5xl font-bold tracking-tight">Rs. {user.walletBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                   <p className="text-xs text-emerald-200 uppercase mb-1">Card Holder</p>
                   <p className="font-bold tracking-wide">{user.name.toUpperCase()}</p>
                </div>
                 <div className="text-right">
                   <p className="text-xs text-emerald-200 uppercase mb-1">Referral Code</p>
                   <p className="font-mono bg-black/20 px-2 py-1 rounded">{user.referralCode || '...'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-center gap-4">
            <button 
              onClick={() => { setAmount(''); setShowDeposit(true); }}
              className="w-full py-4 bg-emerald-100 text-emerald-700 rounded-xl font-bold hover:bg-emerald-200 transition-colors flex items-center justify-center gap-3"
            >
              <div className="bg-white p-2 rounded-full"><ArrowDownLeft className="h-5 w-5" /></div>
              Add Money / Deposit
            </button>
            <button 
              onClick={() => { setAmount(''); setShowWithdraw(true); }}
              className="w-full py-4 bg-stone-100 text-stone-700 rounded-xl font-bold hover:bg-stone-200 transition-colors flex items-center justify-center gap-3"
            >
               <div className="bg-white p-2 rounded-full"><ArrowUpRight className="h-5 w-5" /></div>
              Withdraw Funds
            </button>
            <div className="text-center">
                 <p className="text-xs text-stone-400 mt-2">Secure transactions powered by local gateways.</p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-stone-400" /> Recent Transactions
          </h2>
          
          <div className="space-y-4">
            {transactions.length === 0 ? (
               <p className="text-center text-stone-500 py-8">No transactions yet.</p>
            ) : (
              transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      ['deposit', 'referral_bonus', 'signup_bonus'].includes(tx.type) ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {['deposit', 'referral_bonus', 'signup_bonus'].includes(tx.type) ? <ArrowDownLeft className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                    </div>
                    <div>
                      <p className="font-bold text-stone-800 capitalize">{tx.description || tx.type.replace('_', ' ')}</p>
                      <p className="text-xs text-stone-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                       ['deposit', 'referral_bonus', 'signup_bonus', 'refund'].includes(tx.type) ? 'text-green-600' : 'text-stone-800'
                    }`}>
                      {['deposit', 'referral_bonus', 'signup_bonus', 'refund'].includes(tx.type) ? '+' : '-'} Rs. {tx.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-stone-400 uppercase">{tx.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-fade-in-up">
             <h3 className="text-xl font-bold mb-4 text-stone-900">Deposit Funds</h3>
             
             {/* Payment Methods */}
             <div className="grid grid-cols-3 gap-3 mb-6">
                 <button 
                    onClick={() => setSelectedMethod('esewa')}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === 'esewa' ? 'border-green-500 bg-green-50 ring-2 ring-green-200' : 'border-stone-200'}`}
                 >
                    <Smartphone className="h-6 w-6 text-green-600" />
                    <span className="text-xs font-bold text-stone-800">eSewa</span>
                 </button>
                 <button 
                    onClick={() => setSelectedMethod('phonepe')}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === 'phonepe' ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-stone-200'}`}
                 >
                    <Smartphone className="h-6 w-6 text-purple-600" />
                    <span className="text-xs font-bold text-stone-800">PhonePe</span>
                 </button>
                 <button 
                    onClick={() => setSelectedMethod('bank')}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${selectedMethod === 'bank' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-stone-200'}`}
                 >
                    <Banknote className="h-6 w-6 text-blue-600" />
                    <span className="text-xs font-bold text-stone-800">Bank</span>
                 </button>
             </div>

             {/* Critical Warning */}
             <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 flex items-start gap-3">
                 <AlertTriangle className="h-5 w-5 shrink-0" />
                 <div>
                    <p className="font-bold mb-1">Important Instruction</p>
                    <p>Please contact our support team before depositing. We will provide you with the exact account details and verify your transaction manually.</p>
                    <div className="mt-2 flex items-center gap-2 font-bold text-amber-900">
                        <Phone className="h-4 w-4" /> <span>+977 9823376110</span>
                    </div>
                 </div>
             </div>

             <form onSubmit={handleDeposit}>
               <label className="block text-sm font-bold text-stone-700 mb-2">Deposit Amount</label>
               <input 
                 type="number" 
                 min="10" 
                 className="w-full p-3 border rounded-xl mb-6 text-lg font-bold text-stone-900" 
                 placeholder="Rs. 0"
                 value={amount}
                 onChange={e => setAmount(e.target.value)}
                 required 
                />
               <div className="flex gap-3">
                 <button type="button" onClick={() => setShowDeposit(false)} className="flex-1 py-3 bg-stone-100 rounded-xl font-bold hover:bg-stone-200 text-stone-700">Cancel</button>
                 <button type="submit" disabled={loading} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">
                    {loading ? 'Processing...' : 'Confirm Deposit'}
                 </button>
               </div>
             </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-fade-in-up">
             <h3 className="text-xl font-bold mb-2 text-stone-900">Withdraw Funds</h3>
             <p className="text-sm text-stone-500 mb-6">Available: Rs. {user.walletBalance}. Funds will be sent to your registered bank account.</p>
             
             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl mb-4 text-xs text-blue-800">
                Minimum Withdrawal: <span className="font-bold">Rs. 2000</span>
             </div>

             <form onSubmit={handleWithdraw}>
               <label className="block text-sm font-bold text-stone-700 mb-2">Withdraw Amount</label>
               <input 
                 type="number" 
                 min="2000"
                 max={user.walletBalance}
                 className="w-full p-3 border rounded-xl mb-4 text-lg font-bold text-stone-900" 
                 placeholder="Amount (Rs.)"
                 value={amount}
                 onChange={e => setAmount(e.target.value)}
                 required 
                />
               <div className="flex gap-3">
                 <button type="button" onClick={() => setShowWithdraw(false)} className="flex-1 py-3 bg-stone-100 rounded-xl font-bold hover:bg-stone-200 text-stone-700">Cancel</button>
                 <button type="submit" disabled={loading} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">{loading ? 'Processing...' : 'Request Withdraw'}</button>
               </div>
             </form>
          </div>
        </div>
      )}

    </div>
  );
};
