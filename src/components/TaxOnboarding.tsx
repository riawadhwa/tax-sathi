import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { CustomTooltip } from "@/components/ui/CustomTooltip";
import { Info } from "lucide-react";
import { toast } from '@/components/ui/use-toast';

const TaxOnboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    panNumber: '',
    aadhaarNumber: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    userType: '',
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert([
          {
            id: user.id,
            full_name: formData.fullName,
            pan_number: formData.panNumber,
            aadhaar_number: formData.aadhaarNumber,
            address: formData.address,
            phone_number: formData.phoneNumber,
            date_of_birth: formData.dateOfBirth,
            user_type: formData.userType,
          },
        ]);
      
      if (error) {
        console.error('Error saving profile:', error);
        return;
      }
      
      console.log('Profile updated:', data);
      onComplete();
      navigate('/calculator');
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  
  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };
  
  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
      case 2:
        return <ContactInfoStep formData={formData} handleChange={handleChange} />;
      case 3:
        return <TaxpayerTypeStep formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Tax Profile Setup</CardTitle>
      </CardHeader>
      <CardContent>
        {renderStepContent()}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const PersonalInfoStep = ({ formData, handleChange }: any) => {
  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="fullName">Full Name</Label>
          </div>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label>PAN Number</Label>
            <CustomTooltip 
              content="Your Permanent Account Number is required for tax identification"
              side="right"
            >
              <Info className="h-4 w-4 text-gray-500" />
            </CustomTooltip>
          </div>
          <Input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
          <Input
            type="text"
            id="aadhaarNumber"
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const ContactInfoStep = ({ formData, handleChange }: any) => {
  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const TaxpayerTypeStep = ({ formData, handleChange }: any) => {
  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="userType">Taxpayer Type</Label>
          <select
            id="userType"
            name="userType"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
            <option value="startup">Startup</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaxOnboarding;
