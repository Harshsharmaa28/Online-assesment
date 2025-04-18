
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <h1 className="text-3xl font-bold text-center text-primary mb-8">About AssessVault Pro</h1>
              
              <div className="prose max-w-none">
                <h2>Our Mission</h2>
                <p>
                  At AssessVault Pro, we are committed to helping job seekers excel in technical interviews by providing access to real assessment questions from top companies. Our platform organizes these questions in a structured, company-specific format to help you prepare effectively and confidently.
                </p>
                
                <h2>What We Offer</h2>
                <ul>
                  <li>
                    <strong>Comprehensive Question Bank:</strong> Access to thousands of real assessment questions organized by company.
                  </li>
                  <li>
                    <strong>Secure Viewing Environment:</strong> Our secure document viewer ensures that content remains protected while providing a smooth reading experience.
                  </li>
                  <li>
                    <strong>Company-Specific Insights:</strong> Understand the assessment style and focus areas of each company.
                  </li>
                  <li>
                    <strong>Regular Updates:</strong> Our database is continuously updated with the latest assessment questions.
                  </li>
                </ul>
                
                <h2>How It Works</h2>
                <ol>
                  <li>Create an account on AssessVault Pro</li>
                  <li>Browse our collection of companies</li>
                  <li>Purchase access to company-specific question banks</li>
                  <li>Study the questions in our secure viewer</li>
                  <li>Ace your technical assessments!</li>
                </ol>
                
                <h2>Our Commitment to Quality</h2>
                <p>
                  We verify and validate all content to ensure accuracy and relevance. Our team works diligently to maintain high standards for all the materials available on our platform.
                </p>
                
                <h2>Contact Us</h2>
                <p>
                  Have questions or feedback? We'd love to hear from you! Contact our support team at <a href="mailto:support@assessvaultpro.com" className="text-primary">support@assessvaultpro.com</a>.
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

export default About;
