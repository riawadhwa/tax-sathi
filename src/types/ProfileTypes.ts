export interface Profile {
  id: string;
  full_name: string;
  pan_number: string;
  aadhaar_number: string;
  address: string;
  phone_number: string;
  date_of_birth: string;
  user_type: string;
  created_at: string;
  updated_at: string;

  // Add optional fields for tax context
  filing_status?: string;
  state?: string;
  employment_type?: string;
}

export interface TaxResult {
  taxableIncome: number;
  taxAmount: number;
  taxSlab: string;
  finalLiability: number;
}

export interface TaxRegimeResult {
  taxableIncome: number;
  taxAmount: number;
  taxSlab: string;
  finalLiability: number;
}

export interface TaxComparisonResult {
  oldRegime: TaxRegimeResult;
  newRegime: TaxRegimeResult;
  recommendedRegime: 'old' | 'new';
  savings: number;
}
