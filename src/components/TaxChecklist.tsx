
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type UserType = 'individual' | 'business' | 'startup';

interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

const TaxChecklist = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState<UserType>('individual');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Load saved checklist on mount and user type change
  useEffect(() => {
    const loadChecklist = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('extraction_data')
        .eq('user_id', user.id)
        .eq('document_type', 'checklist')
        .eq('file_name', `${userType}_checklist`)
        .single();

      if (data?.extraction_data) {
        setCheckedItems(data.extraction_data as Record<string, boolean>);
      }
      setLoading(false);
    };

    loadChecklist();
  }, [user, userType]);

  const checklistData: Record<UserType, ChecklistItem[]> = {
    individual: [
      { id: 'pan', name: 'PAN Card', description: 'Permanent Account Number card', required: true },
      { id: 'aadhaar', name: 'Aadhaar Card', description: 'Unique Identification Number', required: true },
      { id: 'form16', name: 'Form 16', description: 'Certificate of Tax Deducted at Source (TDS) from your employer', required: true },
      { id: 'bankStatement', name: 'Bank Statements', description: 'For all accounts for the financial year', required: true },
      { id: 'investmentProof', name: 'Investment Proofs', description: 'For tax-saving investments under Section 80C', required: false },
      { id: 'houseRentReceipts', name: 'House Rent Receipts', description: 'If claiming HRA exemption', required: false },
      { id: 'propertyTaxReceipts', name: 'Property Tax Receipts', description: 'If you own property', required: false },
      { id: 'medicalBills', name: 'Medical Bills', description: 'For claiming deduction under Section 80D', required: false },
      { id: 'educationLoanStatement', name: 'Education Loan Statement', description: 'For claiming deduction under Section 80E', required: false },
    ],
    business: [
      { id: 'pan', name: 'PAN Card', description: 'Permanent Account Number card', required: true },
      { id: 'aadhaar', name: 'Aadhaar Card', description: 'Unique Identification Number', required: true },
      { id: 'gstRegistration', name: 'GST Registration Certificate', description: 'If registered under GST', required: true },
      { id: 'bankStatement', name: 'Bank Statements', description: 'For business accounts', required: true },
      { id: 'financialStatements', name: 'Financial Statements', description: 'Balance Sheet and Profit & Loss Account', required: true },
      { id: 'expenseReceipts', name: 'Expense Receipts', description: 'Documentation of business expenses', required: true },
      { id: 'assetPurchaseReceipts', name: 'Asset Purchase Receipts', description: 'For depreciation claims', required: false },
      { id: 'tdsStatements', name: 'TDS Statements', description: 'Form 26AS for TDS deducted', required: true },
      { id: 'gstReturns', name: 'GST Returns', description: 'Filed during the financial year', required: true },
    ],
    startup: [
      { id: 'pan', name: 'PAN Card', description: 'Permanent Account Number card', required: true },
      { id: 'aadhaar', name: 'Aadhaar Card', description: 'Unique Identification Number', required: true },
      { id: 'form16', name: 'Form 16', description: 'If receiving salary from your startup', required: true },
      { id: 'startupCertification', name: 'Startup Certification', description: 'DPIIT Recognition Certificate', required: false },
      { id: 'companyFinancials', name: 'Company Financials', description: 'Balance Sheet and Profit & Loss Account', required: true },
      { id: 'esopDocuments', name: 'ESOP Documents', description: 'For ESOP taxation details', required: false },
      { id: 'investmentTransactions', name: 'Investment Transactions', description: 'Details of any equity/shares sold during the year', required: false },
      { id: 'bankStatement', name: 'Bank Statements', description: 'Personal and business accounts', required: true },
      { id: 'gstReturns', name: 'GST Returns', description: 'If your startup is registered under GST', required: false },
    ],
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
    toast.success("Checklist has been reset");
  };

  const saveProgress = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('documents')
        .upsert({
          user_id: user.id,
          document_type: 'checklist',
          file_name: `${userType}_checklist`,
          file_path: `checklists/${user.id}/${userType}_checklist.json`,
          extraction_data: checkedItems,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,document_type,file_name'
        });

      if (error) throw error;
      toast.success("Progress saved successfully");
    } catch (error) {
      toast.error("Failed to save progress");
      console.error(error);
    }
  };

  const currentChecklist = checklistData[userType];
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = currentChecklist.length ? Math.round((checkedCount / currentChecklist.length) * 100) : 0;

  const requiredItems = currentChecklist.filter(item => item.required);
  const optionalItems = currentChecklist.filter(item => !item.required);

  // Add loading state
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-taxBlue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checklist...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Tax Filing Document Checklist</CardTitle>
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Completion</span>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" onValueChange={(value) => setUserType(value as UserType)}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="business">Business Owner</TabsTrigger>
            <TabsTrigger value="startup">Startup Founder</TabsTrigger>
          </TabsList>

          {['individual', 'business', 'startup'].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-taxBlue">Required Documents</h3>
                  {requiredItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={item.id} className="font-medium">{item.name}</Label>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-600">Optional Documents (If Applicable)</h3>
                  {optionalItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={item.id} className="font-medium">{item.name}</Label>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 justify-center mt-8">
                <Button variant="outline" onClick={resetChecklist}>Reset Checklist</Button>
                <Button className="bg-taxBlue hover:bg-taxBlue-dark" onClick={saveProgress}>Save Progress</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaxChecklist;