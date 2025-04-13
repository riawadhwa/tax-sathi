import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  calculateTax, 
  saveTaxCalculation, 
  fetchUserTaxCalculations 
} from './TaxCalculatorService';
import { toast } from '@/hooks/use-toast';
import { Loader2, Save, History } from 'lucide-react';
import { CustomTooltip } from "@/components/ui/CustomTooltip";
import { Info } from "lucide-react";

type UserType = 'individual' | 'business' | 'startup';

interface FormField {
  id: string;
  label: string;
  type: 'number' | 'text';
  section?: string;
}

const TaxCalculator = () => {
  const { user } = useAuth();
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
  const [isSaving, setIsSaving] = useState(false);
  const [previousCalculations, setPreviousCalculations] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPreviousCalculations();
    }
  }, [user]);

  const fetchPreviousCalculations = async () => {
    if (!user) return;
    
    setLoadingHistory(true);
    try {
      const calculations = await fetchUserTaxCalculations(user.id);
      setPreviousCalculations(calculations);
    } catch (error) {
      console.error("Error fetching previous calculations:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0,
    });
  };

  const calculateTaxHandler = () => {
    const calculatedResult = calculateTax(formData, userType);
    setResult(calculatedResult);
    setHasCalculated(true);
  };

  const handleSaveCalculation = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to save your tax calculation",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      await saveTaxCalculation(user.id, formData, userType, result as any);
      toast({
        title: "Success",
        description: "Your tax calculation has been saved",
      });
      fetchPreviousCalculations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your calculation",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
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
                          <div className="flex items-center gap-2">
                            <Label htmlFor={field.id}>{field.label}</Label>
                            <CustomTooltip 
                              content={`Enter your ${field.label.toLowerCase()}`}
                              side="right"
                            >
                              <Info className="h-4 w-4 text-gray-500" />
                            </CustomTooltip>
                          </div>
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
                  onClick={calculateTaxHandler} 
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Tax Calculation Results</h3>
              {user && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1" 
                  onClick={handleSaveCalculation}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  Save Calculation
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-semibold">₹{Number(result.taxableIncome).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Slab:</span>
                  <span className="font-semibold">{result.taxSlab}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Amount:</span>
                  <span className="font-semibold">₹{Number(result.taxAmount).toLocaleString()}</span>
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
                  ₹{Number(result.finalLiability).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              Note: This is a simplified calculation. For comprehensive tax assessment, please consult a tax professional.
            </p>
          </div>
        )}

        {user && previousCalculations.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-taxBlue" />
              <h3 className="text-lg font-semibold">Recent Calculations</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {previousCalculations.map((calc) => (
                <div 
                  key={calc.id} 
                  className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">Assessment Year: {calc.assessment_year}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {new Date(calc.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Income: ₹{calc.total_income.toLocaleString()} | 
                        Deductions: ₹{calc.total_deductions.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">₹{calc.final_tax.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Final Tax</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxCalculator;
