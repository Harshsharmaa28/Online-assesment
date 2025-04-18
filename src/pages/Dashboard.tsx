
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '@/integrations/supabase/types';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

type CompanyAccess = {
  company: Tables<'companies'>;
  expiresAt: string | null;
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  
  const { data: accessibleCompanies, isLoading: loadingCompanies } = useQuery({
    queryKey: ['user-companies', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Get user access records
      const { data: accessData, error: accessError } = await supabase
        .from('user_access')
        .select('*')
        .eq('user_id', user.id);
      
      if (accessError) throw accessError;
      
      if (!accessData || accessData.length === 0) return [];
      
      // For each access record, get the company details
      const companies: CompanyAccess[] = [];
      
      for (const access of accessData) {
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', access.company_id)
          .single();
        
        if (!companyError && companyData) {
          companies.push({
            company: companyData,
            expiresAt: access.expires_at
          });
        }
      }
      
      return companies;
    },
    enabled: !!user,
  });

  const { data: paymentHistory, isLoading: loadingPayments } = useQuery({
    queryKey: ['user-payments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <Button asChild>
              <Link to="/companies">Browse More Companies</Link>
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Access Passes</h2>
            {loadingCompanies ? (
              <div className="flex justify-center py-10">
                <Loader className="h-6 w-6 animate-spin" />
              </div>
            ) : accessibleCompanies && accessibleCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessibleCompanies.map((item) => (
                  <Card key={item.company.id}>
                    <CardHeader>
                      <CardTitle>{item.company.name}</CardTitle>
                      <CardDescription>
                        {item.expiresAt ? (
                          <>Access expires: {new Date(item.expiresAt).toLocaleDateString()}</>
                        ) : (
                          <>Lifetime access</>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{item.company.document_count} documents available</p>
                      <Button asChild className="w-full">
                        <Link to={`/company/${item.company.id}`}>View Documents</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Access Passes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">You don't have access to any company documents yet.</p>
                  <Button asChild className="w-full">
                    <Link to="/companies">Browse Companies</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
            {loadingPayments ? (
              <div className="flex justify-center py-10">
                <Loader className="h-6 w-6 animate-spin" />
              </div>
            ) : paymentHistory && paymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You haven't made any payments yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
