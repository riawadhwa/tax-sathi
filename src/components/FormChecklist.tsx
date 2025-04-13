
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FormRequirement {
  id: string;
  formName: string;
  description: string;
  applicableTo: string[];
  documents: {
    name: string;
    description: string;
    required: boolean;
  }[];
}

const FormChecklist = () => {
  const formRequirements: FormRequirement[] = [
    {
      id: 'itr1',
      formName: 'ITR-1 (Sahaj)',
      description: 'For individuals having income from salary, one house property, other sources (interest etc.) and total income upto ₹50 lakhs',
      applicableTo: ['individual'],
      documents: [
        { name: 'Form 16', description: 'TDS Certificate from your employer', required: true },
        { name: 'Form 16A', description: 'TDS Certificate for income other than salary', required: false },
        { name: 'Bank Interest Statement', description: 'Interest earned from savings accounts', required: true },
        { name: 'FD Interest Statement', description: 'Interest earned from fixed deposits', required: false },
        { name: 'House Property Details', description: 'If you have income/loss from one house property', required: false },
        { name: 'Investment Proofs', description: 'For claiming deductions under Section 80C, 80D, etc.', required: false },
      ],
    },
    {
      id: 'itr2',
      formName: 'ITR-2',
      description: 'For individuals and HUFs not having income from profits and gains of business or profession',
      applicableTo: ['individual', 'startup'],
      documents: [
        { name: 'Form 16', description: 'TDS Certificate from your employer', required: true },
        { name: 'Capital Gains Statements', description: 'For income from sale of investments or property', required: true },
        { name: 'Form 26AS', description: 'Tax Credit Statement', required: true },
        { name: 'Interest Income Details', description: 'Bank, NSC, and other interest income', required: true },
        { name: 'Rental Income Details', description: 'For income from house property', required: false },
        { name: 'Dividend Statements', description: 'Dividend income received during the financial year', required: false },
        { name: 'Foreign Income Details', description: 'Income earned from foreign sources', required: false },
      ],
    },
    {
      id: 'itr3',
      formName: 'ITR-3',
      description: 'For individuals and HUFs having income from profits and gains of business or profession',
      applicableTo: ['business', 'startup'],
      documents: [
        { name: 'Balance Sheet', description: 'Statement of assets and liabilities', required: true },
        { name: 'Profit & Loss Statement', description: 'Statement of income and expenses', required: true },
        { name: 'Bank Statements', description: 'For all business accounts', required: true },
        { name: 'Tax Audit Report', description: 'If turnover exceeds prescribed limits', required: false },
        { name: 'GST Returns', description: 'If registered under GST', required: false },
        { name: 'Depreciation Schedule', description: 'For claiming depreciation on business assets', required: false },
        { name: 'Form 26AS', description: 'Tax Credit Statement', required: true },
        { name: 'Capital Gains Statements', description: 'If applicable', required: false },
      ],
    },
    {
      id: 'itr4',
      formName: 'ITR-4 (Sugam)',
      description: 'For presumptive income from business & profession',
      applicableTo: ['business'],
      documents: [
        { name: 'Sales/Turnover Details', description: 'Total turnover or gross receipts', required: true },
        { name: 'Bank Statements', description: 'For all business accounts', required: true },
        { name: 'Form 26AS', description: 'Tax Credit Statement', required: true },
        { name: 'Purchase Invoices', description: 'Major purchases if available', required: false },
        { name: 'Sales Invoices', description: 'Major sales if available', required: false },
        { name: 'Investment Proofs', description: 'For claiming deductions', required: false },
      ],
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Tax Form Requirements Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="business">Business Owner</TabsTrigger>
            <TabsTrigger value="startup">Startup Founder</TabsTrigger>
          </TabsList>
          
          {['individual', 'business', 'startup'].map((userType) => (
            <TabsContent key={userType} value={userType}>
              <Accordion type="single" collapsible className="w-full">
                {formRequirements
                  .filter(form => form.applicableTo.includes(userType))
                  .map(form => (
                    <AccordionItem key={form.id} value={form.id}>
                      <AccordionTrigger className="text-lg font-medium">{form.formName}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p className="text-gray-600">{form.description}</p>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-taxBlue">Required Documents:</h4>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                              {form.documents
                                .filter(doc => doc.required)
                                .map(doc => (
                                  <li key={doc.name} className="text-gray-700">
                                    <span className="font-medium">{doc.name}</span>
                                    <p className="ml-5 text-sm text-gray-500">{doc.description}</p>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>

                          {form.documents.some(doc => !doc.required) && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-700">Additional Documents (If Applicable):</h4>
                              <ul className="list-disc list-inside space-y-2 pl-2">
                                {form.documents
                                  .filter(doc => !doc.required)
                                  .map(doc => (
                                    <li key={doc.name} className="text-gray-700">
                                      <span className="font-medium">{doc.name}</span>
                                      <p className="ml-5 text-sm text-gray-500">{doc.description}</p>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FormChecklist;
