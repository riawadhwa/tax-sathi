
import React from 'react';
import Layout from '@/components/Layout';
import FormChecklist from '@/components/FormChecklist';

const FormChecklistPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-center mb-2">Tax Form Requirements</h1>
        <p className="text-center text-gray-600 mb-8">
          Know which documents you need for different tax forms based on your profile
        </p>
        <FormChecklist />
      </div>
    </Layout>
  );
};

export default FormChecklistPage;
