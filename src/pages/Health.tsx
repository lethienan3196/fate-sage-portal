
import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Activity, Pill, Utensils } from "lucide-react";
import HealthOverview from "@/components/health/HealthOverview";
import VitalSigns from "@/components/health/VitalSigns";
import Medications from "@/components/health/Medications";
import NutritionTracker from "@/components/health/NutritionTracker";

const Health = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Health Dashboard</h1>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Vital Signs</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span>Medications</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>Nutrition</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <HealthOverview />
        </TabsContent>
        
        <TabsContent value="vitals">
          <VitalSigns />
        </TabsContent>
        
        <TabsContent value="medications">
          <Medications />
        </TabsContent>
        
        <TabsContent value="nutrition">
          <NutritionTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Health;
