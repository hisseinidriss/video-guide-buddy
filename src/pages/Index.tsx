import { useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { VideoResults } from "@/components/VideoResults";
import { VideoPlayer } from "@/components/VideoPlayer";
import { SettingsModal } from "@/components/SettingsModal";
import isdbLogo from "@/assets/isdb-logo.png";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

// Mock data for demonstration
const mockVideos: Video[] = [
  {
    id: "1",
    title: "How to Reset Your Password",
    description: "Step-by-step guide on resetting your account password and security settings.",
    duration: "3:24",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: "2", 
    title: "Troubleshooting Login Issues",
    description: "Common solutions for login problems and account access issues.",
    duration: "5:12",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
  },
  {
    id: "3",
    title: "Setting Up Two-Factor Authentication",
    description: "Learn how to enable and configure 2FA for enhanced account security.",
    duration: "4:38",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [videoLocation, setVideoLocation] = useState("/videos");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simple mock search - filter videos by title containing search terms
    const filtered = mockVideos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setShowResults(true);
    setSelectedVideo(null);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleBackToResults = () => {
    setSelectedVideo(null);
  };

  const handleBackToHome = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SettingsModal
        videoLocation={videoLocation}
        onVideoLocationChange={setVideoLocation}
      />

      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          // Home/Landing Page
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
            <div className="mb-8">
              <img
                src={isdbLogo}
                alt="ISDB Logo"
                className="h-20 w-auto mx-auto mb-6 object-contain"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Knowledge Base
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find answers to your questions with our comprehensive video library
              </p>
            </div>
            
            <SearchBox onSearch={handleSearch} />
            
            <div className="mt-8 text-sm text-muted-foreground">
              Search for topics like "password reset", "login issues", or "two-factor authentication"
            </div>
          </div>
        ) : (
          // Results Page
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={handleBackToHome}
                className="text-primary hover:text-primary-glow transition-colors text-sm font-medium"
              >
                ← Back to Home
              </button>
              <img
                src={isdbLogo}
                alt="ISDB"
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <div className="mb-8">
              <SearchBox onSearch={handleSearch} />
            </div>
            
            <VideoResults
              videos={searchResults}
              onVideoSelect={handleVideoSelect}
              searchQuery={searchQuery}
            />
          </div>
        )}
      </main>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={handleCloseVideo}
          onBack={handleBackToResults}
        />
      )}
    </div>
  );
};

export default Index;
