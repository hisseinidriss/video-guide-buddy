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

// Real ISDB video library from SharePoint
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Create a team with team templates",
    description: "Learn how to create new teams using pre-built templates for different organizational needs and purposes.",
    duration: "3:24",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
    videoUrl: "Create a team with team templates.mp4"
  },
  {
    id: "2",
    title: "How to Join a meeting", 
    description: "Step-by-step guide on joining Teams meetings from different devices and platforms.",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=225&fit=crop",
    videoUrl: "How to Join a meeting.mp4"
  },
  {
    id: "3",
    title: "Join a Teams meeting",
    description: "Complete tutorial on accessing and participating in Microsoft Teams meetings effectively.",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop", 
    videoUrl: "Join a Teams meeting.mp4"
  },
  {
    id: "4",
    title: "Make Calls",
    description: "Learn how to initiate and manage voice and video calls in Microsoft Teams.",
    duration: "5:30",
    thumbnail: "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=400&h=225&fit=crop",
    videoUrl: "Make Calls.mp4"
  },
  {
    id: "5", 
    title: "Manage meetings",
    description: "Comprehensive guide on scheduling, organizing, and controlling Teams meetings.",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=225&fit=crop",
    videoUrl: "Manage meetings.mp4"
  },
  {
    id: "6",
    title: "Post a message to multiple channels",
    description: "Learn how to efficiently broadcast messages across multiple Teams channels simultaneously.",
    duration: "2:30", 
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
    videoUrl: "Post a message to multiple channels.mp4"
  },
  {
    id: "7",
    title: "Search and filter messages",
    description: "Master the search functionality to quickly find specific messages and conversations.",
    duration: "3:20",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop",
    videoUrl: "Search and filter messages.mp4"
  },
  {
    id: "8", 
    title: "Search and filter people and files",
    description: "Discover how to locate team members, contacts, and shared files efficiently.",
    duration: "4:20",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "Search and filter people and files.mp4"
  },
  {
    id: "9",
    title: "Search and find Files", 
    description: "Complete tutorial on finding and accessing shared files and documents in Teams.",
    duration: "4:50",
    thumbnail: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=225&fit=crop",
    videoUrl: "Search and find Files.mp4"
  },
  {
    id: "10",
    title: "Setting up calls and Chat",
    description: "Learn the fundamentals of initiating calls and chat conversations in Teams.",
    duration: "3:35",
    thumbnail: "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=400&h=225&fit=crop", 
    videoUrl: "Seeting up calls and Chat.mp4"
  },
  {
    id: "11",
    title: "Set up a delegate to take your calls",
    description: "Configure call delegation settings to have someone else handle your incoming calls.",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
    videoUrl: "Set up a delegate to take your calls.mp4"
  },
  {
    id: "12",
    title: "Show your screen during a meeting",
    description: "Master screen sharing features to present content effectively during Teams meetings.",
    duration: "1:45", 
    thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=225&fit=crop",
    videoUrl: "Show your screen during a meeting.mp4"
  },
  {
    id: "13",
    title: "Upload and share files",
    description: "Learn how to upload, organize, and share files and documents with your team members.",
    duration: "4:50",
    thumbnail: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=225&fit=crop",
    videoUrl: "Upload and share files.mp4"
  },
  {
    id: "14", 
    title: "Work with external guests",
    description: "Complete guide on inviting and collaborating with external users and guest accounts.",
    duration: "3:25",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "Work with external guests.mp4"
  },
  {
    id: "15",
    title: "Hide chats and delete messages",
    description: "Learn privacy and message management features including hiding conversations and deleting messages.",
    duration: "4:05",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
    videoUrl: "Hide chats and delete messages.mp4"
  },
  {
    id: "16",
    title: "Live Event", 
    description: "Comprehensive tutorial on creating and managing live events and broadcasts in Teams.",
    duration: "4:35",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=225&fit=crop",
    videoUrl: "Live Event.mp4"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [videoLocation, setVideoLocation] = useState("https://drive.google.com/drive/folders/1dqBl3FeMA8tJmQ0kNrI8FiXXo9Bs8V_n");

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
                ISDB Knowledge Base
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access comprehensive support resources and video tutorials
              </p>
            </div>
            
            <SearchBox onSearch={handleSearch} />
            
            <div className="mt-8 text-sm text-muted-foreground">
              Search for Microsoft Teams topics like "join meeting", "make calls", "share files", or "manage meetings"
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
              videoLocation={videoLocation}
            />
          </div>
        )}
      </main>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={handleCloseVideo}
          onBack={handleBackToResults}
          videoLocation={videoLocation}
        />
      )}
    </div>
  );
};

export default Index;
