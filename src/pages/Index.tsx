
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Building, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import CompanyCard from "@/components/CompanyCard";

// Featured companies
const featuredCompanies = [
  {
    id: "google",
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png",
    questionCount: 120,
    difficulty: "Hard" as const,
    isPremium: true,
    tags: ["Algorithm", "System Design", "Coding"]
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    questionCount: 150,
    difficulty: "Hard" as const,
    isPremium: true,
    tags: ["Leadership Principles", "System Design", "Coding"]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/800px-Microsoft_logo.svg.png",
    questionCount: 100,
    difficulty: "Medium" as const,
    isPremium: true,
    tags: ["Problem Solving", "Object Oriented Design", "Coding"]
  },
];

// Pricing tiers
const pricingTiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Access to limited free questions",
    features: [
      "5 free questions per company",
      "Limited company access",
      "Basic question viewer",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Premium",
    price: "$29.99",
    period: "per month",
    description: "Full access to all company questions",
    features: [
      "Unlimited access to all questions",
      "Access to premium companies",
      "Advanced secure question viewer",
      "Download practice templates",
      "Personalized study plan",
    ],
    buttonText: "Get Premium",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199.99",
    period: "per month",
    description: "For teams and organizations",
    features: [
      "Everything in Premium",
      "Team member accounts",
      "Admin dashboard",
      "Custom company content",
      "API access",
      "24/7 priority support",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Featured Companies Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-primary">Featured Companies</h2>
              <p className="text-gray-600 mt-2">
                Explore our most popular question collections
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/companies">
                View All Companies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCompanies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Trusted by thousands of job seekers</h2>
            <p className="text-gray-300 mt-2 max-w-lg mx-auto">
              Join our community of successful candidates who landed their dream jobs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-secondary" />
              </div>
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-gray-400 mt-2">Active users</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Building className="h-10 w-10 text-secondary" />
              </div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-gray-400 mt-2">Top companies</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-10 w-10 text-secondary" />
              </div>
              <div className="text-4xl font-bold">5,000+</div>
              <div className="text-gray-400 mt-2">Assessment questions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Choose Your Plan</h2>
            <p className="text-gray-600 mt-2 max-w-lg mx-auto">
              Get access to premium assessment questions with our flexible pricing options.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg border ${
                  tier.popular ? 'border-secondary shadow-md relative' : 'border-gray-200'
                } overflow-hidden`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-secondary text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-6 ${tier.popular ? 'pt-10' : ''}`}>
                  <h3 className="text-xl font-semibold text-primary">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-gray-500 ml-2">{tier.period}</span>}
                  </div>
                  <p className="mt-2 text-gray-600">{tier.description}</p>
                  
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary shrink-0 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-8 ${tier.popular ? '!bg-secondary hover:!bg-secondary/90' : ''}`} 
                    variant={tier.buttonVariant as any}
                  >
                    {tier.buttonText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">What Our Users Say</h2>
            <p className="text-gray-600 mt-2 max-w-lg mx-auto">
              Success stories from those who landed their dream jobs using AssessVault Pro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <p className="italic text-gray-600">
                "I prepared for my Google interview using AssessVault Pro and found actual questions I had encountered in my assessment! The secure viewer was incredibly helpful too."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Software Engineer at Google</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <p className="italic text-gray-600">
                "The company-specific question banks helped me understand exactly what Amazon was looking for in their assessment. I couldn't have passed without this resource!"
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <div className="font-medium">Michael Chen</div>
                  <div className="text-sm text-gray-500">SDE II at Amazon</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <p className="italic text-gray-600">
                "Worth every penny. The questions in the Meta folder were almost identical to those in my actual assessment. The premium subscription was a great investment in my future."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <div className="font-medium">Jessica Rodriguez</div>
                  <div className="text-sm text-gray-500">Frontend Engineer at Meta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Technical Assessment?</h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
            Join thousands of successful job seekers who prepared with AssessVault Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link to="/companies">Browse Companies</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
