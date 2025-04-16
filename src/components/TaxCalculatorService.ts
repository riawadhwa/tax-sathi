import { supabase } from "@/integrations/supabase/client";
import { TaxRegimeResult, TaxComparisonResult } from "@/types/ProfileTypes";

interface TaxFormData {
  [key: string]: number;
}

// Helper function for Indian number formatting
export const formatIndianNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const calculateOldRegimeTax = (formData: TaxFormData, userType: string): TaxRegimeResult => {
  let taxableIncome = 0;
  let taxAmount = 0;
  let taxSlab = '';
  let finalLiability = 0;

  // Calculate taxable income based on user type
  switch (userType) {
    case 'individual':
      taxableIncome = formData.salary + formData.otherIncome + formData.rentalIncome -
        (formData.section80C + formData.section80D + formData.section80G);
      // Standard deduction of ₹50,000 for salaried individuals
      taxableIncome -= Math.min(formData.salary, 50000);
      break;

    case 'business':
      taxableIncome = formData.businessIncome - formData.businessExpenses - formData.depreciation;
      // Business can still claim some deductions
      taxableIncome -= (formData.section80D || 0);
      break;

    case 'startup':
      taxableIncome = formData.salary + formData.esopValue + formData.capitalGains -
        (formData.section80C + formData.section80D);
      // Standard deduction of ₹50,000 for salaried individuals
      taxableIncome -= Math.min(formData.salary, 50000);
      break;
  }

  taxableIncome = Math.max(0, taxableIncome);

  // Old regime tax slabs (FY 2023-24)
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

  // Apply rebate under section 87A for income up to ₹5 lakhs
  if (taxableIncome <= 500000) {
    taxAmount = 0;
  }

  // Apply surcharge for income > 50 lakhs
  let surcharge = 0;
  if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
    surcharge = taxAmount * 0.1; // 10% surcharge
  } else if (taxableIncome > 10000000) {
    surcharge = taxAmount * 0.15; // 15% surcharge
  }
  taxAmount += surcharge;

  // Apply cess (4% health and education cess)
  finalLiability = taxAmount + (taxAmount * 0.04);

  return {
    taxableIncome: Math.round(taxableIncome),
    taxAmount: Math.round(taxAmount),
    taxSlab: `${taxSlab}${surcharge > 0 ? ` + ${surcharge > taxAmount * 0.1 ? '15%' : '10%'} surcharge` : ''}`,
    finalLiability: Math.round(finalLiability),
  };
};

export const calculateNewRegimeTax = (formData: TaxFormData, userType: string): TaxRegimeResult => {
  let taxableIncome = 0;
  let taxAmount = 0;
  let taxSlab = '';
  let finalLiability = 0;

  // Calculate taxable income (no deductions in new regime except standard deduction for salaried)
  switch (userType) {
    case 'individual':
      // Standard deduction of ₹50,000 for salaried individuals
      taxableIncome = Math.max(0, formData.salary - 50000) + formData.otherIncome + formData.rentalIncome;
      break;

    case 'business':
      taxableIncome = formData.businessIncome - formData.businessExpenses - formData.depreciation;
      break;

    case 'startup':
      // Standard deduction of ₹50,000 for salaried individuals
      taxableIncome = Math.max(0, formData.salary - 50000) + formData.esopValue + formData.capitalGains;
      break;
  }

  taxableIncome = Math.max(0, taxableIncome);

  // New regime tax slabs (FY 2023-24)
  if (taxableIncome <= 300000) {
    taxAmount = 0;
    taxSlab = '0%';
  } else if (taxableIncome <= 600000) {
    taxAmount = (taxableIncome - 300000) * 0.05;
    taxSlab = '5%';
  } else if (taxableIncome <= 900000) {
    taxAmount = 15000 + (taxableIncome - 600000) * 0.1;
    taxSlab = '10%';
  } else if (taxableIncome <= 1200000) {
    taxAmount = 45000 + (taxableIncome - 900000) * 0.15;
    taxSlab = '15%';
  } else if (taxableIncome <= 1500000) {
    taxAmount = 90000 + (taxableIncome - 1200000) * 0.2;
    taxSlab = '20%';
  } else {
    taxAmount = 150000 + (taxableIncome - 1500000) * 0.3;
    taxSlab = '30%';
  }

  // Apply rebate under section 87A for income up to ₹7 lakhs
  if (taxableIncome <= 700000) {
    taxAmount = 0;
  }

  // Apply surcharge for income > 50 lakhs
  let surcharge = 0;
  if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
    surcharge = taxAmount * 0.1; // 10% surcharge
  } else if (taxableIncome > 10000000) {
    surcharge = taxAmount * 0.15; // 15% surcharge
  }
  taxAmount += surcharge;

  // Apply cess (4% health and education cess)
  finalLiability = taxAmount + (taxAmount * 0.04);

  return {
    taxableIncome: Math.round(taxableIncome),
    taxAmount: Math.round(taxAmount),
    taxSlab: `${taxSlab}${surcharge > 0 ? ` + ${surcharge > taxAmount * 0.1 ? '15%' : '10%'} surcharge` : ''}`,
    finalLiability: Math.round(finalLiability),
  };
};

export const calculateTax = (formData: TaxFormData, userType: string): TaxComparisonResult => {
  const oldRegime = calculateOldRegimeTax(formData, userType);
  const newRegime = calculateNewRegimeTax(formData, userType);

  const recommendedRegime = oldRegime.finalLiability < newRegime.finalLiability ? 'old' : 'new';
  const savings = Math.abs(oldRegime.finalLiability - newRegime.finalLiability);

  return {
    oldRegime,
    newRegime,
    recommendedRegime,
    savings
  };
};

export const saveTaxCalculation = async (userId: string, formData: TaxFormData, userType: string, result: TaxComparisonResult) => {
  const currentYear = new Date().getFullYear();
  const assessmentYear = `${currentYear}-${currentYear + 1}`;

  try {
    const { data, error } = await supabase.from('tax_calculations').insert({
      user_id: userId,
      assessment_year: assessmentYear,
      salary_income: formData.salary || 0,
      other_income: formData.otherIncome || 0,
      capital_gains: formData.capitalGains || 0,
      business_income: formData.businessIncome || 0,
      rental_income: formData.rentalIncome || 0,
      total_income:
        (formData.salary || 0) +
        (formData.otherIncome || 0) +
        (formData.capitalGains || 0) +
        (formData.businessIncome || 0) +
        (formData.rentalIncome || 0),
      deductions_80c: formData.section80C || 0,
      deductions_80d: formData.section80D || 0,
      deductions_80g: formData.section80G || 0,
      total_deductions:
        (formData.section80C || 0) +
        (formData.section80D || 0) +
        (formData.section80G || 0),
      taxable_income_old: result.oldRegime.taxableIncome,
      tax_payable_old: result.oldRegime.taxAmount,
      final_tax_old: result.oldRegime.finalLiability,
      taxable_income_new: result.newRegime.taxableIncome,
      tax_payable_new: result.newRegime.taxAmount,
      final_tax_new: result.newRegime.finalLiability,
      recommended_regime: result.recommendedRegime,
      savings: result.savings,
    }).select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving tax calculation:', error);
    throw error;
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