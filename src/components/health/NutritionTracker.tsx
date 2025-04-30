
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Apple, Coffee, Droplets } from "lucide-react";

const nutritionData = [
  { name: "Protein", value: 96, goal: 120, color: "#8b5cf6" },
  { name: "Carbs", value: 210, goal: 250, color: "#22c55e" },
  { name: "Fat", value: 65, goal: 70, color: "#f59e0b" },
];

const pieData = [
  { name: "Protein", value: 96, color: "#8b5cf6" },
  { name: "Carbs", value: 210, color: "#22c55e" },
  { name: "Fat", value: 65, color: "#f59e0b" },
];

const mealLog = [
  {
    meal: "Breakfast",
    time: "07:30 AM",
    foods: [
      { name: "Oatmeal with berries", calories: 320 },
      { name: "Greek yogurt", calories: 150 },
      { name: "Coffee", calories: 5 },
    ],
  },
  {
    meal: "Lunch",
    time: "12:15 PM",
    foods: [
      { name: "Grilled chicken salad", calories: 450 },
      { name: "Whole grain bread", calories: 120 },
      { name: "Apple", calories: 95 },
    ],
  },
  {
    meal: "Dinner",
    time: "19:00 PM",
    foods: [
      { name: "Salmon fillet", calories: 350 },
      { name: "Brown rice", calories: 215 },
      { name: "Steamed vegetables", calories: 85 },
    ],
  },
];

const NutritionTracker = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Daily Nutrition</CardTitle>
          <CardDescription>Your nutritional intake for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>Calories</span>
                  <span className="font-medium">1,790 / 2,000 kcal</span>
                </div>
                <Progress value={89} className="h-3" />
              </div>
              
              {nutritionData.map((item) => (
                <div key={item.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}g / {item.goal}g</span>
                  </div>
                  <Progress 
                    value={(item.value / item.goal) * 100} 
                    className="h-2"
                    style={{ backgroundColor: `${item.color}20`, "--tw-progress-fill": item.color } as React.CSSProperties}
                  />
                </div>
              ))}
              
              <div className="flex gap-4 mt-8">
                <div className="flex-1 p-3 bg-blue-50 rounded-lg flex items-center">
                  <Droplets className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium">Water Intake</div>
                    <div className="text-lg font-bold">1.8L / 2.5L</div>
                  </div>
                </div>
                
                <div className="flex-1 p-3 bg-orange-50 rounded-lg flex items-center">
                  <Coffee className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium">Caffeine</div>
                    <div className="text-lg font-bold">120mg</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-[200px] h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:row-span-2">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Meal Log</span>
            <Button size="sm" variant="outline">Add meal</Button>
          </CardTitle>
          <CardDescription>Today's food entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mealLog.map((meal, index) => (
              <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{meal.meal}</h3>
                  <span className="text-sm text-muted-foreground">{meal.time}</span>
                </div>
                <div className="space-y-2">
                  {meal.foods.map((food, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Apple className="h-4 w-4 text-neutral-500" />
                        <span>{food.name}</span>
                      </div>
                      <span>{food.calories} kcal</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Log Today's Meals</Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Nutrition Tips</CardTitle>
          <CardDescription>Personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium mb-2">Increase Protein Intake</h3>
              <p className="text-sm text-muted-foreground">
                You're currently at 80% of your protein goal. Consider adding more lean meats, eggs, or plant-based proteins.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium mb-2">Stay Hydrated</h3>
              <p className="text-sm text-muted-foreground">
                You're 700ml short of your water goal. Try to drink a glass of water every hour.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium mb-2">Fiber Recommendation</h3>
              <p className="text-sm text-muted-foreground">
                Consider adding more fiber-rich foods like whole grains, legumes, and vegetables to your diet.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium mb-2">Balanced Meals</h3>
              <p className="text-sm text-muted-foreground">
                Try to include protein, healthy fats, and complex carbohydrates in each meal for better energy levels.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionTracker;
