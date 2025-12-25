import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, ArrowRight, ArrowLeft, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { carMakes, transmissions, fuelTypes } from '@/data/mockData';
import { toast } from 'sonner';

const steps = ['Photos', 'Details', 'Pricing', 'Feature'];

export default function PostAd() {
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '', make: '', model: '', year: new Date().getFullYear(),
    mileage: '', fuelType: '', transmission: '', price: '', description: '',
  });
  const [isFeatured, setIsFeatured] = useState(false);

  if (!isAuthenticated) {
    setShowAuthModal(true);
    return null;
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) setPhotos((prev) => [...prev, ev.target!.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    toast.success('Your ad has been posted successfully!');
    navigate('/');
  };

  const canProceed = () => {
    if (currentStep === 0) return photos.length > 0;
    if (currentStep === 1) return formData.title && formData.make && formData.model;
    if (currentStep === 2) return formData.price;
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${i <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {i < currentStep ? <Check className="h-5 w-5" /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`w-12 md:w-20 h-1 mx-2 ${i < currentStep ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card-elevated p-6">
              {currentStep === 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Upload Photos</h2>
                  <p className="text-muted-foreground mb-6">Clean car, good lighting for best results</p>
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <span className="text-muted-foreground">Click to upload photos</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  {photos.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {photos.map((p, i) => <img key={i} src={p} className="w-full h-20 object-cover rounded-lg" />)}
                    </div>
                  )}
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                  <input placeholder="Ad Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <select value={formData.make} onChange={(e) => setFormData({ ...formData, make: e.target.value })} className="input-field">
                      <option value="">Select Make</option>
                      {carMakes.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <input placeholder="Model" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} className="input-field" />
                    <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} className="input-field" />
                    <input placeholder="Mileage (km)" value={formData.mileage} onChange={(e) => setFormData({ ...formData, mileage: e.target.value })} className="input-field" />
                    <select value={formData.fuelType} onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })} className="input-field">
                      <option value="">Fuel Type</option>
                      {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <select value={formData.transmission} onChange={(e) => setFormData({ ...formData, transmission: e.target.value })} className="input-field">
                      <option value="">Transmission</option>
                      {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Set Your Price</h2>
                  <input type="number" placeholder="Price (PKR)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input-field w-full text-2xl" />
                  <textarea placeholder="Description (optional)" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field w-full h-32 resize-none" />
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Feature Your Ad</h2>
                  <div onClick={() => setIsFeatured(true)} className={`p-4 rounded-xl border-2 cursor-pointer ${isFeatured ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    <div className="flex items-center gap-3"><Star className="h-6 w-6 text-primary" /><div><p className="font-semibold">Featured Ad - PKR 200</p><p className="text-sm text-muted-foreground">Get more visibility</p></div></div>
                  </div>
                  <div onClick={() => setIsFeatured(false)} className={`p-4 rounded-xl border-2 cursor-pointer ${!isFeatured ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    <p className="font-semibold">Simple Ad - Free</p><p className="text-sm text-muted-foreground">Standard listing</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setCurrentStep((s) => s - 1)} disabled={currentStep === 0}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()}>Next<ArrowRight className="h-4 w-4 ml-2" /></Button>
            ) : (
              <Button onClick={handleSubmit}>Post Ad<Check className="h-4 w-4 ml-2" /></Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
