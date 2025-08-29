import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  onBack: () => void;
  videoLocation: string;
}

export const VideoPlayer = ({ video, onClose, onBack, videoLocation }: VideoPlayerProps) => {
  // Construct full video path
  const getFullVideoPath = (filename: string) => {
    // Handle different path formats
    const basePath = videoLocation.endsWith('/') ? videoLocation : videoLocation + '/';
    return basePath + filename;
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-0">
          <div className="aspect-video bg-black">
            <video
              controls
              className="w-full h-full"
              poster={video.thumbnail}
              preload="metadata"
            >
              <source src={getFullVideoPath(video.videoUrl)} type="video/mp4" />
              <source src={getFullVideoPath(video.videoUrl)} type="video/webm" />
              <source src={getFullVideoPath(video.videoUrl)} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-3">
            {video.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {video.description}
          </p>
        </div>
      </Card>
    </div>
  );
};