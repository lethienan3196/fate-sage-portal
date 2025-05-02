
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const elementData = {
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

const elementColors = {
  wood: "bg-green-100 border-green-500",
  fire: "bg-red-100 border-red-500",
  earth: "bg-yellow-100 border-yellow-500",
  metal: "bg-gray-100 border-gray-500",
  water: "bg-blue-100 border-blue-500",
};

const BaziHealth = () => {
  const [selectedElement, setSelectedElement] = useState<keyof typeof elementData>("wood");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Bazi Five Elements Health</CardTitle>
            <CardDescription>
              Traditional Chinese medicine and Bazi analysis use the five elements to understand health balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select Your Dominant Element</label>
                <Select 
                  value={selectedElement} 
                  onValueChange={(value) => setSelectedElement(value as keyof typeof elementData)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select element" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wood">Wood (木)</SelectItem>
                    <SelectItem value="fire">Fire (火)</SelectItem>
                    <SelectItem value="earth">Earth (土)</SelectItem>
                    <SelectItem value="metal">Metal (金)</SelectItem>
                    <SelectItem value="water">Water (水)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`w-full md:w-2/3 border-2 ${elementColors[selectedElement]}`}>
          <CardHeader>
            <CardTitle className="capitalize">{selectedElement} Element Health Profile</CardTitle>
            <CardDescription>
              Health characteristics and recommendations for {selectedElement} element types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Aspect</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Associated Organs</TableCell>
                  <TableCell>{elementData[selectedElement].organs}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Emotional Patterns</TableCell>
                  <TableCell>{elementData[selectedElement].emotions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Color Association</TableCell>
                  <TableCell className="capitalize">{elementData[selectedElement].color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Peak Season</TableCell>
                  <TableCell>{elementData[selectedElement].season}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Health Recommendations</h4>
              <ul className="list-disc pl-5 space-y-1">
                {elementData[selectedElement].recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Five Elements Balance</CardTitle>
          <CardDescription>
            Understanding the interaction between elements is key to maintaining health balance in Bazi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">Element Cycles</h4>
              <p className="text-sm mb-4">In Bazi, elements interact through two primary cycles:</p>
              
              <h5 className="font-medium text-sm mb-1">Productive Cycle (生 Sheng):</h5>
              <p className="text-sm mb-2">Wood feeds Fire → Fire creates Earth → Earth bears Metal → Metal collects Water → Water nourishes Wood</p>
              
              <h5 className="font-medium text-sm mb-1">Controlling Cycle (克 Ke):</h5>
              <p className="text-sm">Wood parts Earth → Earth absorbs Water → Water extinguishes Fire → Fire melts Metal → Metal chops Wood</p>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">Health Balancing</h4>
              <p className="text-sm mb-2">To balance your {selectedElement} element:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {selectedElement === "wood" && (
                  <>
                    <li>Support with water activities (swimming, hydration)</li>
                    <li>Reduce metal influences (avoid excessive organization)</li>
                    <li>Moderate with earth activities (gardening, grounding)</li>
                  </>
                )}
                {selectedElement === "fire" && (
                  <>
                    <li>Support with wood activities (creativity, flexibility)</li>
                    <li>Reduce water influences (avoid excessive stillness)</li>
                    <li>Moderate with metal activities (structure, discipline)</li>
                  </>
                )}
                {selectedElement === "earth" && (
                  <>
                    <li>Support with fire activities (joy, celebration)</li>
                    <li>Reduce wood influences (avoid excessive movement)</li>
                    <li>Moderate with water activities (reflection, rest)</li>
                  </>
                )}
                {selectedElement === "metal" && (
                  <>
                    <li>Support with earth activities (nourishment, stability)</li>
                    <li>Reduce fire influences (avoid excessive excitement)</li>
                    <li>Moderate with wood activities (flexibility, creativity)</li>
                  </>
                )}
                {selectedElement === "water" && (
                  <>
                    <li>Support with metal activities (structure, clarity)</li>
                    <li>Reduce earth influences (avoid excessive worry)</li>
                    <li>Moderate with fire activities (warmth, activity)</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BaziHealth;
