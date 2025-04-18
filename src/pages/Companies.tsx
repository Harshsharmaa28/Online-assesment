
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Mock data for companies
const companies = [
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
  {
    id: "meta",
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png",
    questionCount: 110,
    difficulty: "Hard" as const,
    isPremium: true,
    tags: ["Data Structures", "Algorithms", "Behavioral"]
  },
  {
    id: "apple",
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png",
    questionCount: 80,
    difficulty: "Medium" as const,
    isPremium: true,
    tags: ["System Design", "iOS", "Algorithms"]
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/800px-Netflix_2015_logo.svg.png",
    questionCount: 60,
    difficulty: "Hard" as const,
    isPremium: true,
    tags: ["System Design", "Algorithms", "Culture Fit"]
  },
  {
    id: "salesforce",
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
    questionCount: 70,
    difficulty: "Medium" as const,
    isPremium: false,
    tags: ["Cloud Computing", "Apex", "Coding"]
  },
  {
    id: "adobe",
    name: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/800px-Adobe_Corporate_Logo.png",
    questionCount: 55,
    difficulty: "Medium" as const,
    isPremium: false,
    tags: ["Algorithms", "Problem Solving", "Design Patterns"]
  }
];

const Companies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Assessment Questions by Company</h1>
            <p className="text-gray-600 mt-2">
              Browse our collection of real technical assessment questions from top companies.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search companies or skills..." 
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={18} /> 
                  More Filters
                  <ChevronDown size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Companies;
