"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, CreditCard, Shield, ArrowLeft } from 'lucide-react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'pro';
  
  const [selectedPlan, setSelectedPlan] = useState(plan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  const plans = {
    entry: {
      name: 'Entry',
      monthly: 0,
      annual: 0,
      features: ['Structure Analysis (Free)', 'Basic Reports', 'Email Support']
    },
    pro: {
      name: 'Pro',
      monthly: 79,
      annual: 790,
      features: ['Everything in Entry', 'Culture Analysis', 'Skills Analysis', 'Advanced Reports', 'Priority Support']
    },
    'pro-plus': {
      name: 'Pro+',
      monthly: 8, // per employee
      annual: 80, // per employee
      features: ['Everything in Pro', 'Employee Surveys', 'Advanced Analytics', 'Custom Reports', 'Dedicated Support']
    }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans];
  const discount = billingCycle === 'annual' ? 0.15 : 0; // 15% annual discount
  const finalPrice = billingCycle === 'annual' 
    ? currentPlan.annual * (1 - discount)
    : currentPlan.monthly;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Integrate with Stripe for actual payment processing
    // Example Stripe integration:
    /*
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          billingCycle,
          amount: finalPrice * 100, // Stripe expects cents
        })
      });
      
      const { clientSecret } = await response.json();
      
      // Use Stripe Elements to confirm payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        }
      });
      
      if (error) {
        setError(error.message);
      } else {
        // Payment successful - redirect to dashboard
        router.push('/client/dashboard?payment=success');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    }
    */
    
    // For demo purposes, simulate successful payment
    alert(`Payment processing would be integrated here for ${selectedPlan} plan at $${finalPrice}/${billingCycle === 'annual' ? 'year' : 'month'}\n\nNext steps:\n1. Integrate Stripe payment processing\n2. Create customer account\n3. Activate subscription\n4. Send welcome email\n5. Redirect to client dashboard`);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/companies/pricing" className="flex items-center text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pricing
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column - Plan Selection */}
          <div>
            <h1 className="text-4xl font-light text-slate-900 mb-8">Complete Your Order</h1>
            
            {/* Plan Selection */}
            <div className="bg-slate-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-light text-slate-900 mb-6">Selected Plan</h2>
              
              {Object.entries(plans).map(([key, planData]) => (
                <div
                  key={key}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-4 ${
                    selectedPlan === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedPlan(key)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-slate-900">{planData.name}</h3>
                      <p className="text-slate-600">
                        {key === 'pro-plus' ? 'Per employee/month' : 'Per month'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-light text-slate-900">
                        ${billingCycle === 'annual' ? planData.annual : planData.monthly}
                      </div>
                      {billingCycle === 'annual' && (
                        <div className="text-sm text-green-600">Save 15%</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Billing Cycle */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Billing Cycle</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      billingCycle === 'monthly'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-medium">Monthly</div>
                    <div className="text-sm text-slate-600">Pay monthly</div>
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`p-4 rounded-xl border-2 text-center transition-all relative ${
                      billingCycle === 'annual'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      15% OFF
                    </div>
                    <div className="font-medium">Annual</div>
                    <div className="text-sm text-slate-600">2 months free</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-medium text-slate-900 mb-4">What's Included</h3>
              <div className="space-y-3">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-light text-slate-900 mb-6">Payment Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-3">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Credit Card</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Shield className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Bank Transfer</div>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Company Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-slate-50 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Plan: {currentPlan.name}</span>
                      <span>${billingCycle === 'annual' ? currentPlan.annual : currentPlan.monthly}</span>
                    </div>
                    {billingCycle === 'annual' && discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Annual Discount (15%)</span>
                        <span>-${(currentPlan.annual * discount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 pt-2 mt-2">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${finalPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-slate-600 text-right">
                        per {billingCycle === 'annual' ? 'year' : 'month'}
                        {selectedPlan === 'pro-plus' && ' per employee'}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-4 px-8 rounded-xl font-medium hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Complete Payment - ${finalPrice.toFixed(2)}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By clicking "Complete Payment", you agree to our Terms of Service and Privacy Policy. 
                  Your payment information is secure and encrypted.
                </p>
              </form>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center mt-6 text-sm text-slate-500">
              <Shield className="w-4 h-4 mr-2" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
