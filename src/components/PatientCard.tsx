import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types/medical";
import { Clock, User, Heart, Phone, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

interface PatientCardProps {
  patient: Patient;
  onViewProfile: (patient: Patient) => void;
}

export function PatientCard({ patient, onViewProfile }: PatientCardProps) {
  const getAppointmentTime = () => {
    return format(new Date(patient.nextAppointmentDate), 'HH:mm');
  };

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

  const getHighestSeverity = () => {
    const severities = patient.medicalHistory.map(event => event.severity);
    if (severities.includes('Critical')) return 'Critical';
    if (severities.includes('High')) return 'High';
    if (severities.includes('Medium')) return 'Medium';
    return 'Low';
  };

  const isUrgent = patient.bloodPressure.systolic > 140 || patient.bloodPressure.diastolic > 90;

  return (
    <Card className="shadow-card hover:shadow-float transition-all duration-300 cursor-pointer group border border-border bg-gradient-card"
          onClick={() => onViewProfile(patient)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {patient.name}
              </h3>
              <p className="text-sm text-muted-foreground">IC: {patient.ic}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{getAppointmentTime()}</span>
            {isUrgent && (
              <AlertTriangle className="h-4 w-4 text-critical" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Age</p>
            <p className="font-medium">{patient.age}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Blood Type</p>
            <p className="font-medium">{patient.bloodType}</p>
          </div>
          <div>
            <p className="text-muted-foreground">BP</p>
            <p className={`font-medium ${isUrgent ? 'text-critical' : 'text-foreground'}`}>
              {patient.bloodPressure.systolic}/{patient.bloodPressure.diastolic}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Current Conditions</p>
          <div className="flex flex-wrap gap-1">
            {patient.diseases.slice(0, 2).map((disease, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="text-xs bg-secondary/60"
              >
                {disease}
              </Badge>
            ))}
            {patient.diseases.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{patient.diseases.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Badge 
              variant={getSeverityColor(getHighestSeverity()) as any}
              className="text-xs"
            >
              {getHighestSeverity()} Priority
            </Badge>
            <Badge variant="outline" className="text-xs">
              {patient.languagePreference}
            </Badge>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            View Profile
          </Button>
        </div>

        {patient.lastVisitNotes && (
          <div className="bg-muted/30 p-2 rounded text-xs">
            <p className="text-muted-foreground line-clamp-2">
              <strong>Last visit:</strong> {patient.lastVisitNotes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}