
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type PillarCardProps = {
  title: string;
  heavenlyStem: {
    character: string;
    element: string;
    tenGod: string;
  };
  earthlyBranch: {
    character: string;
    hiddenStems: Array<{
      character: string;
      element: string;
      tenGod: string;
    }>;
  };
  className?: string;
};

const elementColors = {
  Water: 'text-blue-600',
  Wood: 'text-green-600',
  Fire: 'text-red-600',
  Earth: 'text-amber-600',
  Metal: 'text-gray-500',
};

const elementChips = {
  Water: 'water-chip',
  Wood: 'wood-chip',
  Fire: 'fire-chip',
  Earth: 'earth-chip',
  Metal: 'metal-chip',
};

const PillarCard: React.FC<PillarCardProps> = ({
  title,
  heavenlyStem,
  earthlyBranch,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn("pillar-card", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-center mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{title}</span>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className={cn("text-4xl font-bold mb-2", elementColors[heavenlyStem.element as keyof typeof elementColors])}>
          {heavenlyStem.character}
        </div>
        <div className={cn("text-4xl font-bold", "text-gray-800")}>
          {earthlyBranch.character}
        </div>
      </div>
      
      <div className="mt-3">
        <span className={cn(elementChips[heavenlyStem.element as keyof typeof elementChips], "mx-auto")}>
          {heavenlyStem.element}
        </span>
      </div>
      
      <div className="hover-content text-center">
        <h3 className="font-bold text-lg mb-2">Details</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Heavenly Stem</p>
            <p className="font-medium">{heavenlyStem.character} ({heavenlyStem.element})</p>
            <p className="text-xs text-gray-600">Ten God: {heavenlyStem.tenGod}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Earthly Branch</p>
            <p className="font-medium">{earthlyBranch.character}</p>
            {earthlyBranch.hiddenStems.length > 0 && (
              <div className="mt-1">
                <p className="text-xs text-gray-500 mb-1">Hidden Stems:</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {earthlyBranch.hiddenStems.map((stem, index) => (
                    <span 
                      key={index}
                      className={cn(
                        elementChips[stem.element as keyof typeof elementChips], 
                        "text-xs"
                      )}
                    >
                      {stem.character} ({stem.tenGod})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillarCard;
