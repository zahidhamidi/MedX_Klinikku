import { Patient } from "@/types/medical";

export class GroqAPI {
  private apiKey: string;
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(message: string, patientContext?: Patient[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Groq API key not configured');
    }

    const systemPrompt = `You are an AI assistant for Malaysian General Practitioners. You have access to patient data and can provide medical insights, suggestions, and answer questions about patients.

${patientContext ? `Current patient data context:
${JSON.stringify(patientContext, null, 2)}` : ''}

Please provide helpful, medically informed responses while being mindful of:
- Malaysian medical practices and guidelines
- Patient privacy and confidentiality
- Professional medical advice limitations
- Cultural sensitivity for Malaysian patients

Always remind users that AI suggestions should not replace professional medical judgment.`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Groq API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Groq API error:', error);
      throw error;
    }
  }

  async generatePatientSummary(patient: Patient): Promise<string> {
    const message = `Please provide a comprehensive summary and recommendations for this patient scheduled for today's appointment. Focus on:
1. Key medical conditions and current status
2. Important points from recent medical history
3. Current medications and any potential concerns
4. Recommendations for today's consultation
5. Any red flags or priority items to address

Patient: ${patient.name}`;

    return this.sendMessage(message, [patient]);
  }

  async generateAppointmentSummary(patient: Patient, diagnosis: string, treatment: string, notes: string): Promise<string> {
    const language = patient.languagePreference;
    
    const message = `Generate an appointment summary for the patient in ${language} language, using layman terms. Include:
- Today's diagnosis: ${diagnosis}
- Treatment provided: ${treatment}
- Next appointment details
- Any instructions or advice
- Notes: ${notes}

Make it easy to understand for the patient's medical knowledge level.`;

    return this.sendMessage(message, [patient]);
  }
}
