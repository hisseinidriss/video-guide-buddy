import { useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { VideoResults } from "@/components/VideoResults";
import { VideoPlayer } from "@/components/VideoPlayer";
import { SettingsModal } from "@/components/SettingsModal";
const isdbLogo = "/lovable-uploads/f8270399-744b-432b-9607-4c62763dffdc.png";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

// Real ISDB video library with Google Drive file IDs
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Create a team with team templates",
    description: "This comprehensive tutorial walks you through the process of creating new Microsoft Teams with pre-built templates designed for different organizational needs. You'll learn how to select the right template for your team's purpose, whether it's for project management, department collaboration, or specific business functions. The video covers accessing team templates, customizing team settings, adding members, and configuring channels to match your workflow requirements.",
    duration: "3:24",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
    videoUrl: "1occCV8QMNMaWSx9rohoE4iHmeTruVoDi"
  },
  {
    id: "2",
    title: "How to Join a meeting", 
    description: "Learn the various methods to join Microsoft Teams meetings seamlessly from any device or platform. This tutorial covers joining meetings through calendar invitations, direct links, phone dial-in options, and the Teams app. You'll discover troubleshooting tips for common connection issues, audio and video setup, and how to join as a guest without a Teams account. Perfect for users who need to participate in meetings across different devices and scenarios.",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=225&fit=crop",
    videoUrl: "1_P1I_E_Gy3JqmBCPnpr0GTVeTDYJgqWr"
  },
  {
    id: "3",
    title: "Join a Teams meeting",
    description: "A detailed guide focused specifically on accessing and participating effectively in Microsoft Teams meetings. This video demonstrates the step-by-step process of joining meetings from desktop, mobile, and web browsers. You'll learn about meeting lobby features, participant controls, chat functionality during meetings, and best practices for professional meeting etiquette. The tutorial also covers handling meeting permissions and what to do when facing access restrictions.",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop", 
    videoUrl: "1mz2UfBg_1Km01lucuN21fvMirwDHHs-e"
  },
  {
    id: "4",
    title: "Make Calls",
    description: "Master the art of initiating and managing both voice and video calls within Microsoft Teams. This comprehensive tutorial covers making one-on-one calls, group calls, and understanding the difference between calls and meetings. You'll learn how to start calls from chat, contacts, or the calling interface, manage call controls like mute, camera, and screen sharing during calls, and handle call forwarding and delegation. The video also includes tips for call quality optimization and managing call history.",
    duration: "5:30",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop",
    videoUrl: "1KFbHCEPdgZMoGJB4gFaGPYH1-n4fXcKt"
  },
  {
    id: "5", 
    title: "Manage meetings",
    description: "Take control of your Microsoft Teams meetings with this comprehensive management guide. Learn how to schedule meetings effectively, set up recurring meetings, and configure meeting options like lobby settings, attendee permissions, and recording capabilities. The tutorial covers managing meeting participants, controlling who can present, handling breakout rooms, and moderating discussions. You'll also discover advanced features like meeting policies, attendance reports, and post-meeting follow-up procedures.",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=225&fit=crop",
    videoUrl: "1drBiEimMimITaX0Y-3jlm1l0NN_BEc8v"
  },
  {
    id: "6",
    title: "Post a message to multiple channels",
    description: "Discover efficient communication strategies by learning how to broadcast messages across multiple Teams channels simultaneously. This tutorial demonstrates the cross-posting feature, which allows you to share important announcements, updates, or information with multiple teams at once. You'll learn when to use this feature appropriately, how to maintain message consistency, and manage responses across different channels. The video also covers best practices for organization-wide communications and avoiding message spam.",
    duration: "2:30", 
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
    videoUrl: "1oKKrfF-FAmqypOzNQVaxPZ86RQPcrBZL"
  },
  {
    id: "7",
    title: "Search and filter messages",
    description: "Become a Microsoft Teams search expert with this detailed tutorial on finding specific messages and conversations quickly. Learn advanced search techniques using keywords, filters by date, sender, and content type. The video covers searching within specific channels, chats, or across your entire Teams environment. You'll discover how to use search operators, save searches for frequently used queries, and organize search results effectively. Perfect for users who need to locate important information from extensive chat histories.",
    duration: "3:20",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop",
    videoUrl: "1473MDnc2K1080HbdL4ks6w-WbjiUx-4U"
  },
  {
    id: "8", 
    title: "Search and filter people and files",
    description: "Maximize your productivity by mastering Teams' people and file search capabilities. This comprehensive guide shows you how to locate team members, external contacts, and shared documents efficiently. Learn to use the global search to find colleagues across your organization, access their contact information, and initiate conversations or meetings. The tutorial also covers advanced file search techniques, including searching by file type, modification date, and content within documents, making it easier to locate specific resources in large organizations.",
    duration: "4:20",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "14rIg8kbwj2WMSavUwW8ObPMe3S30etIy"
  },
  {
    id: "9",
    title: "Search and find Files", 
    description: "Navigate the world of shared documents and files within Microsoft Teams with confidence. This tutorial provides an in-depth look at finding, accessing, and organizing files shared across teams and channels. You'll learn how to search through the Files tab, use advanced filters to narrow down results, and understand file permissions and sharing settings. The video covers working with different file types, version history, and collaborative editing features, ensuring you can efficiently manage and locate all your team's shared resources.",
    duration: "4:50",
    thumbnail: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=225&fit=crop",
    videoUrl: "1yCdZ4wMa4vIlur7RDMiyJfJzBiMVwCBe"
  },
  {
    id: "10",
    title: "Setting up calls and Chat",
    description: "Establish effective communication foundations by learning the fundamentals of initiating calls and chat conversations in Microsoft Teams. This tutorial covers the basics of starting one-on-one and group chats, understanding chat vs. channel conversations, and transitioning between text and voice/video communications. You'll discover chat formatting options, emoji and reaction features, and how to organize conversations for maximum productivity. The video also includes setup tips for optimal call quality and managing notification preferences.",
    duration: "3:35",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop", 
    videoUrl: "1K-cqc2AgDm9RitFF1VFsWx81pmTPw1S9"
  },
  {
    id: "11",
    title: "Set up a delegate to take your calls",
    description: "Learn how to configure call delegation in Microsoft Teams to ensure important calls are never missed. This tutorial walks you through the process of designating trusted colleagues as call delegates who can answer calls on your behalf. You'll discover how to set up delegation permissions, configure call routing rules, and manage delegate notifications. The video covers scenarios where delegation is most useful, such as executive assistants handling calls for managers, and how both delegates and delegators can effectively manage the shared calling responsibilities.",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
    videoUrl: "1_D_SjYcZNIQTLSL2A5n04QHq0mrv57c-"
  },
  {
    id: "12",
    title: "Show your screen during a meeting",
    description: "Master the art of effective screen sharing in Microsoft Teams meetings with this comprehensive presentation tutorial. Learn how to share your entire desktop, specific applications, or individual browser tabs while maintaining privacy and security. The video covers advanced sharing options like sharing system audio, controlling what participants can see, and managing multiple shared screens. You'll also discover best practices for engaging presentations, including using annotation tools, managing participant interaction with shared content, and troubleshooting common screen sharing issues.",
    duration: "1:45", 
    thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=225&fit=crop",
    videoUrl: "1_a2IVsS_Wp5n8JD9L_Vehx0ZzqyndoAC"
  },
  {
    id: "13",
    title: "Upload and share files",
    description: "Transform your team collaboration by mastering file upload, organization, and sharing within Microsoft Teams. This detailed tutorial demonstrates how to upload documents to channels and chats, organize files in folders, and set appropriate sharing permissions. You'll learn about file version control, collaborative editing in real-time, and integrating with SharePoint and OneDrive. The video also covers sharing files with external users, managing file access permissions, and using Teams as a central hub for all your team's document collaboration needs.",
    duration: "4:50",
    thumbnail: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=225&fit=crop",
    videoUrl: "1pDasiVKlpCEQuu5a8npmEHlAuEH91h0D"
  },
  {
    id: "14", 
    title: "Work with external guests",
    description: "Expand your collaboration beyond organizational boundaries by learning how to invite and work with external guests in Microsoft Teams. This comprehensive guide covers the entire guest user lifecycle, from sending invitations to managing guest permissions and access levels. You'll discover how to add external partners, clients, or vendors to your teams, configure appropriate security settings, and ensure smooth collaboration while maintaining organizational data protection. The tutorial includes best practices for guest user management and troubleshooting common external user access issues.",
    duration: "3:25",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "1PrTiCg12wC68g4rRcSQ-VqFLzd2VW8ai"
  },
  {
    id: "15",
    title: "Hide chats and delete messages",
    description: "Take control of your Teams conversation privacy and organization with this essential tutorial on chat management and message control. Learn how to hide chat conversations to declutter your interface while maintaining access to important information. The video demonstrates various message deletion options, including removing messages you've sent, managing conversation history, and understanding the difference between hiding and permanently deleting content. You'll also discover privacy features, conversation archiving, and strategies for maintaining a clean, organized chat environment while preserving important communications.",
    duration: "4:05",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
    videoUrl: "14KCZ7bZ7TBZZn-HGAn1zzk9Z3l5wfGwc"
  },
  {
    id: "16",
    title: "Live Event", 
    description: "Unlock the power of large-scale communication with Microsoft Teams Live Events. This comprehensive tutorial guides you through creating, managing, and broadcasting live events to large audiences within and outside your organization. Learn how to set up professional live streams, manage presenters and producers, configure audience interaction settings, and monitor event analytics. The video covers everything from initial event planning and technical setup to post-event recording distribution and audience engagement strategies, making it perfect for corporate communications, training sessions, and organization-wide announcements.",
    duration: "4:35",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=225&fit=crop",
    videoUrl: "1mV-WWqLDqYOf7_Ag1x0usvLz0iw5YfJi"
  },
  {
    id: "17",
    title: "How to Record a short video Clip in Microsoft Teams Chat",
    description: "Learn how to create and share quick video clips directly within Microsoft Teams chat conversations. This tutorial shows you how to record short video messages, add them to your chat threads, and use this feature for more engaging and personal communication with your team members.",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=225&fit=crop",
    videoUrl: "1QJBEBm2FHfYCGFQ984_cZrKYr_pZFi5B"
  },
  {
    id: "18", 
    title: "How to join a Microsoft Teams meeting with an avatar",
    description: "Discover how to use Microsoft Teams avatar feature to join meetings with a personalized digital representation. Learn how to create, customize, and use avatars for a more engaging meeting experience while maintaining privacy and professionalism.",
    duration: "4:20",
    thumbnail: "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=400&h=225&fit=crop",
    videoUrl: "1ubKviQn-KT8L8yZ8gmMvSUA_YFbqAYN-"
  },
  {
    id: "19",
    title: "How to use one-click instant polls in Microsoft Teams",
    description: "Master the art of creating quick polls and surveys within Microsoft Teams meetings and chats. Learn how to set up instant polls, gather real-time feedback from participants, and analyze poll results to make data-driven decisions during your team collaborations.",
    duration: "3:30",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop", 
    videoUrl: "1fum9RdLzfLv1jPqEBNUw-nMCmrakB77G"
  },
  {
    id: "20",
    title: "How to Use Loop Components in Microsoft Teams Chat",
    description: "Explore Microsoft Loop components integration within Teams chat for enhanced collaboration. Learn how to create, share, and collaborate on Loop components like tables, lists, and notes directly in your chat conversations for seamless teamwork.",
    duration: "4:10",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "1yR-QQ1GZO2HQID1J9nLAGBsBZonCD98M"
  },
  {
    id: "21",
    title: "How to Share System Audio in Microsoft Teams", 
    description: "Learn how to share your computer's system audio during Microsoft Teams meetings and screen sharing sessions. This tutorial covers audio sharing settings, troubleshooting common audio issues, and ensuring clear sound transmission for presentations and media playback.",
    duration: "3:55",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=225&fit=crop",
    videoUrl: "1foNEb-HCDPjbBDiPy02fhF5W2P_4FLAY"
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                MS Teams Meeting & VC Guidance (IMDT)
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Step-by-step tutorials for Teams, Outlook, SharePoint, and more.
              </p>
            </div>
            
            <SearchBox onSearch={handleSearch} onVideoSelect={handleVideoSelect} videos={mockVideos} />
            
            {/* All Videos Section */}
            <div className="mt-24 max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Video Library
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x225/1f2937/ffffff?text=${encodeURIComponent(video.title.slice(0, 20))}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
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
              <SearchBox onSearch={handleSearch} onVideoSelect={handleVideoSelect} videos={mockVideos} />
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
