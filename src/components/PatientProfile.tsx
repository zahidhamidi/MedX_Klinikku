import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Patient } from "@/types/medical";
import { 
  User, Phone, Heart, Calendar, Pill, FileText, 
  ArrowLeft, Send, MessageSquare, TrendingUp 
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { PatientHistory } from "./PatientHistory";

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
}

export function PatientProfile({ patient, onBack }: PatientProfileProps) {
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const timestamp = format(new Date(), 'dd/MM/yyyy HH:mm');
      setComments([...comments, `[${timestamp}] ${newComment}`]);
      setNewComment("");
    }
  };

  const generateSummary = () => {
    // Placeholder for AI-generated summary
    return `Patient ${patient.name} presents with ${patient.diseases.join(', ')}. Current BP: ${patient.bloodPressure.systolic}/${patient.bloodPressure.diastolic}. Recommend continued monitoring and medication compliance. Focus on lifestyle modifications for hypertension management.`;
  };

  const generateAppointmentSummary = () => {
    // Placeholder for AI-generated appointment summary
    const language = patient.languagePreference;
    return `Appointment Summary - ${patient.name}
Date: ${format(new Date(), 'dd/MM/yyyy')}
Conditions Discussed: ${patient.diseases.join(', ')}
Current Medications: ${patient.medications.map(m => m.name).join(', ')}
Next Appointment: ${format(new Date(patient.nextAppointmentDate), 'dd/MM/yyyy')}
Language: ${language}`;
  };

  if (activeTab === 'history') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setActiveTab('profile')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <h2 className="text-2xl font-bold">Medical History - {patient.name}</h2>
        </div>
        <PatientHistory patient={patient} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <p className="text-muted-foreground">IC: {patient.ic}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setActiveTab('history')}
            className="bg-gradient-to-r from-primary/10 to-primary/5"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View History
          </Button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Age</p>
                <p className="font-medium">{patient.age} years</p>
              </div>
              <div>
                <p className="text-muted-foreground">Gender</p>
                <p className="font-medium">{patient.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Blood Type</p>
                <p className="font-medium">{patient.bloodType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Language</p>
                <p className="font-medium">{patient.languagePreference}</p>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-muted-foreground text-sm">Contact</p>
              <p className="font-medium">{patient.contactNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Emergency Contact</p>
              <p className="font-medium">{patient.emergencyContact.name}</p>
              <p className="text-sm">{patient.emergencyContact.relationship} - {patient.emergencyContact.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-critical" />
              Vital Signs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-sm">Blood Pressure</p>
              <p className={`text-2xl font-bold ${
                patient.bloodPressure.systolic > 140 ? 'text-critical' : 'text-success'
              }`}>
                {patient.bloodPressure.systolic}/{patient.bloodPressure.diastolic}
              </p>
              <p className="text-xs text-muted-foreground">
                Measured: {format(new Date(patient.bloodPressure.date), 'dd/MM/yyyy')}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Current Conditions</p>
              <div className="flex flex-wrap gap-1">
                {patient.diseases.map((disease, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {disease}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-sm">Last Visit</p>
              <p className="font-medium">
                {format(new Date(patient.lastVisitDate), 'dd/MM/yyyy')}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Next Appointment</p>
              <p className="font-medium text-primary">
                {format(new Date(patient.nextAppointmentDate), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            Current Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patient.medications.map((med, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground">{med.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {med.dosage} - {med.frequency}
                </p>
                <p className="text-xs text-muted-foreground">
                  Started: {format(new Date(med.startDate), 'dd/MM/yyyy')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Summary */}
      <Card className="shadow-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            AI Medical Summary & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-sm leading-relaxed">{generateSummary()}</p>
          </div>
          <Button className="mt-3" size="sm">
            Get Updated AI Recommendations
          </Button>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Visit Notes & Comments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Last Visit Notes:</p>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm">{patient.lastVisitNotes}</p>
            </div>
          </div>
          
          {comments.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Recent Comments:</p>
              <div className="space-y-2">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-secondary/30 p-2 rounded text-sm">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Textarea
              placeholder="Add a comment about this patient..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <Button onClick={handleAddComment} className="self-end">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Generate Appointment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {generateAppointmentSummary()}
            </pre>
          </div>
          <Button className="bg-gradient-medical text-primary-foreground">
            Send Summary to Patient
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}