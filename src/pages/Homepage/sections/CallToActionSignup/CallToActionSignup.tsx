import React, { useState } from 'react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    companySize: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    companySize: ''
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      companySize: ''
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Company size is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-started" className="py-16 bg-gray-100 relative overflow-hidden">
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
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side: CTA content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Start Enhancing Sales Conversations Today
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Unlock the power of AI-assisted sales conversations and see immediate improvements in your team's performance.
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg text-gray-800">With your free trial, you'll get:</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mt-1 text-indigo-800 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <img src="/api/placeholder/40/40" alt="Trust seal" className="w-10 h-10" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Data Security Certified</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">4.9/5 from 1,200+ reviews</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 items-center">
                <p className="text-sm text-gray-700 flex items-center">
                  <span className="font-bold">Trusted by:</span>
                </p>
                <div className="flex flex-wrap gap-6">
                  <img src="/api/placeholder/120/30" alt="Company Logo" className="h-8 opacity-70 hover:opacity-100 transition-all" />
                  <img src="/api/placeholder/120/30" alt="Company Logo" className="h-8 opacity-70 hover:opacity-100 transition-all" />
                  <img src="/api/placeholder/120/30" alt="Company Logo" className="h-8 opacity-70 hover:opacity-100 transition-all" />
                </div>
              </div>
            </div>
            
            {/* Right side: Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl p-8">
                {!isSubmitted ? (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Get Started Free</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Work Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 outline-none transition-all`}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                          Company Size
                        </label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.companySize ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 outline-none transition-all`}
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
                            {errors.companySize}
                          </p>
                        )}
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition-all flex justify-center items-center"
                          aria-label="Start free trial"
                        >
                          {isSubmitting ? 'Starting your trial...' : 'Start Your Free Trial'}
                        </button>
                      </div>
                      
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
                          className="text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-medium py-2 px-4 rounded-lg text-center transition-all"
                        >
                          Schedule a Demo
                        </a>
                        <a 
                          href="#contact-sales" 
                          className="text-indigo-700 border border-indigo-700 hover:bg-indigo-700 hover:text-white font-medium py-2 px-4 rounded-lg text-center transition-all"
                        >
                          Contact Sales
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Welcome aboard!</h3>
                    <p className="text-gray-600 mb-6">
                      We've sent a confirmation email to your inbox with your login details and next steps.
                    </p>
                    <div className="flex flex-col space-y-4">
                      <a 
                        href="#check-email" 
                        className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition-all"
                      >
                        Check Your Email
                      </a>
                      <a 
                        href="#help" 
                        className="text-indigo-900 hover:underline"
                      >
                        Need help getting started?
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  className="text-indigo-900 hover:underline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-900 rounded-lg p-1"
                  onClick={() => {
                    // Open FAQ modal logic here
                    console.log('FAQ clicked');
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
    </section>
  );
};

export default CallToActionSignup;