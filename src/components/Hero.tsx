
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="hero-gradient text-white py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ace Your Technical Interviews with Real Assessment Questions
            </h1>
            <p className="text-lg mb-8 text-gray-200 max-w-md">
              Get exclusive access to company-specific assessment questions that help you prepare 
              for technical interviews at top tech companies.
            </p>
            <div className="flex gap-4">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="font-semibold"
              >
                <Link to="/companies">
                  Browse Companies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white/10 p-6 rounded-lg border border-white/20 shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Featured Companies</h3>
              <ul className="space-y-3">
                {["Google", "Amazon", "Microsoft", "Meta", "Apple"].map((company) => (
                  <li key={company} className="flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    <span>{company} Assessment Questions</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white/5 rounded-md">
                <p className="text-sm text-gray-300">
                  "AssessVault Pro helped me prepare for my Google interview with real questions. I got the job!"
                </p>
                <p className="text-sm font-semibold mt-2">— Sarah J., Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
