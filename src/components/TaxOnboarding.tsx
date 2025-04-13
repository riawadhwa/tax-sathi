import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TaxOnboardingProps {
  onComplete: () => void;
}

const filingStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married_joint', label: 'Married Filing Jointly' },
  { value: 'married_separate', label: 'Married Filing Separately' },
  { value: 'head_household', label: 'Head of Household' },
  { value: 'qualifying_widow', label: 'Qualifying Widow(er)' }
];

const indianStates = [
  { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal_pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal_pradesh', label: 'Himachal Pradesh' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'madhya_pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil_nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'west_bengal', label: 'West Bengal' },
  { value: 'delhi', label: 'Delhi' }
];

const employmentTypes = [
  { value: 'salaried', label: 'Salaried Employee (W-2)' },
  { value: 'self_employed', label: 'Self-Employed / Business Owner' },
  { value: 'freelancer', label: 'Freelancer / Gig Worker' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
];

type OnboardingStepProps = {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
};

const PersonalInfoStep: React.FC<OnboardingStepProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      fullName: '',
      panNumber: '',
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
      filingStatus: '',
      state: ''
    }
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            form.reset({
              fullName: data.full_name || '',
              panNumber: data.pan_number || '',
              dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split('T')[0] : '',
              phoneNumber: data.phone_number || '',
              address: data.address || '',
              filingStatus: data.filing_status || '',
              state: data.state || ''
            });
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSubmit = async (data: any) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          pan_number: data.panNumber,
          date_of_birth: data.dateOfBirth || null,
          phone_number: data.phoneNumber,
          address: data.address,
          filing_status: data.filingStatus,
          state: data.state
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your personal information has been saved.',
      });
      
      onNext();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Tell us about yourself for accurate tax filing</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Legal Name</FormLabel>
                  <FormControl>
                    <Input placeholder="As it appears on official documents" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>PAN Number</FormLabel>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <Tooltip>
                      <TooltipContent>
                        <p className="w-[200px]">Your Permanent Account Number (PAN) is required for tax filing in India</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <Input placeholder="ABCDE1234F" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your data is secured with bank-level encryption
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your current residential address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="filingStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filing Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select filing status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filingStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State of Residence</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onPrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const IncomeSourcesStep: React.FC<OnboardingStepProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      employmentType: '',
      hasInvestmentIncome: false,
      hasRentalIncome: false,
      hasOtherIncome: false
    }
  });

  const handleSubmit = async (data: any) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          employment_type: data.employmentType,
          has_investment_income: data.hasInvestmentIncome,
          has_rental_income: data.hasRentalIncome,
          has_other_income: data.hasOtherIncome
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: 'Income sources saved',
        description: 'Your income source information has been updated.',
      });
      
      onNext();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update income sources',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Income Sources</CardTitle>
        <CardDescription>Tell us about your income sources for the tax year</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Employment Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hasInvestmentIncome"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I have investment income
                    </FormLabel>
                    <FormDescription>
                      Includes stocks, mutual funds, dividends, interest, or cryptocurrency
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hasRentalIncome"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I have rental income
                    </FormLabel>
                    <FormDescription>
                      Income from property you rent to others
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hasOtherIncome"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I have other income sources
                    </FormLabel>
                    <FormDescription>
                      Includes pensions, freelancing, consulting, or other miscellaneous income
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onPrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const CompleteStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto rounded-full bg-green-100 p-3 mb-4 w-16 h-16 flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle>Onboarding Complete!</CardTitle>
        <CardDescription>You're all set to start using our tax platform</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p>We've personalized your tax dashboard based on your information.</p>
        <p>Your next step is to explore the tax calculator and document checklists.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onComplete}>Go to Tax Calculator</Button>
      </CardFooter>
    </Card>
  );
};

const TaxOnboarding: React.FC<TaxOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  const steps = [
    <PersonalInfoStep 
      key="personal" 
      onNext={nextStep} 
      onPrevious={previousStep} 
      currentStep={currentStep} 
      totalSteps={totalSteps} 
    />,
    <IncomeSourcesStep 
      key="income" 
      onNext={nextStep} 
      onPrevious={previousStep} 
      currentStep={currentStep} 
      totalSteps={totalSteps} 
    />,
    <CompleteStep 
      key="complete"
      onComplete={onComplete}
    />
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {steps[currentStep]}
    </div>
  );
};

export default TaxOnboarding;
