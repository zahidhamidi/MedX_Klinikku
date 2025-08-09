import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SettingsDialog() {
  const [groqApiKey, setGroqApiKey] = useState(localStorage.getItem('groq_api_key') || '');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('groq_api_key', groqApiKey);
    toast({
      title: "Settings saved",
      description: "Groq API key has been saved successfully.",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your API settings for the medical dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groq-api-key">Groq API Key</Label>
            <Input
              id="groq-api-key"
              type="password"
              placeholder="Enter your Groq API key"
              value={groqApiKey}
              onChange={(e) => setGroqApiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This key will be stored locally and used for AI-powered features.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}