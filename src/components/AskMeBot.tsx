import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function AskMeBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI medical assistant. I can help you with general medical questions, drug interactions, treatment guidelines, and best practices. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response (placeholder)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateMockResponse(currentMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setCurrentMessage("");
  };

  const generateMockResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('hypertension') || lowerQuestion.includes('blood pressure')) {
      return "For hypertension management: Consider ACE inhibitors or ARBs as first-line therapy. Target BP <140/90 for most patients, <130/80 for those with diabetes or CKD. Recommend lifestyle modifications including DASH diet, regular exercise, and sodium reduction. Reference: 2017 ACC/AHA Hypertension Guidelines.";
    }
    
    if (lowerQuestion.includes('diabetes') || lowerQuestion.includes('metformin')) {
      return "For Type 2 diabetes: Metformin is first-line therapy unless contraindicated. Target HbA1c <7% for most adults. Consider cardiovascular benefits when selecting second-line agents (SGLT2 inhibitors, GLP-1 agonists). Regular monitoring of kidney function recommended. Reference: ADA Standards of Medical Care 2024.";
    }
    
    if (lowerQuestion.includes('drug interaction')) {
      return "Always check for drug interactions using reliable databases like Lexicomp or UpToDate. Pay special attention to CYP450 interactions, QT prolongation risks, and drug-disease interactions. Consider patient-specific factors like age, kidney function, and liver function.";
    }
    
    return "Thank you for your question. For specific medical advice, please consult current clinical guidelines and consider patient-specific factors. I recommend checking resources like UpToDate, DynaMed, or local clinical practice guidelines for the most current evidence-based recommendations.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-medical text-primary-foreground shadow-float hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-96 h-[500px] shadow-float bg-card border border-border">
          <CardHeader className="pb-3 bg-gradient-header text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary-foreground">
                <Bot className="h-5 w-5" />
                AskMe Bot
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot 
                      ? 'bg-secondary/30 text-foreground' 
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  
                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a medical question..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}