
import React from 'react';
import Layout from '@/components/Layout';
import TaxCalculator from '@/components/TaxCalculator';

const Calculator = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-center mb-2">Tax Calculator</h1>
        <p className="text-center text-gray-600 mb-8">
          Calculate your taxes based on your income, deductions, and user type
        </p>
        <TaxCalculator />
      </div>
    </Layout>
  );
};

export default Calculator;
