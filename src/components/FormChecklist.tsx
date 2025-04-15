import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';

interface FormRequirement {
  id: string;
  formName: string;
  description: string;
  applicableTo: string[];
  formUrl: string;
  instructionsUrl?: string;
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
      formUrl: 'https://www.incometax.gov.in/iec/foportal/sites/default/files/2025-03/ITR1_AY_24-25_V1.5.zip',
      instructionsUrl: 'https://www.incometax.gov.in/iec/foportal/help/how-to-file-itr1-form-sahaj',
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
      formUrl: 'https://www.incometax.gov.in/iec/foportal/sites/default/files/2025-04/ITR2_AY_24-25_V1.12.zip',
      instructionsUrl: 'https://www.incometax.gov.in/iec/foportal/help/how-to-file-itr2-form',
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
      formUrl: 'https://www.incometax.gov.in/iec/foportal/sites/default/files/2025-04/ITR3_AY_24-2_V1.12.zip',
      instructionsUrl: 'https://www.incometax.gov.in/iec/foportal/sites/default/files/2021-02/Instructions_ITR3_AY2020_21_V1_0.pdf',
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
      formUrl: 'https://www.incometax.gov.in/iec/foportal/sites/default/files/2025-01/ITR4_AY_24-25_V1.7.zip',
      instructionsUrl: 'https://www.incometax.gov.in/iec/foportal/help/how-to-file-itr4-form-sugam',
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

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

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
                     <div className="flex items-center justify-between">
                      <AccordionTrigger className="text-lg font-medium hover:no-underline flex-1 text-left">
                            {form.formName}
                            </AccordionTrigger>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="ml-4"
                              onClick={() => handleDownload(form.formUrl)}
                            >
                              <DownloadIcon className="mr-2 h-4 w-4" />
                               Download Form
                           </Button>
                               </div>
                              <AccordionContent>
                        <div className="space-y-4">
                          <p className="text-gray-600">{form.description}</p>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownload(form.formUrl)}
                            >
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              Download Form
                            </Button>
                            {form.instructionsUrl && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDownload(form.instructionsUrl!)}
                              >
                                <DownloadIcon className="mr-2 h-4 w-4" />
                                Download Instructions
                              </Button>
                            )}
                          </div>
                          
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