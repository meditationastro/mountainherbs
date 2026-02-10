
import React, { useState } from 'react';
import { CheckCircle, Shield, Target, Users, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const About: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Are your products truly organic?",
      answer: "Yes, all our products are sourced directly from certified organic farms and wild collection sites in the Himalayas. We strictly avoid chemicals and pesticides."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we offer worldwide shipping. Shipping costs and times vary depending on your location. Please check our shipping policy for more details."
    },
    {
      question: "What is the delivery time within Nepal?",
      answer: "For Kathmandu valley, we usually deliver within 24 hours. For major cities outside the valley, it takes 2-3 business days."
    },
    {
      question: "How do I use Shilajit?",
      answer: "Take a pea-sized amount (300-500mg) and dissolve it in hot water, tea, or milk. It is best consumed in the morning on an empty stomach."
    },
    {
      question: "Is there a return policy?",
      answer: "We have a 7-day return policy for damaged or incorrect products. Please retain the original packaging and contact our support team immediately."
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Header Banner */}
      <div className="relative bg-stone-900 text-white py-32">
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1518012170366-061093122b51?q=80&w=2938&auto=format&fit=crop" 
            alt="About Mountain Herbs" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl md:text-2xl text-stone-200 font-light max-w-2xl mx-auto">Bridging the gap between ancient Himalayan wisdom and modern wellness.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Main Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="animate-fade-in-up delay-100">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2 block">Who We Are</span>
            <h2 className="text-4xl font-bold text-stone-900 mb-8 leading-tight">Authentic. Ethical. <br/>Purely Himalayan.</h2>
            <p className="text-stone-600 leading-relaxed mb-6 text-lg">
              Mountain Herbs Nepal is a leading manufacturer, wholesaler, and exporter of high-quality medicinal herbs, organic products, and Ayurvedic remedies. Sourced directly from the high-altitude regions of the Nepal Himalayas, our products are known for their purity and potency.
            </p>
            <p className="text-stone-600 leading-relaxed text-lg">
              Established with a deep respect for nature and tradition, we aim to bridge the gap between ancient Ayurvedic wisdom and modern wellness needs. We work closely with local farmers and collectors, ensuring fair trade practices.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] animate-fade-in-up delay-200 group">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop" alt="Himalayan Nature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="bg-stone-50 p-10 rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-emerald-600">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Mission</h3>
            <p className="text-stone-600 leading-relaxed">
              To promote holistic wellness by providing 100% natural and organic Himalayan products while empowering local communities through sustainable trade. We strive to be the most trusted source of Himalayan herbs globally.
            </p>
          </div>
          <div className="bg-stone-50 p-10 rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-emerald-600">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Vision</h3>
            <p className="text-stone-600 leading-relaxed">
              To see a world where natural healing is accessible to everyone. We envision Mountain Herbs Nepal as a global ambassador for the richness of Nepal's biodiversity and the efficacy of Ayurveda.
            </p>
          </div>
        </div>

        {/* CEO Section */}
        <div className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 mb-32 text-white relative overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
           
           <div className="flex-1 relative z-10">
             <div className="inline-block bg-emerald-800/50 px-4 py-1 rounded-full text-emerald-300 font-bold text-sm mb-6 border border-emerald-700">From the Founder</div>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">"Nature is the best physician. We just bring its medicine to you."</h2>
             <p className="text-emerald-100 italic mb-10 text-lg leading-relaxed font-light">
               Growing up in the lap of the Himalayas, I witnessed the healing power of nature firsthand. Mountain Herbs Nepal is not just a business; it's a tribute to our ancestors and a commitment to sharing Nepal's natural gifts with the world.
             </p>
             <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div>
                   <p className="font-bold text-white text-xl">Dinesh Timalsina</p>
                   <p className="text-emerald-400">CEO & Founder</p>
                </div>
                <div className="hidden sm:block h-10 w-px bg-emerald-700"></div>
                <a 
                  href="https://wa.me/9779823376110" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-emerald-900 rounded-full hover:bg-emerald-50 transition-colors shadow-lg font-bold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" /> 
                  Chat on WhatsApp
                </a>
             </div>
           </div>
           <div className="flex-shrink-0 relative z-10">
             <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2940&auto=format&fit=crop" alt="Dinesh Timalsina" className="w-64 h-64 rounded-full border-4 border-white/20 shadow-2xl object-cover relative z-10" />
             </div>
           </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-stone-500">Everything you need to know about our products and services.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-stone-200 rounded-2xl overflow-hidden bg-white hover:border-emerald-200 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left bg-white transition-colors focus:outline-none group"
                >
                  <span className={`font-bold text-lg ${openIndex === index ? 'text-emerald-700' : 'text-stone-800'} group-hover:text-emerald-700 transition-colors`}>{faq.question}</span>
                  {openIndex === index ? <ChevronUp className="h-5 w-5 text-emerald-600" /> : <ChevronDown className="h-5 w-5 text-stone-400 group-hover:text-emerald-600" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-stone-600 leading-relaxed bg-white">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
