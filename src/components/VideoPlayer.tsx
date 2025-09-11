import { X, ArrowLeft, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface Video {
  id: string;
  title: string;
  description: string;
  steps: string[] | { text: string; timestamp: number }[];
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
  const [videoInteractions, setVideoInteractions] = useState<{ liked: boolean; disliked: boolean; likes: number; dislikes: number }>({ liked: false, disliked: false, likes: 0, dislikes: 0 });
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const handleLike = useCallback(() => {
    setVideoInteractions(prev => {
      const wasLiked = prev.liked;
      const wasDisliked = prev.disliked;
      
      return {
        ...prev,
        liked: !wasLiked,
        disliked: false,
        likes: prev.likes + (wasLiked ? -1 : 1) + (wasDisliked ? 1 : 0),
        dislikes: wasDisliked ? prev.dislikes - 1 : prev.dislikes
      };
    });
  }, []);

  const handleDislike = useCallback(() => {
    setVideoInteractions(prev => {
      const wasLiked = prev.liked;
      const wasDisliked = prev.disliked;
      
      return {
        ...prev,
        liked: false,
        disliked: !wasDisliked,
        likes: wasLiked ? prev.likes - 1 : prev.likes,
        dislikes: prev.dislikes + (wasDisliked ? -1 : 1) + (wasLiked ? 1 : 0)
      };
    });
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied to clipboard!",
        });
      } catch (err) {
        toast({
          title: "Failed to copy link",
          variant: "destructive",
        });
      }
    }
  }, [video.title, video.description]);
  // Construct full video path for different hosting services
  const getFullVideoPath = (filename: string, timestamp?: number) => {
    if (videoLocation.includes('drive.google.com')) {
      // For Google Drive, expect the filename to be a file ID or full embed URL
      if (filename.includes('drive.google.com')) {
        return filename; // Already a full Google Drive URL
      } else {
        // Assume filename is a Google Drive file ID
        const baseUrl = `https://drive.google.com/file/d/${filename}/preview`;
        if (timestamp) {
          // Google Drive doesn't support direct timestamp URLs, but we can try with the t parameter
          return `${baseUrl}?t=${timestamp}s`;
        }
        return baseUrl;
      }
    } else {
      // For other services (GitHub, CDN, etc.)
      const basePath = videoLocation.endsWith('/') ? videoLocation : videoLocation + '/';
      const encodedFilename = encodeURIComponent(filename);
      return basePath + encodedFilename;
    }
  };

  const jumpToTimestamp = useCallback((timestamp: number) => {
    if (videoLocation.includes('drive.google.com')) {
      // For Google Drive videos, we need to reload the iframe with timestamp
      const newUrl = getFullVideoPath(video.videoUrl, timestamp);
      setCurrentVideoUrl(newUrl);
      toast({
        title: "Jumping to timestamp",
        description: `Seeking to ${Math.floor(timestamp / 60)}:${(timestamp % 60).toString().padStart(2, '0')}`,
      });
    } else {
      // For regular HTML5 videos, seek directly
      if (videoRef.current) {
        videoRef.current.currentTime = timestamp;
        toast({
          title: "Jumped to timestamp",
          description: `Now at ${Math.floor(timestamp / 60)}:${(timestamp % 60).toString().padStart(2, '0')}`,
        });
      }
    }
  }, [video.videoUrl, videoLocation]);

  // Initialize the video URL
  useState(() => {
    setCurrentVideoUrl(getFullVideoPath(video.videoUrl));
  });

  // Debug: Log the constructed path
  console.log('Video path:', currentVideoUrl);
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
          <div className="aspect-video bg-black relative">
            {videoLocation.includes('drive.google.com') ? (
              // Google Drive embed
              <iframe
                ref={iframeRef}
                src={currentVideoUrl}
                width="100%"
                height="100%"
                className="absolute inset-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={video.title}
                key={currentVideoUrl} // Force re-render when URL changes
                onError={() => {
                  console.error('Google Drive video failed to load');
                }}
              />
            ) : (
              // Fallback video player
              <video
                ref={videoRef}
                controls
                className="w-full h-full"
                poster={video.thumbnail}
                preload="metadata"
                onError={(e) => {
                  console.error('Video failed to load:', currentVideoUrl);
                  console.error('Video error:', e);
                }}
              >
                <source src={currentVideoUrl} type="video/mp4" />
                Your browser does not support the video tag or the video file cannot be found.
              </video>
            )}
          </div>
        </div>
        
        <div className="p-6 bg-card">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            {video.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-6">
            {video.description}
          </p>

          {/* Step-by-step Instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">
              Step-by-Step Instructions
            </h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <ol className="space-y-3">
                {video.steps.map((step, index) => {
                  // Handle both old format (string[]) and new format ({ text: string; timestamp: number }[])
                  const isNewFormat = typeof step === 'object' && step !== null && 'text' in step;
                  const stepText = isNewFormat ? step.text : step;
                  const stepTimestamp = isNewFormat ? step.timestamp : 0;
                  
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        {isNewFormat ? (
                          <button 
                            className="text-left text-muted-foreground leading-relaxed hover:text-primary transition-colors cursor-pointer group flex items-start gap-2 w-full"
                            onClick={() => jumpToTimestamp(stepTimestamp)}
                          >
                            <span className="flex-1">{stepText}</span>
                            <span className="text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 px-2 py-1 rounded">
                              {Math.floor(stepTimestamp / 60)}:{(stepTimestamp % 60).toString().padStart(2, '0')}
                            </span>
                          </button>
                        ) : (
                          <span className="text-muted-foreground leading-relaxed">
                            {stepText}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className={`h-10 px-4 ${videoInteractions.liked ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary'}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-5 w-5 mr-2" />
              Like
              {videoInteractions.likes > 0 && (
                <span className="ml-2 text-sm">({videoInteractions.likes})</span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-10 px-4 ${videoInteractions.disliked ? 'text-destructive bg-destructive/10' : 'text-muted-foreground hover:text-destructive'}`}
              onClick={handleDislike}
            >
              <ThumbsDown className="h-5 w-5 mr-2" />
              Dislike
              {videoInteractions.dislikes > 0 && (
                <span className="ml-2 text-sm">({videoInteractions.dislikes})</span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 px-4 text-muted-foreground hover:text-primary"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};