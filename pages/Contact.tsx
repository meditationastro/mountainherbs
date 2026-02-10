
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useData } from '../App';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addMessage } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        await addMessage(formData);
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
        alert("Failed to send message. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <Seo title="Contact Us" description="Get in touch with Mountain Herbs Nepal for inquiries about organic Shilajit, honey, and wellness products." />
      
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold text-white mb-4 font-serif drop-shadow-lg">Get in Touch</h1>
        <p className="text-stone-200 max-w-xl mx-auto drop-shadow-md text-lg">
          Have questions about our products or your order? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start space-x-4">
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Phone / WhatsApp</h3>
                <p className="text-stone-600 text-sm mb-2">+977 9823376110</p>
                <a href="https://wa.me/9779823376110" className="text-emerald-600 text-sm font-bold hover:underline">Chat now</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Email</h3>
                <p className="text-stone-600 text-sm mb-2">greenmandux@gmail.com</p>
                <a href="mailto:greenmandux@gmail.com" className="text-blue-600 text-sm font-bold hover:underline">Send email</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start space-x-4">
              <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Office</h3>
                <p className="text-stone-600 text-sm">Thamel, Kathmandu<br/>Nepal</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-emerald-900/5 border border-stone-100">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Send us a Message</h2>
              
              {success ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-2xl text-center">
                  <p className="font-bold text-lg mb-2">Message Sent!</p>
                  <p>Thank you for contacting us. We will get back to you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-bold underline">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50 focus:bg-white text-stone-900"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50 focus:bg-white text-stone-900"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50 focus:bg-white text-stone-900"
                      placeholder="+977..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50 focus:bg-white text-stone-900"
                      placeholder="Order inquiry, Product question..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-stone-50 focus:bg-white h-40 resize-none text-stone-900"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-emerald-200 flex items-center justify-center disabled:opacity-70"
                  >
                    {loading ? 'Sending...' : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
