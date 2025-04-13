
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type UserType = 'individual' | 'business' | 'startup';

interface FormField {
  id: string;
  label: string;
  type: 'number' | 'text';
  section?: string;
}

const TaxCalculator = () => {
  const [userType, setUserType] = useState<UserType>('individual');
  const [formData, setFormData] = useState<Record<string, number>>({
    salary: 0,
    otherIncome: 0,
    rentalIncome: 0,
    section80C: 0,
    section80D: 0,
    section80G: 0,
    businessIncome: 0,
    businessExpenses: 0,
    depreciation: 0,
    esopValue: 0,
    capitalGains: 0,
  });
  const [result, setResult] = useState<Record<string, number | string>>({
    taxableIncome: 0,
    taxAmount: 0,
    taxSlab: '',
    finalLiability: 0,
  });
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0,
    });
  };

  const calculateTax = () => {
    let taxableIncome = 0;
    let taxAmount = 0;
    let taxSlab = '';
    let finalLiability = 0;

    switch (userType) {
      case 'individual':
        taxableIncome = formData.salary + formData.otherIncome + formData.rentalIncome - 
                       (formData.section80C + formData.section80D + formData.section80G);
        
        // Basic tax slab calculation for individuals (simplified)
        if (taxableIncome <= 250000) {
          taxAmount = 0;
          taxSlab = '0%';
        } else if (taxableIncome <= 500000) {
          taxAmount = (taxableIncome - 250000) * 0.05;
          taxSlab = '5%';
        } else if (taxableIncome <= 1000000) {
          taxAmount = 12500 + (taxableIncome - 500000) * 0.2;
          taxSlab = '20%';
        } else {
          taxAmount = 112500 + (taxableIncome - 1000000) * 0.3;
          taxSlab = '30%';
        }
        break;

      case 'business':
        taxableIncome = formData.businessIncome - formData.businessExpenses - formData.depreciation;
        
        // Basic tax calculation for business (simplified)
        if (taxableIncome <= 250000) {
          taxAmount = 0;
          taxSlab = '0%';
        } else if (taxableIncome <= 500000) {
          taxAmount = (taxableIncome - 250000) * 0.05;
          taxSlab = '5%';
        } else if (taxableIncome <= 1000000) {
          taxAmount = 12500 + (taxableIncome - 500000) * 0.2;
          taxSlab = '20%';
        } else {
          taxAmount = 112500 + (taxableIncome - 1000000) * 0.3;
          taxSlab = '30%';
        }
        break;

      case 'startup':
        taxableIncome = formData.salary + formData.esopValue + formData.capitalGains - 
                       (formData.section80C + formData.section80D);
        
        // Basic tax calculation for startup founders (simplified)
        if (taxableIncome <= 250000) {
          taxAmount = 0;
          taxSlab = '0%';
        } else if (taxableIncome <= 500000) {
          taxAmount = (taxableIncome - 250000) * 0.05;
          taxSlab = '5%';
        } else if (taxableIncome <= 1000000) {
          taxAmount = 12500 + (taxableIncome - 500000) * 0.2;
          taxSlab = '20%';
        } else {
          taxAmount = 112500 + (taxableIncome - 1000000) * 0.3;
          taxSlab = '30%';
        }
        break;
    }

    // Apply cess (4%)
    finalLiability = taxAmount + (taxAmount * 0.04);

    setResult({
      taxableIncome: Math.round(taxableIncome),
      taxAmount: Math.round(taxAmount),
      taxSlab,
      finalLiability: Math.round(finalLiability),
    });
    
    setHasCalculated(true);
  };

  const formFields: Record<UserType, FormField[]> = {
    individual: [
      { id: 'salary', label: 'Salary Income', type: 'number', section: 'Income' },
      { id: 'otherIncome', label: 'Other Income', type: 'number', section: 'Income' },
      { id: 'rentalIncome', label: 'Rental Income', type: 'number', section: 'Income' },
      { id: 'section80C', label: 'Section 80C Deductions', type: 'number', section: 'Deductions' },
      { id: 'section80D', label: 'Section 80D (Health Insurance)', type: 'number', section: 'Deductions' },
      { id: 'section80G', label: 'Section 80G (Donations)', type: 'number', section: 'Deductions' },
    ],
    business: [
      { id: 'businessIncome', label: 'Business Income', type: 'number', section: 'Income' },
      { id: 'businessExpenses', label: 'Business Expenses', type: 'number', section: 'Expenses' },
      { id: 'depreciation', label: 'Depreciation', type: 'number', section: 'Expenses' },
      { id: 'section80D', label: 'Section 80D (Health Insurance)', type: 'number', section: 'Deductions' },
    ],
    startup: [
      { id: 'salary', label: 'Salary Income', type: 'number', section: 'Income' },
      { id: 'esopValue', label: 'ESOP Value', type: 'number', section: 'Income' },
      { id: 'capitalGains', label: 'Capital Gains', type: 'number', section: 'Income' },
      { id: 'section80C', label: 'Section 80C Deductions', type: 'number', section: 'Deductions' },
      { id: 'section80D', label: 'Section 80D (Health Insurance)', type: 'number', section: 'Deductions' },
    ],
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Tax Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" onValueChange={(value) => setUserType(value as UserType)}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="business">Business Owner</TabsTrigger>
            <TabsTrigger value="startup">Startup Founder</TabsTrigger>
          </TabsList>
          
          {['individual', 'business', 'startup'].map((type) => (
            <TabsContent key={type} value={type} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['Income', 'Expenses', 'Deductions'].map((section) => {
                  const sectionFields = formFields[type as UserType].filter(field => field.section === section);
                  
                  if (sectionFields.length === 0) return null;
                  
                  return (
                    <div key={section} className="space-y-4">
                      <h3 className="font-medium text-lg text-gray-800">{section}</h3>
                      {sectionFields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={field.id}>{field.label}</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <Input
                              id={field.id}
                              name={field.id}
                              type="number"
                              value={formData[field.id] || ''}
                              onChange={handleInputChange}
                              className="pl-8"
                              min="0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={calculateTax} 
                  className="bg-taxBlue hover:bg-taxBlue-dark"
                >
                  Calculate Tax
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {hasCalculated && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border animate-fade-in">
            <h3 className="text-xl font-semibold text-center mb-4">Tax Calculation Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-semibold">₹{result.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Slab:</span>
                  <span className="font-semibold">{result.taxSlab}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Amount:</span>
                  <span className="font-semibold">₹{result.taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Education Cess (4%):</span>
                  <span className="font-semibold">₹{(Number(result.finalLiability) - Number(result.taxAmount)).toLocaleString()}</span>
                </div>
              </div>
              <div className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg",
                "bg-taxBlue text-white"
              )}>
                <span className="text-lg">Final Tax Liability</span>
                <span className="text-3xl font-bold mt-2">
                  ₹{result.finalLiability.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              Note: This is a simplified calculation. For comprehensive tax assessment, please consult a tax professional.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxCalculator;
