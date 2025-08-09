import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Patient } from "@/types/medical";
import { Calendar, Activity, FileText, TrendingUp } from "lucide-react";
import { format, parse } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface PatientHistoryProps {
  patient: Patient;
}

export function PatientHistory({ patient }: PatientHistoryProps) {
  // Process medical history for timeline chart
  const chartData = patient.medicalHistory.map(event => ({
    date: format(new Date(event.date), 'MMM yyyy'),
    severity: event.severity === 'Critical' ? 4 : 
              event.severity === 'High' ? 3 :
              event.severity === 'Medium' ? 2 : 1,
    condition: event.condition,
    fullDate: event.date
  })).sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'critical';
      case 'high':
        return 'critical';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getSeverityDotColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-critical';
      case 'high':
        return 'bg-critical';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Medical Events Timeline - 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  domain={[0, 4]}
                  tickFormatter={(value) => 
                    value === 4 ? 'Critical' : 
                    value === 3 ? 'High' :
                    value === 2 ? 'Medium' : 'Low'
                  }
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.condition}</p>
                          <p className="text-sm text-muted-foreground">{label}</p>
                          <Badge 
                            variant={getSeverityColor(
                              data.severity === 4 ? 'Critical' : 
                              data.severity === 3 ? 'High' :
                              data.severity === 2 ? 'Medium' : 'Low'
                            ) as any}
                            className="text-xs mt-1"
                          >
                            {data.severity === 4 ? 'Critical' : 
                             data.severity === 3 ? 'High' :
                             data.severity === 2 ? 'Medium' : 'Low'}
                          </Badge>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="severity" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Timeline */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Detailed Medical History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patient.medicalHistory
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((event, index) => (
              <div key={event.id} className="flex gap-4 relative">
                {/* Timeline line */}
                {index < patient.medicalHistory.length - 1 && (
                  <div className="absolute left-3 top-8 w-0.5 h-full bg-border" />
                )}
                
                {/* Event marker */}
                <div className={`w-6 h-6 rounded-full ${getSeverityDotColor(event.severity)} flex-shrink-0 mt-1 border-2 border-background shadow-sm`} />
                
                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gradient-card p-4 rounded-lg border border-border shadow-card">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{event.condition}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(event.date), 'dd MMMM yyyy')} • Dr. {event.doctor}
                        </p>
                      </div>
                      <Badge 
                        variant={getSeverityColor(event.severity) as any}
                        className="text-xs"
                      >
                        {event.severity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">Notes:</p>
                        <p className="text-sm text-muted-foreground">{event.notes}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-foreground">Treatment:</p>
                        <p className="text-sm text-muted-foreground">{event.treatment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Condition Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Condition Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Critical', 'High', 'Medium', 'Low'].map(severity => {
              const count = patient.medicalHistory.filter(event => event.severity === severity).length;
              return (
                <div key={severity} className="text-center p-4 bg-gradient-card rounded-lg border border-border">
                  <div className={`w-8 h-8 rounded-full ${getSeverityDotColor(severity)} mx-auto mb-2`} />
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{severity} Events</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}