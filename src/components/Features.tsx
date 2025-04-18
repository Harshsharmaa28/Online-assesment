
import { ShieldCheck, Search, Target, Users, Clock, Award } from "lucide-react";

const features = [
  {
    title: "Real Company Questions",
    description:
      "Access real assessment questions used by top tech companies in their interviews.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Viewing",
    description:
      "Our secure platform prevents copying, ensuring questions remain exclusive to subscribers.",
    icon: Search,
  },
  {
    title: "Company-Specific Prep",
    description:
      "Target your preparation for specific companies with dedicated question banks.",
    icon: Target,
  },
  {
    title: "Active Community",
    description:
      "Join a community of job seekers sharing tips and success stories.",
    icon: Users,
  },
  {
    title: "Updated Regularly",
    description:
      "Questions are updated regularly from recent interviews to keep content fresh.",
    icon: Clock,
  },
  {
    title: "Success Stories",
    description:
      "Our members have landed jobs at top tech companies worldwide.",
    icon: Award,
  },
];

const Features = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Why Choose AssessVault Pro</h2>
          <p className="text-gray-600 mt-2 max-w-lg mx-auto">
            Our platform offers unique advantages to help you ace your technical interviews.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
