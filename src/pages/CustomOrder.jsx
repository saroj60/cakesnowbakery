import React, { useState } from 'react';
import { Camera, Calendar, MessageSquare, Send } from 'lucide-react';

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    flavor: '',
    size: '',
    shape: '',
    theme: '',
    message: '',
    deliveryDate: '',
    image: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const ADMIN_PHONE = '9779860568012';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let message = `*NEW CUSTOM ORDER REQUEST* 🎂\n\n`;
    message += `*Flavor:* ${formData.flavor}\n`;
    message += `*Shape:* ${formData.shape}\n`;
    message += `*Size:* ${formData.size}\n`;
    message += `*Theme/Concept:* ${formData.theme}\n`;
    if (formData.message) message += `*Message on Cake:* ${formData.message}\n`;
    message += `*Delivery Date:* ${formData.deliveryDate}\n`;
    if (formData.image) message += `*(I will send a reference image in this chat)*\n`;
    message += `\nPlease let me know the price and if this design is possible!`;

    const whatsappUrl = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-surface flex items-center justify-center">
        <div className="max-w-md w-full bg-surface-container-low p-8 rounded-3xl text-center shadow-lg border border-outline-variant/30">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Request Sent!</h2>
          <p className="text-on-surface-variant mb-8">
            Thank you for your custom order request. Our head baker will review your details and contact you shortly to confirm the design and pricing.
          </p>
          <button 
            onClick={() => { setIsSubmitted(false); setFormData({ flavor: '', size: '', shape: '', theme: '', message: '', deliveryDate: '', image: null }); }}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all"
          >
            Submit Another Request
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20 bg-surface-container-low/30 min-h-screen">
      <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-10">
          <h1 className="font-headline-xl text-4xl md:text-5xl text-primary font-bold mb-4">Custom Cake Order</h1>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Have a unique vision? Fill out the details below and let's bake your dream cake a reality.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface p-6 md:p-10 rounded-3xl shadow-md border border-outline-variant/20 space-y-8">
          
          {/* Section 1: Cake Details */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">1</span>
              Cake Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">Cake Flavor *</label>
                <select name="flavor" required value={formData.flavor} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option value="">Select Flavor</option>
                  <option value="Chocolate Fudge">Chocolate Fudge</option>
                  <option value="Vanilla Bean">Vanilla Bean</option>
                  <option value="Red Velvet">Red Velvet</option>
                  <option value="Strawberry Cream">Strawberry Cream</option>
                  <option value="Lemon Buttercream">Lemon Buttercream</option>
                  <option value="Black Forest">Black Forest</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">Cake Shape *</label>
                <select name="shape" required value={formData.shape} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option value="">Select Shape</option>
                  <option value="Round">Round</option>
                  <option value="Square">Square</option>
                  <option value="Heart">Heart</option>
                  <option value="Tiered">Tiered (Multiple Layers)</option>
                  <option value="Custom">Custom / 3D Carved</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">Size (Servings) *</label>
                <select name="size" required value={formData.size} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option value="">Select Size</option>
                  <option value="6 inch (6-8 servings)">6" Mini (6-8 servings)</option>
                  <option value="8 inch (12-16 servings)">8" Regular (12-16 servings)</option>
                  <option value="10 inch (20-25 servings)">10" Large (20-25 servings)</option>
                  <option value="12 inch (30-40 servings)">12" Party (30-40 servings)</option>
                  <option value="Multi-tier (50+ servings)">Multi-tier (50+ servings)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Design & Theme */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">2</span>
              Design & Inspiration
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">Theme / Concept Description *</label>
                <textarea 
                  name="theme" 
                  required 
                  value={formData.theme} 
                  onChange={handleChange} 
                  rows="3" 
                  placeholder="e.g. Spiderman theme, Pastel floral, Elegant minimalist..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2 flex items-center gap-2">
                  <Camera size={16} /> Reference Image (Optional)
                </label>
                <div className="w-full px-4 py-8 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                  <input type="file" name="image" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                  <div className="text-on-surface-variant flex flex-col items-center pointer-events-none">
                    <Camera size={24} className="mb-2 text-primary/60" />
                    <span className="font-medium text-sm text-primary mb-1">{formData.image ? formData.image.name : 'Click or drag image to upload'}</span>
                    <span className="text-xs">JPG, PNG, WEBP up to 5MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Final Details */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">3</span>
              Final Touches
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-on-surface mb-2 flex items-center gap-2">
                  <MessageSquare size={16} /> Message on Cake
                </label>
                <input 
                  type="text" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="e.g. Happy Birthday Sarah!"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-on-surface mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Expected Delivery / Pickup Date *
                </label>
                <input 
                  type="date" 
                  name="deliveryDate" 
                  required
                  value={formData.deliveryDate} 
                  onChange={handleChange} 
                  className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface"
                />
                <p className="text-xs text-on-surface-variant mt-2">Note: Custom cakes require at least 48 hours notice.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant/30">
            <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2">
              <Send size={20} />
              Submit Request
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-4">
              Submitting this form does not guarantee an order. We will contact you to confirm details and provide a quote.
            </p>
          </div>

        </form>
      </div>
    </main>
  );
};

export default CustomOrder;
