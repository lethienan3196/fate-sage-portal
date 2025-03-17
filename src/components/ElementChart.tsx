
import React, { useEffect, useRef } from 'react';

type ElementChartProps = {
  elements: {
    Water: number;
    Wood: number;
    Fire: number;
    Earth: number;
    Metal: number;
  };
  className?: string;
};

const ElementChart: React.FC<ElementChartProps> = ({ elements, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const colors = {
    Water: '#3b82f6',
    Wood: '#22c55e',
    Fire: '#ef4444',
    Earth: '#f59e0b',
    Metal: '#9ca3af',
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Reset canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Calculate total and percentages
    const total = Object.values(elements).reduce((sum, value) => sum + value, 0);
    const data = Object.entries(elements).map(([key, value]) => ({
      label: key,
      value,
      percentage: total > 0 ? (value / total) * 100 : 0,
      color: colors[key as keyof typeof colors],
    }));
    
    // Draw pie chart
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    let startAngle = -Math.PI / 2;
    
    data.forEach(segment => {
      if (segment.value === 0) return;
      
      const segmentAngle = (segment.percentage / 100) * Math.PI * 2;
      const endAngle = startAngle + segmentAngle;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      // Draw segment label if segment is large enough
      if (segment.percentage > 5) {
        const labelRadius = radius * 0.7;
        const labelAngle = startAngle + segmentAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        ctx.fillStyle = '#fff';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(segment.label, labelX, labelY);
      }
      
      startAngle = endAngle;
    });
    
    // Draw center circle (for donut chart effect)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    // Draw legend
    const legendY = rect.height - 20;
    const legendSpacing = rect.width / (data.length + 1);
    
    data.forEach((segment, index) => {
      const legendX = legendSpacing * (index + 1);
      
      // Draw color box
      ctx.fillStyle = segment.color;
      ctx.fillRect(legendX - 30, legendY, 10, 10);
      
      // Draw label
      ctx.fillStyle = '#000';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${segment.label} (${Math.round(segment.percentage)}%)`, legendX - 15, legendY + 5);
    });
    
  }, [elements]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ElementChart;
