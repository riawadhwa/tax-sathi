
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';

const taxSavingInvestments = [
  { name: 'PPF', description: 'Public Provident Fund', benefitRate: '7.1% p.a.', lockIn: '15 years', maxLimit: '₹1,50,000' },
  { name: 'ELSS', description: 'Equity Linked Saving Scheme', benefitRate: 'Market linked', lockIn: '3 years', maxLimit: '₹1,50,000' },
  { name: 'NPS', description: 'National Pension System', benefitRate: 'Market linked', lockIn: 'Till retirement', maxLimit: '₹2,00,000' },
  { name: '5-Year FD', description: 'Tax Saving Fixed Deposit', benefitRate: '5.5-6.5% p.a.', lockIn: '5 years', maxLimit: '₹1,50,000' },
  { name: 'LIC Premium', description: 'Insurance Premium', benefitRate: 'Varies by policy', lockIn: 'Policy term', maxLimit: '₹1,50,000' },
];

const startupInvestments = [
  { name: 'Angel Investing', riskLevel: 'High', potentialReturns: 'Very High', liquidityLevel: 'Low', taxImplications: 'Capital gains on exit' },
  { name: 'Startup Equity', riskLevel: 'High', potentialReturns: 'Very High', liquidityLevel: 'Very Low', taxImplications: 'ESOP benefits, capital gains' },
  { name: 'Startup Debt', riskLevel: 'Medium-High', potentialReturns: 'Medium', liquidityLevel: 'Low', taxImplications: 'Interest income taxed at slab rate' },
];

const budgetingTips = [
  { tip: 'Follow the 50-30-20 rule', description: 'Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.' },
  { tip: 'Create an emergency fund', description: 'Save 3-6 months of expenses for unexpected situations.' },
  { tip: 'Track your expenses', description: 'Use apps or spreadsheets to monitor where your money goes.' },
  { tip: 'Review and adjust regularly', description: 'Review your budget monthly and adjust as needed.' },
  { tip: 'Pay yourself first', description: 'Automatically transfer a portion of income to savings before spending.' },
];

const taxDeductionData = [
  { name: 'Section 80C', amount: 150000, fill: '#2563EB' },
  { name: 'Section 80D', amount: 25000, fill: '#10B981' },
  { name: 'Section 80G', amount: 10000, fill: '#F97316' },
  { name: 'NPS (80CCD)', amount: 50000, fill: '#8B5CF6' },
  { name: 'Home Loan (80EEA)', amount: 150000, fill: '#EC4899' },
];

const incomeCompositionData = [
  { name: 'Salary', value: 60 },
  { name: 'Business', value: 15 },
  { name: 'Investments', value: 10 },
  { name: 'Rental', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#2563EB', '#10B981', '#F97316', '#8B5CF6', '#EC4899'];

const InvestmentResources = () => {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="investments">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="investments">Tax-Saving Investments</TabsTrigger>
          <TabsTrigger value="budgeting">Budgeting Tips</TabsTrigger>
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="investments" className="space-y-6">
          <div className="space-y-4">
            <h3 className="sub-heading">Tax-Saving Investment Options (Section 80C)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {taxSavingInvestments.map((investment) => (
                <Card key={investment.name} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{investment.name}</CardTitle>
                    <p className="text-sm text-gray-500">{investment.description}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Returns</p>
                        <p className="text-gray-600">{investment.benefitRate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Lock-in Period</p>
                        <p className="text-gray-600">{investment.lockIn}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <p className="text-sm"><span className="font-medium">Max Investment:</span> {investment.maxLimit}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="sub-heading">For Startup Founders and Investors</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-gray-700">Investment Type</th>
                    <th className="px-4 py-2 text-left text-gray-700">Risk Level</th>
                    <th className="px-4 py-2 text-left text-gray-700">Potential Returns</th>
                    <th className="px-4 py-2 text-left text-gray-700">Liquidity</th>
                    <th className="px-4 py-2 text-left text-gray-700">Tax Implications</th>
                  </tr>
                </thead>
                <tbody>
                  {startupInvestments.map((item) => (
                    <tr key={item.name} className="border-b">
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3">{item.riskLevel}</td>
                      <td className="px-4 py-3">{item.potentialReturns}</td>
                      <td className="px-4 py-3">{item.liquidityLevel}</td>
                      <td className="px-4 py-3">{item.taxImplications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="budgeting" className="space-y-6">
          <div className="space-y-4">
            <h3 className="sub-heading">Budgeting Tips for Better Financial Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetingTips.map((tip, index) => (
                <div key={index} className="tax-card space-y-2">
                  <h4 className="font-semibold text-taxBlue">{tip.tip}</h4>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">50-30-20 Budget Rule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Needs (50%)', value: 50 },
                        { name: 'Wants (30%)', value: 30 },
                        { name: 'Savings (20%)', value: 20 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      <Cell fill="#2563EB" />
                      <Cell fill="#F97316" />
                      <Cell fill="#10B981" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-gray-600 mt-4">
                The 50-30-20 rule helps you allocate your income to different categories for better financial management
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visualizations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Tax Deductions Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taxDeductionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                      <Legend />
                      <Bar dataKey="amount" name="Maximum Deduction (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Typical Income Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incomeCompositionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {incomeCompositionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Investment Planning Tips</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-taxBlue font-bold mr-2">•</span>
                <span>Diversify your investments across different asset classes to manage risk</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxBlue font-bold mr-2">•</span>
                <span>Start investment planning early in the financial year rather than rushing in March</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxBlue font-bold mr-2">•</span>
                <span>Consider your risk profile and investment horizon before choosing tax-saving options</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxBlue font-bold mr-2">•</span>
                <span>Review your investment portfolio regularly and rebalance if necessary</span>
              </li>
              <li className="flex items-start">
                <span className="text-taxBlue font-bold mr-2">•</span>
                <span>Consult with a financial advisor for personalized investment advice</span>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentResources;
