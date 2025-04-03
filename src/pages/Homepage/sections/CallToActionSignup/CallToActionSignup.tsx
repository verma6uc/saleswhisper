
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yup } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfettiExplosion from 'react-confetti';

interface FormData {
  email: string;
  companySize: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  companySize: yup.string().required('Company size is required'),
});

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501+', label: '501+ employees' },
];

const benefits = [
  'AI-powered real-time sales conversation analysis',
  'Smart prompts guide reps through optimal talking points',
  'Instant access to contextual knowledge during calls',
  'Detailed analytics on conversation effectiveness',
  'Integrates with your existing CRM and tools',
];

const CallToActionSignup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      setShowConfetti(true);
      
      // Hide confetti after animation completes
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section id="get-started" className="py-16 md:py-20 lg:py-24 bg-[#ECEFF1] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L40 20 M20 0 L20 40" stroke="#1A237E" strokeWidth="1" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side: CTA content */}
            <div className="w-full lg:w-1/2">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-[#263238] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Start Enhancing Sales Conversations Today
              </motion.h2>
              
              <motion.p 
                className="text-lg text-[#263238] mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Unlock the power of AI-assisted sales conversations and see immediate improvements in your team's performance.
              </motion.p>
              
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-semibold text-lg text-[#263238]">With your free trial, you\'ll get:</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    >
                      <svg className="w-5 h-5 mt-1 text-[#4527A0] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-[#263238]">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center">
                  <img src="/assets/trust-seal.svg" alt="Trust seal" className="w-16 h-16" />
                  <span className="ml-2 text-sm font-medium text-[#263238]">Data Security Certified</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-[#263238]">4.9/5 from 1,200+ reviews</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-6 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-sm text-[#263238] flex items-center">
                  <span className="font-bold">Trusted by:</span>
                </p>
                <div className="flex flex-wrap gap-6">
                  <img src="/assets/company-logo-1.svg" alt="Company Logo" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
                  <img src="/assets/company-logo-2.svg" alt="Company Logo" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
                  <img src="/assets/company-logo-3.svg" alt="Company Logo" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
                </div>
              </motion.div>
            </div>
            
            {/* Right side: Form */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                className="bg-white rounded-xl shadow-xl p-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="signupForm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="text-2xl font-bold text-[#263238] mb-6">Get Started Free</h3>
                      
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium text-[#263238]">
                            Work Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={cn(
                              "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#1A237E] focus:border-[#1A237E] outline-none transition-all",
                              errors.email ? "border-red-500" : "border-gray-300"
                            )}
                            aria-describedby={errors.email ? "email-error" : undefined}
                          />
                          {errors.email && (
                            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="companySize" className="block text-sm font-medium text-[#263238]">
                            Company Size
                          </label>
                          <select
                            id="companySize"
                            {...register('companySize')}
                            className={cn(
                              "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#1A237E] focus:border-[#1A237E] outline-none transition-all",
                              errors.companySize ? "border-red-500" : "border-gray-300"
                            )}
                            aria-describedby={errors.companySize ? "company-size-error" : undefined}
                          >
                            <option value="">Select company size</option>
                            {companySizeOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.companySize && (
                            <p id="company-size-error" className="text-red-500 text-sm mt-1" role="alert">
                              {errors.companySize.message}
                            </p>
                          )}
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="pt-2"
                        >
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#1A237E] hover:bg-[#4527A0] text-white font-bold py-3 px-6 rounded-lg transition-all flex justify-center items-center relative overflow-hidden group"
                            aria-label="Start free trial"
                          >
                            <span className="relative z-10">
                              {isSubmitting ? 'Starting your trial...' : 'Start Your Free Trial'}
                            </span>
                            <span className="absolute right-full w-full h-full bg-[#4527A0] group-hover:right-0 transition-all duration-500 z-0"></span>
                          </button>
                        </motion.div>
                        
                        <div className="text-center text-sm text-gray-600">
                          <p className="mb-2">
                            <svg className="inline-block w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            No credit card required
                          </p>
                          <p>
                            <svg className="inline-block w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Cancel anytime
                          </p>
                        </div>
                      </form>
                      
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-center text-gray-600 mb-4">
                          Prefer to talk to a sales representative?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <a 
                            href="#schedule-demo" 
                            className="text-[#1A237E] border border-[#1A237E] hover:bg-[#1A237E] hover:text-white font-medium py-2 px-4 rounded-lg text-center transition-all"
                          >
                            Schedule a Demo
                          </a>
                          <a 
                            href="#contact-sales" 
                            className="text-[#4527A0] border border-[#4527A0] hover:bg-[#4527A0] hover:text-white font-medium py-2 px-4 rounded-lg text-center transition-all"
                          >
                            Contact Sales
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="successMessage"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#263238] mb-3">Welcome aboard!</h3>
                      <p className="text-gray-600 mb-6">
                        We\'ve sent a confirmation email to your inbox with your login details and next steps.
                      </p>
                      <div className="flex flex-col space-y-4">
                        <a 
                          href="#check-email" 
                          className="bg-[#1A237E] hover:bg-[#4527A0] text-white font-bold py-3 px-6 rounded-lg transition-all"
                        >
                          Check Your Email
                        </a>
                        <a 
                          href="#help" 
                          className="text-[#1A237E] hover:underline"
                        >
                          Need help getting started?
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <div className="mt-6 text-center">
                <button 
                  className="text-[#1A237E] hover:underline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1A237E] rounded-lg p-1"
                  onClick={() => {
                    // Open FAQ modal logic here
                  }}
                  aria-label="View frequently asked questions"
                >
                  Frequently Asked Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Confetti Effect */}
      {showConfetti && (
        <ConfettiExplosion
          width={1600}
          height={1200}
          particleCount={100}
          duration={3000}
        />
      )}
    </section>
  );
};

export default CallToActionSignup;
  