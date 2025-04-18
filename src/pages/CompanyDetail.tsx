
import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Loader, FileText, Check, AlertTriangle } from 'lucide-react';
import QRCode from '@/components/QRCode';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Check if user has access to this company
  const { data: hasAccess, isLoading: loadingAccess } = useQuery({
    queryKey: ['user-access', user?.id, id],
    queryFn: async () => {
      if (!user || !id) return false;
      
      const { data, error } = await supabase
        .from('user_access')
        .select('*')
        .eq('user_id', user.id)
        .eq('company_id', id)
        .maybeSingle();
      
      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!id,
  });
  
  // Get company details
  const { data: company, isLoading: loadingCompany } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      if (!id) throw new Error('Company ID is missing');
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
  
  // Get company documents
  const { data: documents, isLoading: loadingDocuments } = useQuery({
    queryKey: ['company-documents', id, hasAccess],
    queryFn: async () => {
      if (!id || !hasAccess) return [];
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('company_id', id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!id && !!hasAccess,
  });
  
  // Simulate payment processing
  const handlePaymentComplete = async () => {
    if (!user || !id || !company) return;
    
    try {
      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: company.price,
          status: 'completed',
          payment_date: new Date().toISOString(),
        });
      
      if (paymentError) throw paymentError;
      
      // Grant access
      const { error: accessError } = await supabase
        .from('user_access')
        .insert({
          user_id: user.id,
          company_id: id,
        });
      
      if (accessError) throw accessError;
      
      toast({
        title: 'Payment successful!',
        description: `You now have access to ${company.name} documents.`,
      });
      
      setShowPaymentModal(false);
      setTimeout(() => window.location.reload(), 1000); // Reload to update access state
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: 'Payment failed',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  if (loading || loadingAccess || loadingCompany) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!company) {
    return <Navigate to="/companies" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                  <p className="mt-2 text-gray-600">{company.description}</p>
                </div>
                {hasAccess ? (
                  <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                    <Check className="mr-2 h-5 w-5" />
                    Access Granted
                  </div>
                ) : (
                  <Button onClick={() => setShowPaymentModal(true)}>
                    Purchase Access (${company.price})
                  </Button>
                )}
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Documents ({company.document_count})</h2>
                </div>
                
                {!hasAccess ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Required</h3>
                    <p className="mt-2 text-gray-600">
                      Purchase access to view these assessment questions.
                    </p>
                    <Button onClick={() => setShowPaymentModal(true)} className="mt-4">
                      Purchase Access
                    </Button>
                  </div>
                ) : loadingDocuments ? (
                  <div className="flex justify-center py-10">
                    <Loader className="h-6 w-6 animate-spin" />
                  </div>
                ) : documents && documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{doc.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500 mb-4">
                            {doc.description || 'No description available'}
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => window.open(`/document/${doc.id}`, '_blank')}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Document
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p>No documents available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
            <p className="mb-6">
              Scan the QR code below to pay ${company.price} for access to {company.name} assessment documents.
            </p>
            
            <div className="flex justify-center mb-6">
              <QRCode value={`payment_for_company_${company.id}`} size={200} />
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </Button>
              <Button onClick={handlePaymentComplete}>
                I've Completed Payment
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default CompanyDetail;
