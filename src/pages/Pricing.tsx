
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingOption = ({ 
  title, 
  price, 
  benefits, 
  isPopular = false,
  actionText = "Get Started",
  actionLink = "/companies"
}: { 
  title: string;
  price: string;
  benefits: string[];
  isPopular?: boolean;
  actionText?: string;
  actionLink?: string;
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isPopular ? 'ring-2 ring-primary scale-105' : ''}`}>
      {isPopular && (
        <div className="bg-primary text-white text-center py-2 font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="mt-4">
          <span className="text-3xl font-extrabold text-gray-900">{price}</span>
        </div>
        
        <ul className="mt-6 space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex">
              <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
              <span className="text-gray-600">{benefit}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <Button asChild className={`w-full ${isPopular ? '' : 'bg-secondary hover:bg-secondary/90'}`}>
            <Link to={actionLink}>{actionText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you and get access to company-specific assessment questions.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-1 rounded-full flex items-center shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-6 rounded-full focus:outline-none ${
                  billingCycle === 'monthly' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`py-2 px-6 rounded-full focus:outline-none ${
                  billingCycle === 'yearly' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly <span className="text-sm">(Save 20%)</span>
              </button>
            </div>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingOption 
              title="Per Company" 
              price={billingCycle === 'monthly' ? '$19' : '$182'}
              benefits={[
                "Access to one company's questions",
                "Secure document viewer",
                "30-day access",
                "No download restrictions",
                "Access on all your devices"
              ]}
              actionText="Browse Companies"
            />
            
            <PricingOption 
              title="Premium" 
              price={billingCycle === 'monthly' ? '$49' : '$470'}
              benefits={[
                "Access to 5 companies of your choice",
                "Secure document viewer",
                "60-day access",
                "Priority support",
                "Access on all your devices"
              ]}
              isPopular={true}
            />
            
            <PricingOption 
              title="All Access" 
              price={billingCycle === 'monthly' ? '$99' : '$950'}
              benefits={[
                "Access to ALL companies",
                "Secure document viewer",
                "90-day access",
                "Priority support",
                "Regular updates with new questions",
                "Access on all your devices"
              ]}
              actionText="Get Unlimited Access"
            />
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 text-left space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">How do I access the questions?</h3>
                <p className="mt-2 text-gray-600">
                  After purchasing, you'll have immediate access to view the questions in our secure document viewer. You can access them from any device with an internet connection.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Can I download or print the questions?</h3>
                <p className="mt-2 text-gray-600">
                  To protect our content, downloading and printing are not allowed. However, you can access the questions as many times as you need during your subscription period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">How often is the content updated?</h3>
                <p className="mt-2 text-gray-600">
                  We regularly update our question bank with new content. Premium and All Access subscribers get immediate access to new questions as they're added.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you offer refunds?</h3>
                <p className="mt-2 text-gray-600">
                  We offer a 7-day money-back guarantee if you're not satisfied with the quality of our content. Contact our support team for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
