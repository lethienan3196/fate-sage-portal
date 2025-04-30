
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const medications = [
  {
    id: 1,
    name: "Vitamin D",
    dosage: "1000 IU",
    frequency: "Once daily",
    timeOfDay: "Morning",
    taken: true,
    color: "bg-amber-100",
  },
  {
    id: 2,
    name: "Omega-3",
    dosage: "1000 mg",
    frequency: "Once daily",
    timeOfDay: "Morning",
    taken: true,
    color: "bg-cyan-100",
  },
  {
    id: 3,
    name: "Multivitamin",
    dosage: "1 tablet",
    frequency: "Once daily",
    timeOfDay: "Morning",
    taken: false,
    color: "bg-green-100",
  },
  {
    id: 4,
    name: "Magnesium",
    dosage: "300 mg",
    frequency: "Once daily",
    timeOfDay: "Evening",
    taken: null,
    color: "bg-purple-100",
  },
];

const Medications = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Today's Medications</CardTitle>
            <CardDescription>Track your daily medications</CardDescription>
          </div>
          <Button size="sm">Add Medication</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((medication) => (
              <div 
                key={medication.id} 
                className={`flex items-start justify-between p-4 rounded-lg ${medication.color}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-white`}>
                    <Pill className="h-5 w-5 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">{medication.name}</h3>
                    <p className="text-sm text-muted-foreground">{medication.dosage} - {medication.frequency}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {medication.timeOfDay}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  {medication.taken === true ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Taken</span>
                    </div>
                  ) : medication.taken === false ? (
                    <Button size="sm" variant="outline" className="text-xs">
                      Mark as taken
                    </Button>
                  ) : (
                    <div className="flex items-center text-amber-600 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Upcoming</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medication Schedule</CardTitle>
          <CardDescription>Your weekly medication planner</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={index} className="p-2 font-medium">
                {day}
              </div>
            ))}
            
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div 
                key={dayIndex} 
                className={`p-2 rounded-md border ${dayIndex === 2 ? 'bg-slate-100 border-primary' : ''}`}
              >
                <div className="w-full aspect-square flex flex-col justify-center items-center text-sm">
                  <span className={`${dayIndex === 2 ? 'text-primary font-medium' : ''}`}>
                    {dayIndex + 1}
                  </span>
                  {medications.slice(0, 3).map((med, i) => (
                    <div 
                      key={i} 
                      className="h-1.5 w-1.5 rounded-full mt-1"
                      style={{ 
                        backgroundColor: 
                          dayIndex < 3 ? '#22c55e' : 
                          dayIndex === 3 ? '#eab308' : 
                          'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-slate-300" />
              <span>Upcoming</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Medications;
