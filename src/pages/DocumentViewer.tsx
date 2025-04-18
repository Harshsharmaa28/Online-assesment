
import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Loader, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DocumentViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  
  // Get document details
  const { data: document, isLoading: loadingDocument } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      if (!id || !user) throw new Error('Document ID or user is missing');
      
      const { data, error } = await supabase
        .from('documents')
        .select('*, companies:company_id(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id && !!user,
  });
  
  // Check if user has access
  const { data: hasAccess, isLoading: loadingAccess } = useQuery({
    queryKey: ['document-access', user?.id, document?.company_id],
    queryFn: async () => {
      if (!user || !document) return false;
      
      const { data, error } = await supabase
        .from('user_access')
        .select('*')
        .eq('user_id', user.id)
        .eq('company_id', document.company_id)
        .maybeSingle();
      
      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!document,
  });
  
  // Set up anti-screenshot measures
  useEffect(() => {
    if (!isProtectionActive) return;
    
    const preventActions = (e: Event) => {
      e.preventDefault();
      toast({
        title: "Action blocked",
        description: "Screenshots and downloads are not allowed",
        variant: "destructive",
      });
      return false;
    };
    
    // Prevent right-click
    document.addEventListener('contextmenu', preventActions);
    
    // Prevent keyboard shortcuts
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Prevent print and save shortcuts
      if (
        (e.ctrlKey && e.key === 'p') || // Ctrl+P (Print)
        (e.ctrlKey && e.key === 's') || // Ctrl+S (Save)
        (e.ctrlKey && e.shiftKey && e.key === 'i') || // Ctrl+Shift+I (Dev Tools)
        (e.key === 'PrintScreen') // Print Screen
      ) {
        e.preventDefault();
        toast({
          title: "Action blocked",
          description: "This action is not permitted for document security",
          variant: "destructive",
        });
        return false;
      }
    };
    
    document.addEventListener('keydown', preventKeyboardShortcuts);
    
    // Blur the document when window loses focus (potential screenshot attempt)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && iframeRef.current) {
        // Apply blur when tab is not active
        if (iframeRef.current.contentDocument) {
          iframeRef.current.contentDocument.body.style.filter = 'blur(10px)';
        }
      } else if (document.visibilityState === 'visible' && iframeRef.current) {
        // Remove blur when tab becomes active again
        if (iframeRef.current.contentDocument) {
          iframeRef.current.contentDocument.body.style.filter = 'none';
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('contextmenu', preventActions);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isProtectionActive]);
  
  if (loading || loadingDocument || loadingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!document) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (!hasAccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-lg text-gray-600 mb-6">You don't have access to view this document.</p>
            <Button asChild>
              <a href={`/company/${document.company_id}`}>Purchase Access</a>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  // In a real implementation, this would use the Google Drive Embed API or a similar secure viewer
  // For the prototype, we'll simulate an embedded PDF viewer
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="text-xl font-semibold">{document.title}</h1>
            <div>
              <Button 
                variant="outline" 
                onClick={() => setIsProtectionActive(!isProtectionActive)}
                className="mr-2"
              >
                {isProtectionActive ? 'Disable Protection' : 'Enable Protection'}
              </Button>
              <Button onClick={() => window.history.back()}>
                Back
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* This is where an actual document viewer would be integrated */}
            <div className="bg-gray-200 p-8 min-h-[800px] relative">
              <div className={`${isProtectionActive ? 'pointer-events-none' : ''}`}>
                <div className="bg-white p-8 shadow-md max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6 text-center">{document.title}</h2>
                  <div className="prose max-w-none">
                    <p>Document content would be displayed here using Google Drive Embed or a secure PDF viewer.</p>
                    <p>The actual implementation would load the document from Google Drive using the ID: {document.google_drive_id}</p>
                    <p>The viewer is configured with the following protective measures:</p>
                    <ul>
                      <li>Right-click disabled</li>
                      <li>Screenshot detection (blur on tab switch)</li>
                      <li>Print/Save keyboard shortcuts blocked</li>
                      <li>Download button removed</li>
                    </ul>
                    <p>
                      In a production implementation, additional measures would be applied such as:
                    </p>
                    <ul>
                      <li>Document watermarking with user information</li>
                      <li>Throttled page views to prevent mass downloading</li>
                      <li>Periodic visual noise overlays that render well to human eyes but disrupt OCR</li>
                      <li>Server-side access validation for each document request</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {isProtectionActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-white bg-black bg-opacity-10 rounded-lg p-6 transform rotate-30 shadow-lg">
                    <p className="text-2xl font-bold opacity-10">
                      {user.email} - {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentViewer;
