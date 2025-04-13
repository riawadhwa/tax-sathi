
import React from 'react';
import Layout from '@/components/Layout';
import TaxChecklist from '@/components/TaxChecklist';

const FilingChecklist = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-center mb-2">Document Checklist</h1>
        <p className="text-center text-gray-600 mb-8">
          Track your progress and ensure you have all necessary documents for tax filing
        </p>
        <TaxChecklist />
      </div>
    </Layout>
  );
};

export default FilingChecklist;
