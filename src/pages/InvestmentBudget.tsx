
import React from 'react';
import Layout from '@/components/Layout';
import InvestmentResources from '@/components/InvestmentResources';

const InvestmentBudget = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-center mb-2">Investment & Budgeting Resources</h1>
        <p className="text-center text-gray-600 mb-8">
          Learn about tax-saving investments and effective budgeting strategies
        </p>
        <InvestmentResources />
      </div>
    </Layout>
  );
};

export default InvestmentBudget;
