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
  // Construct full video path with proper URL encoding for GitHub
  const getFullVideoPath = (filename: string) => {
    // Handle different path formats
    const basePath = videoLocation.endsWith('/') ? videoLocation : videoLocation + '/';
    // URL encode the filename for GitHub raw URLs (spaces become %20)
    const encodedFilename = encodeURIComponent(filename);
    return basePath + encodedFilename;
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
          <div className="aspect-video bg-black relative">
            <iframe
              src={`https://docs.google.com/file/d/1tR2z3K4mN9Lb8PqW5XcV7Y6nM2sT8uE1/preview`}
              width="100%"
              height="100%"
              className="absolute inset-0"
              allow="autoplay"
              title={video.title}
              onError={() => {
                console.error('Iframe failed to load video');
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
              <div className="text-center p-8">
                <h3 className="text-xl mb-4">Video Player Notice</h3>
                <p className="mb-4">
                  GitHub raw URLs don't support direct video streaming due to CORS restrictions.
                </p>
                <p className="mb-4 text-sm">
                  <strong>Current video URL:</strong><br />
                  <code className="bg-gray-800 p-1 rounded text-xs break-all">
                    {getFullVideoPath(video.videoUrl)}
                  </code>
                </p>
                <div className="text-left text-sm space-y-2">
                  <p><strong>Recommended solutions:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Upload videos to Google Drive and use sharing links</li>
                    <li>Use YouTube, Vimeo, or Wistia for video hosting</li>
                    <li>Deploy videos to a CDN like CloudFlare or AWS S3</li>
                    <li>Use Firebase Storage or similar cloud storage</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => window.open(getFullVideoPath(video.videoUrl), '_blank')}
                  className="mt-4"
                  variant="outline"
                >
                  Try Direct Link
                </Button>
              </div>
            </div>
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