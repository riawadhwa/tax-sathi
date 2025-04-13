
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalculatorIcon, CheckSquareIcon, BookOpenIcon } from 'lucide-react';

const Hero = () => {
  return (
    <div className="py-10 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Simplify Your Tax Journey with <span className="text-taxBlue">TaxSathi</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600">
          The complete tax assistant for Indian individuals, business owners, and startup founders
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-taxBlue hover:bg-taxBlue-dark">
            <Link to="/calculator">
              <CalculatorIcon className="mr-2 h-5 w-5" />
              Calculate Taxes
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-taxBlue text-taxBlue hover:bg-taxBlue-light">
            <Link to="/filing-checklist">
              <CheckSquareIcon className="mr-2 h-5 w-5" />
              Filing Checklist
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
