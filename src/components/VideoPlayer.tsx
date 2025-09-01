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

  // Debug: Log the constructed path
  console.log('Video path:', getFullVideoPath(video.videoUrl));
  console.log('Video location setting:', videoLocation);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-card">
        <div className="flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-10">
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
              onError={(e) => {
                console.error('Video failed to load:', getFullVideoPath(video.videoUrl));
                console.error('Video error:', e);
              }}
              onLoadStart={() => {
                console.log('Video load started for:', getFullVideoPath(video.videoUrl));
              }}
            >
              <source src={getFullVideoPath(video.videoUrl)} type="video/mp4" />
              Your browser does not support the video tag or the video file cannot be found.
              <br />
              <br />
              <strong>Expected video path:</strong> {getFullVideoPath(video.videoUrl)}
              <br />
              <strong>Please check your video location setting and ensure the video files are accessible.</strong>
            </video>
          </div>
        </div>
        
        <div className="p-6 bg-card">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            {video.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base">
            {video.description}
          </p>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
            <strong>Video Location:</strong> {videoLocation}
            <br />
            <strong>Video File:</strong> {video.videoUrl}
            <br />
            <strong>Full Path:</strong> {getFullVideoPath(video.videoUrl)}
          </div>
        </div>
      </Card>
    </div>
  );
};