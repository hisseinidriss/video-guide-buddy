import { useState, useEffect } from "react";
import { Settings, Folder, Save } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  videoLocation: string;
  onVideoLocationChange: (location: string) => void;
}

export const SettingsModal = ({ videoLocation, onVideoLocationChange }: SettingsModalProps) => {
  const [tempLocation, setTempLocation] = useState(videoLocation);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setTempLocation(videoLocation);
  }, [videoLocation]);

  const handleSave = () => {
    onVideoLocationChange(tempLocation);
    setIsOpen(false);
    toast({
      title: "Settings saved",
      description: "Video location has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setTempLocation(videoLocation);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 bg-card hover:bg-accent border-border shadow-[var(--kb-card-shadow)]"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Application Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Configure the video source location for the knowledge base.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="video-location" className="text-card-foreground">
              Video Location Path
            </Label>
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="video-location"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                placeholder="e.g., /path/to/videos or https://example.com/videos"
                className="pl-10 bg-input border-border"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Specify the folder path or URL where your video files are located.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary-glow">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};