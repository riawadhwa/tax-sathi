
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { CalculatorIcon, ClipboardList, FileCheck, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="section-heading">How TaxSathi Helps You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive tools and resources make tax planning and filing simple for everyone, whether you're an individual, business owner, or startup founder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={CalculatorIcon}
            iconColor="bg-taxBlue-light text-taxBlue"
            title="Tax Calculator"
            description="Calculate your taxes accurately based on the latest tax slabs and rules for individuals, businesses, and startup founders."
            linkTo="/calculator"
            buttonText="Calculate Now"
          />
          <FeatureCard 
            icon={ClipboardList}
            iconColor="bg-taxGreen-light text-taxGreen"
            title="Filing Checklist"
            description="Track your progress with our comprehensive tax filing checklist, customized for your specific needs."
            linkTo="/filing-checklist"
            buttonText="View Checklist"
          />
          <FeatureCard 
            icon={FileCheck}
            iconColor="bg-taxOrange-light text-taxOrange"
            title="Form Requirements"
            description="Know exactly which documents you need for different tax forms, categorized by ITR type."
            linkTo="/form-checklist"
            buttonText="Check Requirements"
          />
          <FeatureCard 
            icon={BarChart3}
            iconColor="bg-purple-100 text-purple-600"
            title="Investment Guide"
            description="Learn about tax-saving investment strategies and budgeting techniques to optimize your finances."
            linkTo="/investment-budget"
            buttonText="Explore Guide"
          />
        </div>
      </section>
      
      {/* User Types Section */}
      <section className="py-12 bg-gray-100 rounded-lg my-12">
        <div className="text-center mb-12">
          <h2 className="section-heading">Tailored for Every Tax Need</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've designed TaxSathi to address the specific requirements of different taxpayers in India.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="tax-card">
            <h3 className="text-xl font-semibold text-taxBlue mb-3">For Individuals</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-taxBlue mr-2">•</span>
                <span>Calculate taxes on salary and additional income</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxBlue mr-2">•</span>
                <span>Track Section 80C and other deductions</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxBlue mr-2">•</span>
                <span>Optimize for tax-saving investments</span>
              </li>
            </ul>
          </div>
          
          <div className="tax-card">
            <h3 className="text-xl font-semibold text-taxGreen mb-3">For Business Owners</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-taxGreen mr-2">•</span>
                <span>Business income and expense tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxGreen mr-2">•</span>
                <span>GST and other business taxes</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxGreen mr-2">•</span>
                <span>Track deductible business expenses</span>
              </li>
            </ul>
          </div>
          
          <div className="tax-card">
            <h3 className="text-xl font-semibold text-taxOrange mb-3">For Startup Founders</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-taxOrange mr-2">•</span>
                <span>ESOP and equity-related taxes</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxOrange mr-2">•</span>
                <span>Capital gains on startup investments</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxOrange mr-2">•</span>
                <span>Startup-specific tax benefits</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 text-center">
        <h2 className="section-heading">Ready to Simplify Your Taxes?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Stop stressing about tax calculations and filing requirements. TaxSathi is here to guide you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <FeatureCard 
            icon={CalculatorIcon}
            iconColor="bg-taxBlue-light text-taxBlue"
            title="Start with Tax Calculator"
            description="Calculate your taxes based on your income, deductions, and more."
            linkTo="/calculator"
            buttonText="Calculate Now"
          />
          <FeatureCard 
            icon={ClipboardList}
            iconColor="bg-taxGreen-light text-taxGreen"
            title="Prepare Your Documents"
            description="Get a personalized checklist of documents needed for tax filing."
            linkTo="/filing-checklist"
            buttonText="Get Checklist"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
