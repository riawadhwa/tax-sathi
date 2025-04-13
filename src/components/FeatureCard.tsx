
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkTo: string;
  iconColor?: string;
  buttonText?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  linkTo,
  iconColor = "bg-taxBlue-light text-taxBlue",
  buttonText = "Explore"
}: FeatureCardProps) => {
  return (
    <div className="tax-card flex flex-col h-full">
      <div className={cn("p-3 rounded-full w-fit", iconColor)}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600 flex-grow">{description}</p>
      <div className="mt-6">
        <Button asChild variant="outline" className="w-full">
          <Link to={linkTo}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;
