import { Patient, GPMetrics } from '@/types/medical';

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Ahmad bin Abdullah",
    ic: "920815-14-5678",
    age: 31,
    gender: "Male",
    bloodType: "O+",
    bloodPressure: {
      systolic: 140,
      diastolic: 85,
      date: "2024-08-08"
    },
    diseases: ["Hypertension", "Type 2 Diabetes"],
    lastVisitDate: "2024-08-05",
    nextAppointmentDate: new Date().toISOString().split('T')[0] + "T09:00:00",
    lastVisitNotes: "Blood pressure slightly elevated. Patient reports adherence to medication. Advised dietary modifications.",
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2024-06-01",
        prescribedBy: "Dr. Aisha Rahman"
      },
      {
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        startDate: "2024-07-15",
        prescribedBy: "Dr. Aisha Rahman"
      }
    ],
    languagePreference: "Malay",
    medicalHistory: [
      {
        id: "E001",
        date: "2024-01-15",
        condition: "Fever",
        severity: "Low",
        notes: "Viral fever, recovered after 3 days",
        treatment: "Paracetamol, rest",
        doctor: "Dr. Aisha Rahman"
      },
      {
        id: "E002",
        date: "2024-03-22",
        condition: "Hypertension",
        severity: "Medium",
        notes: "First diagnosis of hypertension",
        treatment: "Lifestyle modification",
        doctor: "Dr. Aisha Rahman"
      },
      {
        id: "E003",
        date: "2024-06-01",
        condition: "Type 2 Diabetes",
        severity: "Medium",
        notes: "HbA1c 8.2%, started on Metformin",
        treatment: "Metformin, dietary counseling",
        doctor: "Dr. Aisha Rahman"
      }
    ],
    contactNumber: "+60123456789",
    emergencyContact: {
      name: "Siti Abdullah",
      relationship: "Wife",
      phone: "+60123456790"
    }
  },
  {
    id: "P002",
    name: "Lim Wei Ming",
    ic: "880423-08-1234",
    age: 36,
    gender: "Male",
    bloodType: "A+",
    bloodPressure: {
      systolic: 120,
      diastolic: 75,
      date: "2024-08-08"
    },
    diseases: ["Asthma"],
    lastVisitDate: "2024-08-07",
    nextAppointmentDate: new Date().toISOString().split('T')[0] + "T09:30:00",
    lastVisitNotes: "Asthma well controlled. No recent attacks. Continue current medication regimen.",
    medications: [
      {
        name: "Salbutamol Inhaler",
        dosage: "100mcg",
        frequency: "As needed",
        startDate: "2024-01-10",
        prescribedBy: "Dr. Aisha Rahman"
      },
      {
        name: "Budesonide Inhaler",
        dosage: "200mcg",
        frequency: "Twice daily",
        startDate: "2024-02-01",
        prescribedBy: "Dr. Aisha Rahman"
      }
    ],
    languagePreference: "Chinese",
    medicalHistory: [
      {
        id: "E004",
        date: "2024-02-14",
        condition: "Asthma Exacerbation",
        severity: "Medium",
        notes: "Triggered by dust exposure",
        treatment: "Increased steroid inhaler, prednisone course",
        doctor: "Dr. Aisha Rahman"
      },
      {
        id: "E005",
        date: "2024-05-10",
        condition: "Upper Respiratory Infection",
        severity: "Low",
        notes: "Common cold symptoms",
        treatment: "Symptomatic treatment",
        doctor: "Dr. Aisha Rahman"
      }
    ],
    contactNumber: "+60187654321",
    emergencyContact: {
      name: "Lim Ai Ling",
      relationship: "Wife",
      phone: "+60187654322"
    }
  },
  {
    id: "P003",
    name: "Priya Devi",
    ic: "950612-03-9876",
    age: 29,
    gender: "Female",
    bloodType: "B+",
    bloodPressure: {
      systolic: 110,
      diastolic: 70,
      date: "2024-08-08"
    },
    diseases: ["Migraine"],
    lastVisitDate: "2024-08-06",
    nextAppointmentDate: new Date().toISOString().split('T')[0] + "T10:00:00",
    lastVisitNotes: "Migraine frequency reduced. Patient responding well to preventive medication.",
    medications: [
      {
        name: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed for migraine",
        startDate: "2024-03-01",
        prescribedBy: "Dr. Aisha Rahman"
      },
      {
        name: "Propranolol",
        dosage: "40mg",
        frequency: "Twice daily",
        startDate: "2024-04-15",
        prescribedBy: "Dr. Aisha Rahman"
      }
    ],
    languagePreference: "English",
    medicalHistory: [
      {
        id: "E006",
        date: "2024-01-08",
        condition: "Severe Migraine",
        severity: "High",
        notes: "First presentation with severe headache",
        treatment: "Pain management, trigger identification",
        doctor: "Dr. Aisha Rahman"
      },
      {
        id: "E007",
        date: "2024-04-20",
        condition: "Migraine Follow-up",
        severity: "Low",
        notes: "Good response to preventive therapy",
        treatment: "Continue current regimen",
        doctor: "Dr. Aisha Rahman"
      }
    ],
    contactNumber: "+60198765432",
    emergencyContact: {
      name: "Raj Kumar",
      relationship: "Husband",
      phone: "+60198765433"
    }
  },
  {
    id: "P004",
    name: "Fatimah binti Hassan",
    ic: "750920-05-4567",
    age: 49,
    gender: "Female",
    bloodType: "AB+",
    bloodPressure: {
      systolic: 160,
      diastolic: 95,
      date: "2024-08-08"
    },
    diseases: ["Hypertension", "High Cholesterol", "Osteoarthritis"],
    lastVisitDate: "2024-08-04",
    nextAppointmentDate: new Date().toISOString().split('T')[0] + "T10:30:00",
    lastVisitNotes: "Multiple comorbidities require close monitoring. Blood pressure still elevated despite medication.",
    medications: [
      {
        name: "Losartan",
        dosage: "50mg",
        frequency: "Once daily",
        startDate: "2024-05-01",
        prescribedBy: "Dr. Aisha Rahman"
      },
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily at night",
        startDate: "2024-06-01",
        prescribedBy: "Dr. Aisha Rahman"
      },
      {
        name: "Glucosamine",
        dosage: "1500mg",
        frequency: "Once daily",
        startDate: "2024-07-01",
        prescribedBy: "Dr. Aisha Rahman"
      }
    ],
    languagePreference: "Malay",
    medicalHistory: [
      {
        id: "E008",
        date: "2024-03-15",
        condition: "Knee Pain",
        severity: "Medium",
        notes: "Osteoarthritis symptoms worsening",
        treatment: "NSAIDs, physiotherapy referral",
        doctor: "Dr. Aisha Rahman"
      },
      {
        id: "E009",
        date: "2024-05-01",
        condition: "Hypertension",
        severity: "High",
        notes: "Blood pressure 180/100, started on ACE inhibitor",
        treatment: "Losartan initiated",
        doctor: "Dr. Aisha Rahman"
      }
    ],
    contactNumber: "+60176543210",
    emergencyContact: {
      name: "Hassan bin Ahmad",
      relationship: "Husband",
      phone: "+60176543211"
    }
  }
];

export const mockGPMetrics: GPMetrics = {
  patientsToday: 36,
  appointmentsPending: 8,
  averageWaitTime: 15,
  followUpsScheduled: 12
};

// Sort patients by appointment time
export const getTodaysPatients = () => {
  return mockPatients
    .filter(patient => {
      const appointmentDate = new Date(patient.nextAppointmentDate);
      const today = new Date();
      return appointmentDate.toDateString() === today.toDateString();
    })
    .sort((a, b) => 
      new Date(a.nextAppointmentDate).getTime() - new Date(b.nextAppointmentDate).getTime()
    );
};