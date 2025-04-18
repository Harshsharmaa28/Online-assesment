
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Star } from "lucide-react";

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  questionCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
  isPremium: boolean;
  tags: string[];
}

const CompanyCard = ({
  id,
  name,
  logo,
  questionCount,
  difficulty,
  isPremium,
  tags,
}: CompanyCardProps) => {
  // Map difficulty to colors
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }[difficulty];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 border-b relative">
        {isPremium && (
          <Badge className="absolute top-4 right-4 bg-amber-500">Premium</Badge>
        )}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-md">
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">{name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <FileText className="w-4 h-4 mr-1" />
              <span>{questionCount} Questions</span>
              <span className="mx-2">•</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${difficultyColor}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-gray-100/50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <Button asChild size="sm">
            <Link to={`/company/${id}`}>View Questions</Link>
          </Button>
          
          <button className="flex items-center text-gray-400 hover:text-yellow-500">
            <Star className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
