
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TaxCalculator from '@/components/TaxCalculator';
import TaxOnboarding from '@/components/TaxOnboarding';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Calculator = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user has completed profile setup
  useEffect(() => {
    if (user) {
      const checkProfileCompletion = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error checking profile:', error);
            return;
          }
          
          // If user has a profile with key information, skip onboarding
          if (data && data.full_name && data.pan_number) {
            setShowOnboarding(false);
          }
        } catch (err) {
          console.error("Failed to check profile:", err);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkProfileCompletion();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    toast({
      title: "Profile Complete",
      description: "Your tax profile has been set up successfully.",
    });
  };
  
  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-taxBlue"></div>
            </div>
          ) : showOnboarding ? (
            <TaxOnboarding onComplete={handleOnboardingComplete} />
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center mb-2">Tax Calculator</h1>
              <p className="text-center text-gray-600 mb-8">
                Calculate your taxes based on your income, deductions, and user type
              </p>
              <TaxCalculator />
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Calculator;
