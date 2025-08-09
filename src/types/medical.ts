export interface Patient {
  id: string;
  name: string;
  ic: string; // Malaysian IC number
  age: number;
  gender: 'Male' | 'Female';
  bloodType: string;
  bloodPressure: {
    systolic: number;
    diastolic: number;
    date: string;
  };
  diseases: string[];
  lastVisitDate: string;
  nextAppointmentDate: string;
  lastVisitNotes: string;
  medications: Medication[];
  languagePreference: 'English' | 'Malay' | 'Chinese';
  medicalHistory: MedicalEvent[];
  contactNumber: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

export interface MedicalEvent {
  id: string;
  date: string;
  condition: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  notes: string;
  treatment: string;
  doctor: string;
}

export interface GPMetrics {
  patientsToday: number;
  appointmentsPending: number;
  averageWaitTime: number;
  followUpsScheduled: number;
}

export interface AppointmentSummary {
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  nextAppointment: string;
  notes: string;
  language: 'English' | 'Malay' | 'Chinese';
}