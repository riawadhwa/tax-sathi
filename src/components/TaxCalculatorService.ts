
import { supabase } from "@/integrations/supabase/client";
import { TaxResult } from "@/types/ProfileTypes";

interface TaxFormData {
  [key: string]: number;
}

export const calculateTax = (formData: TaxFormData, userType: string): TaxResult => {
  let taxableIncome = 0;
  let taxAmount = 0;
  let taxSlab = '';
  let finalLiability = 0;

  switch (userType) {
    case 'individual':
      taxableIncome = formData.salary + formData.otherIncome + formData.rentalIncome - 
                     (formData.section80C + formData.section80D + formData.section80G);
      break;

    case 'business':
      taxableIncome = formData.businessIncome - formData.businessExpenses - formData.depreciation;
      break;

    case 'startup':
      taxableIncome = formData.salary + formData.esopValue + formData.capitalGains - 
                     (formData.section80C + formData.section80D);
      break;
  }

  // Common tax slab calculation for all user types
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

  // Apply cess (4%)
  finalLiability = taxAmount + (taxAmount * 0.04);

  return {
    taxableIncome: Math.round(taxableIncome),
    taxAmount: Math.round(taxAmount),
    taxSlab,
    finalLiability: Math.round(finalLiability),
  };
};

export const saveTaxCalculation = async (userId: string, formData: TaxFormData, userType: string, result: TaxResult) => {
  const currentYear = new Date().getFullYear();
  const assessmentYear = `${currentYear}-${currentYear + 1}`;
  
  try {
    const { error } = await supabase.from('tax_calculations').insert({
      user_id: userId,
      assessment_year: assessmentYear,
      salary_income: formData.salary || 0,
      other_income: formData.otherIncome || 0,
      capital_gains: formData.capitalGains || 0,
      business_income: formData.businessIncome || 0,
      total_income: 
        (formData.salary || 0) + 
        (formData.otherIncome || 0) + 
        (formData.capitalGains || 0) + 
        (formData.businessIncome || 0) + 
        (formData.rentalIncome || 0),
      deductions_80c: formData.section80C || 0,
      deductions_80d: formData.section80D || 0,
      deductions_other: formData.section80G || 0,
      total_deductions: 
        (formData.section80C || 0) + 
        (formData.section80D || 0) + 
        (formData.section80G || 0),
      taxable_income: result.taxableIncome,
      tax_payable: result.taxAmount,
      cess: result.finalLiability - result.taxAmount,
      final_tax: result.finalLiability,
    });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving tax calculation:', error);
    return false;
  }
};

export const fetchUserTaxCalculations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('tax_calculations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching tax calculations:', error);
    return [];
  }
};
