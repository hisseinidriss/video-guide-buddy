import { Play, Clock, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { toast } from "sonner";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface VideoResultsProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  searchQuery: string;
  videoLocation: string;
}

export const VideoResults = ({ videos, onVideoSelect, searchQuery, videoLocation }: VideoResultsProps) => {
  const [videoInteractions, setVideoInteractions] = useState<Record<string, { liked: boolean; disliked: boolean; likes: number; dislikes: number }>>({});

  const handleLike = useCallback((videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoInteractions(prev => {
      const current = prev[videoId] || { liked: false, disliked: false, likes: 0, dislikes: 0 };
      const wasLiked = current.liked;
      const wasDisliked = current.disliked;
      
      return {
        ...prev,
        [videoId]: {
          ...current,
          liked: !wasLiked,
          disliked: false,
          likes: current.likes + (wasLiked ? -1 : 1) + (wasDisliked ? 1 : 0),
          dislikes: wasDisliked ? current.dislikes - 1 : current.dislikes
        }
      };
    });
  }, []);

  const handleDislike = useCallback((videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoInteractions(prev => {
      const current = prev[videoId] || { liked: false, disliked: false, likes: 0, dislikes: 0 };
      const wasLiked = current.liked;
      const wasDisliked = current.disliked;
      
      return {
        ...prev,
        [videoId]: {
          ...current,
          liked: false,
          disliked: !wasDisliked,
          likes: wasLiked ? current.likes - 1 : current.likes,
          dislikes: current.dislikes + (wasDisliked ? -1 : 1) + (wasLiked ? 1 : 0)
        }
      };
    });
  }, []);

  const handleShare = useCallback(async (video: Video, e: React.MouseEvent) => {
    e.stopPropagation();
    
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
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  }, []);

  if (videos.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg">
          No videos found for "{searchQuery}"
        </div>
        <div className="text-muted-foreground text-sm mt-2">
          Try different keywords or check your settings for video source
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Found {videos.length} video{videos.length !== 1 ? 's' : ''} for "{searchQuery}"
        </h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => {
          const interactions = videoInteractions[video.id] || { liked: false, disliked: false, likes: 0, dislikes: 0 };
          
          return (
            <Card
              key={video.id}
              className="group overflow-hidden bg-card hover:shadow-[var(--isdb-card-shadow)] transition-[var(--transition-smooth)] border-border hover:border-primary/30"
            >
              <div 
                className="relative aspect-video bg-muted cursor-pointer"
                onClick={() => onVideoSelect(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%2394a3b8'%3EVideo%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 text-primary ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded backdrop-blur-sm">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 
                  className="font-medium text-card-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => onVideoSelect(video)}
                >
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${interactions.liked ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary'}`}
                      onClick={(e) => handleLike(video.id, e)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      {interactions.likes > 0 && (
                        <span className="ml-1 text-xs">{interactions.likes}</span>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${interactions.disliked ? 'text-destructive bg-destructive/10' : 'text-muted-foreground hover:text-destructive'}`}
                      onClick={(e) => handleDislike(video.id, e)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      {interactions.dislikes > 0 && (
                        <span className="ml-1 text-xs">{interactions.dislikes}</span>
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:text-primary"
                    onClick={(e) => handleShare(video, e)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};