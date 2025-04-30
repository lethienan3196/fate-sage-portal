
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const vitalData = [
  { day: "Mon", heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 76, temperature: 36.6 },
  { day: "Tue", heartRate: 75, bloodPressureSystolic: 120, bloodPressureDiastolic: 78, temperature: 36.5 },
  { day: "Wed", heartRate: 71, bloodPressureSystolic: 117, bloodPressureDiastolic: 75, temperature: 36.7 },
  { day: "Thu", heartRate: 73, bloodPressureSystolic: 119, bloodPressureDiastolic: 77, temperature: 36.6 },
  { day: "Fri", heartRate: 70, bloodPressureSystolic: 116, bloodPressureDiastolic: 74, temperature: 36.5 },
  { day: "Sat", heartRate: 68, bloodPressureSystolic: 115, bloodPressureDiastolic: 73, temperature: 36.4 },
  { day: "Sun", heartRate: 69, bloodPressureSystolic: 116, bloodPressureDiastolic: 75, temperature: 36.6 },
];

const VitalSigns = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate</CardTitle>
          <CardDescription>Beats per minute over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[60, 90]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blood Pressure</CardTitle>
          <CardDescription>Systolic and diastolic measurements over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[60, 140]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bloodPressureSystolic" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="bloodPressureDiastolic" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Body Temperature</CardTitle>
          <CardDescription>Daily temperature measurements (°C)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[36, 37.5]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VitalSigns;
