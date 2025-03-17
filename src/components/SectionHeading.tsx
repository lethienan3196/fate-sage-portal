
import React from 'react';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  icon,
  className,
}) => {
  return (
    <div className={cn("mb-8 text-center", className)}>
      {icon && (
        <div className="mb-4 flex justify-center">
          {icon}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
    </div>
  );
};

export default SectionHeading;
