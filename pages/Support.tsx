
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Truck, RotateCcw, HelpCircle, Mail, Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { Seo } from '../components/Seo';

export const Support: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <Seo title="Support Center" description="Shipping policies, returns, and FAQs for Mountain Herbs Nepal." />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 font-serif drop-shadow-lg">Support Center</h1>
          <p className="text-stone-200 text-lg">How can we help you today?</p>
        </div>

        <div className="space-y-12">
          
          {/* Shipping Policy */}
          <section id="shipping" className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Truck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Shipping Policy</h2>
            </div>
            <div className="text-stone-600 space-y-4 leading-relaxed">
              <p>
                We strive to deliver your authentic Himalayan products as quickly and safely as possible.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Kathmandu Valley:</strong> Delivery within 24 hours of order confirmation.</li>
                <li><strong>Outside Valley:</strong> Delivery within 2-4 business days via domestic courier.</li>
                <li><strong>International:</strong> Delivery times vary (usually 7-14 days). Please contact us for rates.</li>
              </ul>
              <p className="text-sm bg-blue-50 p-4 rounded-xl text-blue-800 border border-blue-100">
                <strong>Note:</strong> Free shipping applies on orders above Rs. 2000 within Nepal.
              </p>
            </div>
          </section>

          {/* Returns Policy */}
          <section id="returns" className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <RotateCcw className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Returns & Refunds</h2>
            </div>
            <div className="text-stone-600 space-y-4 leading-relaxed">
              <p>
                Your satisfaction is our priority. If you receive a damaged or incorrect item, we are here to help.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Returns are accepted within <strong>7 days</strong> of delivery.</li>
                <li>Items must be unused, sealed, and in original packaging.</li>
                <li>For Shilajit resin, due to hygiene reasons, we only accept returns if the safety seal is unbroken.</li>
              </ul>
              <p>
                To initiate a return, please contact us on WhatsApp or Email with your Order ID and photos of the issue.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Common Questions</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-stone-800 mb-2">How do I track my order?</h3>
                <p className="text-stone-600 text-sm">Once shipped, you will receive a tracking number via SMS/Email. You can also check status in your Profile.</p>
              </div>
              <div>
                <h3 className="font-bold text-stone-800 mb-2">Is payment secure?</h3>
                <p className="text-stone-600 text-sm">Yes, we use eSewa and direct bank transfers. We do not store your card details directly.</p>
              </div>
              <div>
                <h3 className="font-bold text-stone-800 mb-2">Can I cancel my order?</h3>
                <p className="text-stone-600 text-sm">Orders can be cancelled while in 'Pending' status from your profile. Once processed, cancellations are not guaranteed.</p>
              </div>
            </div>
          </section>

          {/* Contact Strip */}
          <div className="bg-emerald-900 text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
             <div>
               <h3 className="text-xl font-bold mb-2">Still need help?</h3>
               <p className="text-emerald-200 text-sm">Our team is available 10 AM - 6 PM (Sun-Fri).</p>
             </div>
             <div className="flex flex-col sm:flex-row gap-4">
               <a href="https://wa.me/9779823376110" target="_blank" rel="noopener noreferrer" className="flex items-center bg-emerald-600 hover:bg-emerald-500 px-5 py-3 rounded-xl font-bold transition-colors">
                 <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp
               </a>
               <a href="mailto:greenmandux@gmail.com" className="flex items-center bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl font-bold transition-colors">
                 <Mail className="h-5 w-5 mr-2" /> Email Us
               </a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
