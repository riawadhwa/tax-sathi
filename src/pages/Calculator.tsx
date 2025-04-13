
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TaxCalculator from '@/components/TaxCalculator';
import TaxOnboarding from '@/components/TaxOnboarding';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';

const Calculator = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { user } = useAuth();
  
  // Check if user has completed profile setup
  useEffect(() => {
    if (user) {
      const checkProfileCompletion = async () => {
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
      };
      
      checkProfileCompletion();
    }
  }, [user]);
  
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };
  
  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto">
          {showOnboarding ? (
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
