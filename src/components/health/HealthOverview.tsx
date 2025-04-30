
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Activity, Pill, Utensils } from "lucide-react";

const HealthOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Health Score
          </CardTitle>
          <CardDescription>Your overall health assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">85%</div>
          <Progress value={85} className="h-3" />
          <p className="mt-2 text-sm text-muted-foreground">
            Your health score is above average. Keep up the good work!
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Recent Activity
          </CardTitle>
          <CardDescription>Summary of your health activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Steps today</span>
            <span className="font-medium">8,543</span>
          </div>
          <Progress value={71} className="h-2" />
          
          <div className="flex justify-between items-center">
            <span>Sleep last night</span>
            <span className="font-medium">7h 30m</span>
          </div>
          <Progress value={85} className="h-2" />
          
          <div className="flex justify-between items-center">
            <span>Water intake</span>
            <span className="font-medium">1.8L</span>
          </div>
          <Progress value={60} className="h-2" />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Weekly Summary</CardTitle>
          <CardDescription>Your health overview for the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-100 rounded-lg">
              <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
              <div className="text-sm font-medium">Heart Rate</div>
              <div className="text-lg font-bold">72 BPM</div>
              <div className="text-xs text-muted-foreground">Avg.</div>
            </div>
            
            <div className="p-4 bg-slate-100 rounded-lg">
              <Activity className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-sm font-medium">Exercise</div>
              <div className="text-lg font-bold">4 days</div>
              <div className="text-xs text-muted-foreground">This week</div>
            </div>
            
            <div className="p-4 bg-slate-100 rounded-lg">
              <Pill className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <div className="text-sm font-medium">Medication</div>
              <div className="text-lg font-bold">95%</div>
              <div className="text-xs text-muted-foreground">Adherence</div>
            </div>
            
            <div className="p-4 bg-slate-100 rounded-lg">
              <Utensils className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-sm font-medium">Nutrition</div>
              <div className="text-lg font-bold">Good</div>
              <div className="text-xs text-muted-foreground">Assessment</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthOverview;
