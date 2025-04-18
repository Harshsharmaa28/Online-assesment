
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="text-xl font-bold flex items-center gap-2">
              <span className="text-secondary">Assess</span>Vault Pro
            </Link>
            <p className="mt-4 text-gray-400">
              Prepare for tech assessments with real company questions.
              Ace your interviews with confidence.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/companies" className="text-gray-400 hover:text-secondary">Company Questions</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-secondary">Pricing</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-secondary">Blog</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-secondary">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-secondary">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-secondary">Careers</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-secondary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-secondary">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-secondary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} AssessVault Pro. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-secondary">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-secondary">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-secondary">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
