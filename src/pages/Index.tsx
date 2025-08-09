import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { PatientCard } from "@/components/PatientCard";
import { PatientProfile } from "@/components/PatientProfile";
import { SettingsDialog } from "@/components/SettingsDialog";
import { mockGPMetrics, getTodaysPatients } from "@/data/mockPatients";
import { Patient } from "@/types/medical";
import { AskMeBot } from "@/components/AskMeBot";
import { 
  Users, Clock, UserCheck, Calendar,
  Search, Filter, Bell, Menu
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jataNegara from "@/assets/jata-negara-malaysia.png";

const Index = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const todaysPatients = getTodaysPatients();
  const filteredPatients = todaysPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.ic.includes(searchTerm) ||
    patient.diseases.some(disease => 
      disease.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (selectedPatient) {
    return (
      <div className="min-h-screen bg-background p-6">
        <PatientProfile 
          patient={selectedPatient} 
          onBack={() => setSelectedPatient(null)} 
        />
        <AskMeBot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-header text-primary-foreground shadow-header">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={jataNegara} 
                alt="Jata Negara Malaysia" 
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-2xl font-bold">Klinikku+ Dashboard</h1>
                <p className="text-primary-foreground/80">Kementerian Kesihatan Malaysia</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">Hello Dr. Aisha Rahman!</p>
                <p className="text-sm text-primary-foreground/80">
                  {new Date().toLocaleDateString('en-MY', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <SettingsDialog />
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* GP Metrics */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Today's Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Patients Today"
              value={mockGPMetrics.patientsToday}
              icon={Users}
              description="Scheduled appointments"
            />
            <MetricCard
              title="Appointments Pending"
              value={mockGPMetrics.appointmentsPending}
              icon={Clock}
              description="Waiting to be seen"
              variant="warning"
            />
            <MetricCard
              title="Average Wait Time"
              value={`${mockGPMetrics.averageWaitTime} min`}
              icon={UserCheck}
              description="Patient wait time"
              variant="success"
            />
            <MetricCard
              title="Follow-ups Scheduled"
              value={mockGPMetrics.followUpsScheduled}
              icon={Calendar}
              description="Next week"
            />
          </div>
        </section>

        {/* Patient Search & Filter */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Today's Patients</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Patient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewProfile={setSelectedPatient}
              />
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No patients found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'No patients scheduled for today'}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Ask Me Bot */}
      <AskMeBot />
    </div>
  );
};

export default Index;
