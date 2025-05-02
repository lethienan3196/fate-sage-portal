
import React from "react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Heart, Scale, Brain, Wind, CircleIcon } from "lucide-react";

interface ElementHealthData {
  organs: string;
  emotions: string;
  recommendations: string[];
  color: string;
  season: string;
}

interface BaziReportHealthProps {
  element: string;
}

const BaziReportHealth: React.FC<BaziReportHealthProps> = ({ element }) => {
  const elementData: Record<string, ElementHealthData> = {
    wood: {
      organs: "Liver, Gallbladder",
      emotions: "Anger, Frustration",
      recommendations: [
        "Eat leafy greens and sour foods",
        "Practice slow walking and gentle stretching",
        "Meditate to reduce anger and irritability"
      ],
      color: "green",
      season: "Spring"
    },
    fire: {
      organs: "Heart, Small Intestine",
      emotions: "Joy, Excitement",
      recommendations: [
        "Eat bitter foods like dark leafy greens",
        "Practice moderate cardio exercise",
        "Balance excitement with calming activities"
      ],
      color: "red",
      season: "Summer"
    },
    earth: {
      organs: "Spleen, Stomach",
      emotions: "Worry, Overthinking",
      recommendations: [
        "Eat sweet foods like squash and carrots",
        "Practice grounding exercises",
        "Create routine and stability in daily life"
      ],
      color: "yellow",
      season: "Late Summer"
    },
    metal: {
      organs: "Lungs, Large Intestine",
      emotions: "Grief, Letting Go",
      recommendations: [
        "Eat white foods and pungent flavors",
        "Practice deep breathing exercises",
        "Focus on organization and releasing what no longer serves you"
      ],
      color: "white",
      season: "Fall"
    },
    water: {
      organs: "Kidneys, Bladder",
      emotions: "Fear, Wisdom",
      recommendations: [
        "Eat dark blue/black foods like blueberries",
        "Practice restorative yoga and rest",
        "Support kidney energy with adequate hydration"
      ],
      color: "blue/black",
      season: "Winter"
    }
  };

  const elementColors: Record<string, string> = {
    wood: "bg-green-100 border-green-500",
    fire: "bg-red-100 border-red-500",
    earth: "bg-yellow-100 border-yellow-500",
    metal: "bg-gray-100 border-gray-500",
    water: "bg-blue-100 border-blue-500",
  };

  const normalizedElement = element.toLowerCase();
  const data = elementData[normalizedElement] || elementData.wood;
  const colorClass = elementColors[normalizedElement] || elementColors.wood;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle>Bazi Health Profile</CardTitle>
          </div>
          <CardDescription>
            Health characteristics based on your {element} element type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={`border-2 ${colorClass} shadow-sm`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Element Health Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Associated Organs</TableCell>
                      <TableCell>{data.organs}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emotional Patterns</TableCell>
                      <TableCell>{data.emotions}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Peak Season</TableCell>
                      <TableCell>{data.season}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  Health Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {data.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Element Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-slate-50 rounded-lg">
                <h3 className="font-medium mb-2">Balance Your {element} Element:</h3>
                {normalizedElement === "wood" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Support with water activities (swimming, hydration)</li>
                    <li>Reduce metal influences (avoid excessive organization)</li>
                    <li>Practice gentle detoxification for liver health</li>
                  </ul>
                )}
                {normalizedElement === "fire" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Support with wood activities (creativity, flexibility)</li>
                    <li>Reduce water influences (avoid excessive stillness)</li>
                    <li>Practice heart-calming meditation techniques</li>
                  </ul>
                )}
                {normalizedElement === "earth" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Support with fire activities (joy, celebration)</li>
                    <li>Reduce wood influences (avoid excessive movement)</li>
                    <li>Focus on digestive health and stability</li>
                  </ul>
                )}
                {normalizedElement === "metal" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Support with earth activities (nourishment, stability)</li>
                    <li>Reduce fire influences (avoid excessive excitement)</li>
                    <li>Practice breathing exercises for lung health</li>
                  </ul>
                )}
                {normalizedElement === "water" && (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Support with metal activities (structure, clarity)</li>
                    <li>Reduce earth influences (avoid excessive worry)</li>
                    <li>Focus on kidney health and proper hydration</li>
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BaziReportHealth;
