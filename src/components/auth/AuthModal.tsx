import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

type Step = 'phone' | 'otp' | 'profile';

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, completeProfile } = useAuth();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    if (otp.every((digit) => digit !== '')) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        login(phone);
        setStep('profile');
      }, 1000);
    }
  };

  const handleProfileSubmit = () => {
    if (name.trim()) {
      completeProfile(name, email || undefined);
      resetForm();
    }
  };

  const resetForm = () => {
    setStep('phone');
    setPhone('');
    setOtp(['', '', '', '']);
    setName('');
    setEmail('');
  };

  const handleClose = () => {
    setShowAuthModal(false);
    localStorage.setItem('ridezone_seen_modal', 'true');
    resetForm();
  };

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-elevated overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Sign up to sell your car
                  </h2>
                  <p className="text-muted-foreground">
                    Get the best price on RideZone
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                      <span className="text-lg">+92</span>
                      <div className="w-px h-6 bg-border" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="3XX XXXXXXX"
                      className="input-field w-full pl-20"
                    />
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePhoneSubmit}
                    disabled={phone.length < 10 || isLoading}
                  >
                    {isLoading ? 'Sending OTP...' : 'Continue'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Enter OTP
                  </h2>
                  <p className="text-muted-foreground">
                    Code sent to +92 {phone}
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-14 h-14 text-center text-2xl font-bold input-field"
                    />
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleOtpSubmit}
                  disabled={!otp.every((d) => d !== '') || isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                  <Check className="h-4 w-4 ml-2" />
                </Button>

                <button
                  onClick={() => setStep('phone')}
                  className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Change phone number
                </button>
              </motion.div>
            )}

            {step === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Complete Your Profile
                  </h2>
                  <p className="text-muted-foreground">
                    Just a few more details
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <div className="input-field w-full flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      +92 {phone}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input-field w-full"
                    />
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleProfileSubmit}
                    disabled={!name.trim()}
                  >
                    Complete Sign Up
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
