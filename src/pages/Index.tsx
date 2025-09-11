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
  steps: string[] | { text: string; timestamp: number }[];
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
    steps: [
      { text: "Open Microsoft Teams application or web version", timestamp: 5 },
      { text: "Click on 'Teams' in the left sidebar", timestamp: 15 },
      { text: "Select 'Create team' or 'Join or create a team'", timestamp: 25 },
      { text: "Choose 'Create a team' option", timestamp: 35 },
      { text: "Select 'From a template' to view available templates", timestamp: 50 },
      { text: "Browse and select the appropriate template for your needs (Project, Department, etc.)", timestamp: 70 },
      { text: "Enter team name and description", timestamp: 95 },
      { text: "Configure privacy settings (Private, Public, or Org-wide)", timestamp: 110 },
      { text: "Add team members by email or name", timestamp: 125 },
      { text: "Set up initial channels based on template structure", timestamp: 145 },
      { text: "Customize channel names and settings as needed", timestamp: 165 },
      { text: "Review team settings and permissions", timestamp: 180 },
      { text: "Click 'Create' to finalize your team setup", timestamp: 195 }
    ],
    duration: "3:24",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
    videoUrl: "1occCV8QMNMaWSx9rohoE4iHmeTruVoDi"
  },
  {
    id: "2",
    title: "How to Join a meeting", 
    description: "Learn the various methods to join Microsoft Teams meetings seamlessly from any device or platform. This tutorial covers joining meetings through calendar invitations, direct links, phone dial-in options, and the Teams app. You'll discover troubleshooting tips for common connection issues, audio and video setup, and how to join as a guest without a Teams account. Perfect for users who need to participate in meetings across different devices and scenarios.",
    steps: [
      { text: "Check your calendar invitation for the meeting link", timestamp: 8 },
      { text: "Click 'Join Microsoft Teams Meeting' link in the invitation", timestamp: 20 },
      { text: "Choose to join via Teams app or web browser", timestamp: 35 },
      { text: "Enter your name if joining as a guest", timestamp: 50 },
      { text: "Test your camera and microphone before joining", timestamp: 65 },
      { text: "Select camera and microphone preferences", timestamp: 80 },
      { text: "Click 'Join now' to enter the meeting", timestamp: 95 },
      { text: "Alternative: Dial the conference number for phone access", timestamp: 120 },
      { text: "Enter the conference ID when prompted", timestamp: 140 },
      { text: "Troubleshoot connection issues if needed", timestamp: 160 },
      { text: "Adjust audio/video settings once in the meeting", timestamp: 190 },
      { text: "Use meeting controls for mute, video, chat, and screen sharing", timestamp: 220 }
    ],
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=225&fit=crop",
    videoUrl: "1_P1I_E_Gy3JqmBCPnpr0GTVeTDYJgqWr"
  },
  {
    id: "3",
    title: "Join a Teams meeting",
    description: "A detailed guide focused specifically on accessing and participating effectively in Microsoft Teams meetings. This video demonstrates the step-by-step process of joining meetings from desktop, mobile, and web browsers. You'll learn about meeting lobby features, participant controls, chat functionality during meetings, and best practices for professional meeting etiquette. The tutorial also covers handling meeting permissions and what to do when facing access restrictions.",
    steps: [
      { text: "Open Teams app on desktop, mobile, or web browser", timestamp: 10 },
      { text: "Navigate to calendar and find your meeting", timestamp: 25 },
      { text: "Click 'Join' button from the calendar event", timestamp: 40 },
      { text: "Wait in the meeting lobby if enabled", timestamp: 55 },
      { text: "Organize and participant will admit you to the meeting", timestamp: 70 },
      { text: "Once admitted, familiarize yourself with meeting controls", timestamp: 90 },
      { text: "Use the chat feature to communicate during the meeting", timestamp: 120 },
      { text: "Practice proper meeting etiquette (mute when not speaking)", timestamp: 150 },
      { text: "Raise hand feature to request to speak", timestamp: 180 },
      { text: "Understand participant permissions and restrictions", timestamp: 200 },
      { text: "Handle access restriction issues by contacting organizer", timestamp: 220 },
      { text: "Use reactions and engagement features appropriately", timestamp: 240 },
      { text: "Leave meeting politely when finished", timestamp: 250 }
    ],
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop", 
    videoUrl: "1mz2UfBg_1Km01lucuN21fvMirwDHHs-e"
  },
  {
    id: "4",
    title: "Make Calls",
    description: "Master the art of initiating and managing both voice and video calls within Microsoft Teams. This comprehensive tutorial covers making one-on-one calls, group calls, and understanding the difference between calls and meetings. You'll learn how to start calls from chat, contacts, or the calling interface, manage call controls like mute, camera, and screen sharing during calls, and handle call forwarding and delegation. The video also includes tips for call quality optimization and managing call history.",
    steps: [
      { text: "Open Microsoft Teams application", timestamp: 5 },
      { text: "Navigate to 'Calls' in the left sidebar", timestamp: 15 },
      { text: "Click the 'Make a call' button or use the dial pad", timestamp: 30 },
      { text: "Search for contact by name or enter phone number", timestamp: 45 },
      { text: "Choose between audio or video call option", timestamp: 65 },
      { text: "Click the call button to initiate the call", timestamp: 80 },
      { text: "For group calls: Add multiple participants before calling", timestamp: 110 },
      { text: "Use call controls during the call (mute, video, screen share)", timestamp: 140 },
      { text: "Understand difference between calls and scheduled meetings", timestamp: 180 },
      { text: "Set up call forwarding in Teams settings if needed", timestamp: 220 },
      { text: "Configure call delegation for assistant access", timestamp: 260 },
      { text: "Optimize call quality through audio/video settings", timestamp: 290 },
      { text: "Access call history in the Calls section", timestamp: 310 },
      { text: "End call properly and add notes if needed", timestamp: 325 }
    ],
    duration: "5:30",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop",
    videoUrl: "1KFbHCEPdgZMoGJB4gFaGPYH1-n4fXcKt"
  },
  {
    id: "5", 
    title: "Manage meetings",
    description: "Take control of your Microsoft Teams meetings with this comprehensive management guide. Learn how to schedule meetings effectively, set up recurring meetings, and configure meeting options like lobby settings, attendee permissions, and recording capabilities. The tutorial covers managing meeting participants, controlling who can present, handling breakout rooms, and moderating discussions. You'll also discover advanced features like meeting policies, attendance reports, and post-meeting follow-up procedures.",
    steps: [
      "Open Teams and navigate to Calendar",
      "Click 'New meeting' to schedule a meeting",
      "Enter meeting title, attendees, and date/time",
      "Configure meeting options and lobby settings",
      "Set attendee permissions (who can present, use chat, etc.)",
      "Enable meeting recording if required",
      "Schedule recurring meetings if needed",
      "During meeting: Manage participants list",
      "Control presenter permissions during the meeting",
      "Set up and manage breakout rooms",
      "Moderate chat and discussions",
      "Monitor meeting attendance and engagement",
      "Generate post-meeting attendance reports",
      "Follow up with meeting recording and notes"
    ],
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=225&fit=crop",
    videoUrl: "1drBiEimMimITaX0Y-3jlm1l0NN_BEc8v"
  },
  {
    id: "6",
    title: "Post a message to multiple channels",
    description: "Discover efficient communication strategies by learning how to broadcast messages across multiple Teams channels simultaneously. This tutorial demonstrates the cross-posting feature, which allows you to share important announcements, updates, or information with multiple teams at once. You'll learn when to use this feature appropriately, how to maintain message consistency, and manage responses across different channels. The video also covers best practices for organization-wide communications and avoiding message spam.",
    steps: [
      "Open Microsoft Teams application",
      "Navigate to the channel where you want to start your message",
      "Click 'New conversation' or reply to existing thread",
      "Type your message content",
      "Click the 'Format' button to access advanced options",
      "Select 'Cross-post' or 'Share to other channels' option",
      "Choose additional channels to share the message",
      "Review message consistency across selected channels",
      "Add channel-specific context if needed",
      "Preview how message will appear in each channel",
      "Click 'Send' to post to all selected channels",
      "Monitor responses across different channels",
      "Manage follow-up discussions appropriately"
    ],
    duration: "2:30", 
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
    videoUrl: "1oKKrfF-FAmqypOzNQVaxPZ86RQPcrBZL"
  },
  {
    id: "7",
    title: "Search and filter messages",
    description: "Become a Microsoft Teams search expert with this detailed tutorial on finding specific messages and conversations quickly. Learn advanced search techniques using keywords, filters by date, sender, and content type. The video covers searching within specific channels, chats, or across your entire Teams environment. You'll discover how to use search operators, save searches for frequently used queries, and organize search results effectively. Perfect for users who need to locate important information from extensive chat histories.",
    steps: [
      "Click the search box at the top of Teams",
      "Enter keywords or phrases you're looking for",
      "Use the search filters to narrow results",
      "Filter by date range using the date picker",
      "Filter by sender/person who sent the message",
      "Filter by content type (messages, files, people)",
      "Use search operators like 'from:', 'in:', 'has:' for advanced searches",
      "Search within specific channels or chats",
      "Review search results and click to navigate to messages",
      "Save frequently used searches for quick access",
      "Use 'Recent searches' for quick access to previous queries",
      "Organize results by relevance or date",
      "Export or bookmark important search results"
    ],
    duration: "3:20",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop",
    videoUrl: "1473MDnc2K1080HbdL4ks6w-WbjiUx-4U"
  },
  {
    id: "8", 
    title: "Search and filter people and files",
    description: "Maximize your productivity by mastering Teams' people and file search capabilities. This comprehensive guide shows you how to locate team members, external contacts, and shared documents efficiently. Learn to use the global search to find colleagues across your organization, access their contact information, and initiate conversations or meetings. The tutorial also covers advanced file search techniques, including searching by file type, modification date, and content within documents, making it easier to locate specific resources in large organizations.",
    steps: [
      "Use the main search bar at the top of Teams",
      "Type the person's name or email to find colleagues",
      "Access contact information from search results",
      "Use 'People' filter to narrow search to contacts only",
      "Search across your organization's global directory",
      "Initiate chat or call directly from search results",
      "Switch to 'Files' filter to search for documents",
      "Use file type filters (Word, Excel, PDF, etc.)",
      "Filter files by modification date or creation date",
      "Search within file contents for specific keywords",
      "Access file location and sharing permissions",
      "Open files directly from search results",
      "Save frequently searched people and files for quick access"
    ],
    duration: "4:20",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "14rIg8kbwj2WMSavUwW8ObPMe3S30etIy"
  },
  {
    id: "9",
    title: "Search and find Files", 
    description: "Navigate the world of shared documents and files within Microsoft Teams with confidence. This tutorial provides an in-depth look at finding, accessing, and organizing files shared across teams and channels. You'll learn how to search through the Files tab, use advanced filters to narrow down results, and understand file permissions and sharing settings. The video covers working with different file types, version history, and collaborative editing features, ensuring you can efficiently manage and locate all your team's shared resources.",
    steps: [
      "Navigate to 'Files' tab in Teams sidebar",
      "Browse files by team or channel",
      "Use the search box to find specific files",
      "Apply filters by file type (Word, Excel, PowerPoint, PDF)",
      "Filter by date modified or date created",
      "Sort results by name, date, or size",
      "Check file permissions and sharing settings",
      "Access file version history when needed",
      "Open files for collaborative editing",
      "Download files for offline access",
      "Organize files in folders within Teams",
      "Set up file sync with OneDrive/SharePoint",
      "Share files with specific team members or external users"
    ],
    duration: "4:50",
    thumbnail: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=225&fit=crop",
    videoUrl: "1yCdZ4wMa4vIlur7RDMiyJfJzBiMVwCBe"
  },
  {
    id: "10",
    title: "Setting up calls and Chat",
    description: "Establish effective communication foundations by learning the fundamentals of initiating calls and chat conversations in Microsoft Teams. This tutorial covers the basics of starting one-on-one and group chats, understanding chat vs. channel conversations, and transitioning between text and voice/video communications. You'll discover chat formatting options, emoji and reaction features, and how to organize conversations for maximum productivity. The video also includes setup tips for optimal call quality and managing notification preferences.",
    steps: [
      "Open Microsoft Teams application",
      "Navigate to 'Chat' in the left sidebar",
      "Click 'New chat' to start a conversation",
      "Add participants by typing names or emails",
      "Understand difference between chats and channel conversations",
      "Use formatting options (bold, italic, bullet points)",
      "Add emojis and reactions to messages",
      "Transition from chat to voice call by clicking call button",
      "Transition from chat to video call by clicking video button",
      "Set up call quality preferences in settings",
      "Configure notification preferences for chats",
      "Organize conversations with favorites and pins",
      "Use chat search to find previous conversations"
    ],
    duration: "3:35",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop", 
    videoUrl: "1K-cqc2AgDm9RitFF1VFsWx81pmTPw1S9"
  },
  {
    id: "11",
    title: "Set up a delegate to take your calls",
    description: "Learn how to configure call delegation in Microsoft Teams to ensure important calls are never missed. This tutorial walks you through the process of designating trusted colleagues as call delegates who can answer calls on your behalf. You'll discover how to set up delegation permissions, configure call routing rules, and manage delegate notifications. The video covers scenarios where delegation is most useful, such as executive assistants handling calls for managers, and how both delegates and delegators can effectively manage the shared calling responsibilities.",
    steps: [
      "Open Teams and go to Settings (gear icon)",
      "Navigate to 'Calls' section in settings",
      "Find 'Call delegation' or 'Delegate' options",
      "Click 'Add delegate' button",
      "Search for and select trusted colleague as delegate",
      "Configure delegation permissions (answer, make calls on behalf)",
      "Set up call routing rules and priority",
      "Configure delegate notification preferences",
      "Test delegation setup with a practice call",
      "Inform delegate about their new responsibilities",
      "Monitor delegation activity and call logs",
      "Adjust delegation settings as needed",
      "Remove or modify delegates when necessary"
    ],
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
    videoUrl: "1_D_SjYcZNIQTLSL2A5n04QHq0mrv57c-"
  },
  {
    id: "12",
    title: "Show your screen during a meeting",
    description: "Master the art of effective screen sharing in Microsoft Teams meetings with this comprehensive presentation tutorial. Learn how to share your entire desktop, specific applications, or individual browser tabs while maintaining privacy and security. The video covers advanced sharing options like sharing system audio, controlling what participants can see, and managing multiple shared screens. You'll also discover best practices for engaging presentations, including using annotation tools, managing participant interaction with shared content, and troubleshooting common screen sharing issues.",
    steps: [
      "Join a Teams meeting first",
      "Click 'Share content' button in meeting controls",
      "Choose sharing option: Desktop, Window, or Browser tab",
      "Select specific screen if you have multiple monitors",
      "Enable 'Include computer sound' if sharing audio/video",
      "Click 'Share' to begin screen sharing",
      "Use annotation tools during presentation if needed",
      "Manage what participants can see and control",
      "Allow or restrict participant interaction with shared content",
      "Switch between different shared screens if needed",
      "Troubleshoot common issues (lag, quality, audio)",
      "Stop sharing when presentation is complete",
      "Review sharing permissions and security settings"
    ],
    duration: "1:45", 
    thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=225&fit=crop",
    videoUrl: "1_a2IVsS_Wp5n8JD9L_Vehx0ZzqyndoAC"
  },
  {
    id: "13",
    title: "Upload and share files",
    description: "Transform your team collaboration by mastering file upload, organization, and sharing within Microsoft Teams. This detailed tutorial demonstrates how to upload documents to channels and chats, organize files in folders, and set appropriate sharing permissions. You'll learn about file version control, collaborative editing in real-time, and integrating with SharePoint and OneDrive. The video also covers sharing files with external users, managing file access permissions, and using Teams as a central hub for all your team's document collaboration needs.",
    steps: [
      "Navigate to the channel or chat where you want to upload files",
      "Click the paperclip icon or 'Attach' button",
      "Choose 'Upload from this device' or browse cloud storage",
      "Select files from your computer to upload",
      "Organize files in folders within the channel",
      "Set appropriate sharing permissions for the files",
      "Enable collaborative editing for Office documents",
      "Integrate with SharePoint and OneDrive for sync",
      "Share files with external users via email links",
      "Manage file access permissions and restrictions",
      "Use version control to track document changes",
      "Set up real-time collaborative editing sessions",
      "Monitor file activity and collaboration history"
    ],
    duration: "4:50",
    thumbnail: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=225&fit=crop",
    videoUrl: "1pDasiVKlpCEQuu5a8npmEHlAuEH91h0D"
  },
  {
    id: "14", 
    title: "Work with external guests",
    description: "Expand your collaboration beyond organizational boundaries by learning how to invite and work with external guests in Microsoft Teams. This comprehensive guide covers the entire guest user lifecycle, from sending invitations to managing guest permissions and access levels. You'll discover how to add external partners, clients, or vendors to your teams, configure appropriate security settings, and ensure smooth collaboration while maintaining organizational data protection. The tutorial includes best practices for guest user management and troubleshooting common external user access issues.",
    steps: [
      "Navigate to the team where you want to add external guests",
      "Click 'Add member' or team settings button",
      "Select 'Add guests' or 'Invite external users'",
      "Enter external user's email address",
      "Configure guest permissions and access levels",
      "Set appropriate security and privacy settings",
      "Send invitation to external guest via email",
      "Monitor guest invitation status and responses",
      "Configure guest access to specific channels and files",
      "Set time-limited access if required",
      "Provide orientation and guidelines to guests",
      "Monitor guest activity and collaboration",
      "Remove or modify guest access when project ends"
    ],
    duration: "3:25",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "1PrTiCg12wC68g4rRcSQ-VqFLzd2VW8ai"
  },
  {
    id: "15",
    title: "Hide chats and delete messages",
    description: "Take control of your Teams conversation privacy and organization with this essential tutorial on chat management and message control. Learn how to hide chat conversations to declutter your interface while maintaining access to important information. The video demonstrates various message deletion options, including removing messages you've sent, managing conversation history, and understanding the difference between hiding and permanently deleting content. You'll also discover privacy features, conversation archiving, and strategies for maintaining a clean, organized chat environment while preserving important communications.",
    steps: [
      "Navigate to the chat list in Teams sidebar",
      "Right-click on the chat you want to hide",
      "Select 'Hide' from the context menu",
      "Understand that hidden chats remain accessible via search",
      "To delete messages: Open the specific chat conversation",
      "Hover over the message you want to delete",
      "Click the three dots menu next to the message",
      "Select 'Delete' to remove the message",
      "Understand permanent vs temporary deletion options",
      "Configure conversation archiving settings",
      "Use privacy features to control message visibility",
      "Organize remaining chats using favorites and pins",
      "Maintain clean chat environment regularly"
    ],
    duration: "4:05",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
    videoUrl: "14KCZ7bZ7TBZZn-HGAn1zzk9Z3l5wfGwc"
  },
  {
    id: "16",
    title: "Live Event", 
    description: "Unlock the power of large-scale communication with Microsoft Teams Live Events. This comprehensive tutorial guides you through creating, managing, and broadcasting live events to large audiences within and outside your organization. Learn how to set up professional live streams, manage presenters and producers, configure audience interaction settings, and monitor event analytics. The video covers everything from initial event planning and technical setup to post-event recording distribution and audience engagement strategies, making it perfect for corporate communications, training sessions, and organization-wide announcements.",
    steps: [
      "Open Teams and navigate to Calendar",
      "Click 'New meeting' and select 'Live Event'",
      "Enter event title, description, and date/time",
      "Configure audience settings (public, organization, specific people)",
      "Set up presenters and producers for the event",
      "Configure event permissions and moderation settings",
      "Set up professional live streaming equipment if needed",
      "Test audio, video, and streaming setup beforehand",
      "Configure audience interaction settings (Q&A, chat)",
      "Start the live event and manage during broadcast",
      "Monitor event analytics and audience engagement",
      "Handle technical issues during the live stream",
      "End event and distribute post-event recording",
      "Analyze event metrics and feedback for future improvements"
    ],
    duration: "4:35",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=225&fit=crop",
    videoUrl: "1mV-WWqLDqYOf7_Ag1x0usvLz0iw5YfJi"
  },
  {
    id: "17",
    title: "How to Record a short video Clip in Microsoft Teams Chat",
    description: "Learn how to create and share quick video clips directly within Microsoft Teams chat conversations. This tutorial shows you how to record short video messages, add them to your chat threads, and use this feature for more engaging and personal communication with your team members.",
    steps: [
      "Open a Teams chat conversation",
      "Look for the video recording button in the message compose area",
      "Click the camera or video clip icon",
      "Allow Teams access to your camera and microphone",
      "Position yourself in frame for the recording",
      "Click 'Record' to start recording your video message",
      "Keep the video clip short and focused (under 2 minutes recommended)",
      "Click 'Stop' when you finish recording",
      "Preview your video clip before sending",
      "Add text message or caption if needed",
      "Click 'Send' to share the video clip in the chat",
      "Monitor responses and engagement from team members"
    ],
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=225&fit=crop",
    videoUrl: "1QJBEBm2FHfYCGFQ984_cZrKYr_pZFi5B"
  },
  {
    id: "18", 
    title: "How to join a Microsoft Teams meeting with an avatar",
    description: "Discover how to use Microsoft Teams avatar feature to join meetings with a personalized digital representation. Learn how to create, customize, and use avatars for a more engaging meeting experience while maintaining privacy and professionalism.",
    steps: [
      "Open Teams and go to Settings (gear icon)",
      "Navigate to 'Privacy' or 'Account' settings",
      "Find 'Avatar' or 'Digital representation' options",
      "Click 'Create avatar' or 'Set up avatar'",
      "Customize your avatar appearance (hair, skin, clothing, etc.)",
      "Save your avatar configuration",
      "Join a Teams meeting as usual",
      "In the meeting pre-join screen, look for avatar option",
      "Select 'Use avatar' instead of camera",
      "Choose your created avatar from the list",
      "Join the meeting with your avatar representation",
      "Use avatar expressions and gestures during the meeting"
    ],
    duration: "4:20",
    thumbnail: "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=400&h=225&fit=crop",
    videoUrl: "1ubKviQn-KT8L8yZ8gmMvSUA_YFbqAYN-"
  },
  {
    id: "19",
    title: "How to use one-click instant polls in Microsoft Teams",
    description: "Master the art of creating quick polls and surveys within Microsoft Teams meetings and chats. Learn how to set up instant polls, gather real-time feedback from participants, and analyze poll results to make data-driven decisions during your team collaborations.",
    steps: [
      "Join or start a Teams meeting",
      "Look for the 'Apps' or 'More options' button in meeting controls",
      "Search for and select 'Polls' or 'Forms' app",
      "Click 'Create new poll' or 'Quick poll'",
      "Enter your poll question",
      "Add multiple choice answers or options",
      "Configure poll settings (anonymous, multiple answers, etc.)",
      "Click 'Launch poll' to share with participants",
      "Monitor real-time responses as they come in",
      "Share poll results with participants when complete",
      "Export poll data for further analysis",
      "Use results to make informed decisions or guide discussion"
    ],
    duration: "3:30",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop", 
    videoUrl: "1fum9RdLzfLv1jPqEBNUw-nMCmrakB77G"
  },
  {
    id: "20",
    title: "How to Use Loop Components in Microsoft Teams Chat",
    description: "Explore Microsoft Loop components integration within Teams chat for enhanced collaboration. Learn how to create, share, and collaborate on Loop components like tables, lists, and notes directly in your chat conversations for seamless teamwork.",
    steps: [
      "Open a Teams chat or channel conversation",
      "Click the '+' button or 'Apps' icon in the message area",
      "Search for and select 'Loop components' or 'Microsoft Loop'",
      "Choose the type of Loop component (table, list, note, task list)",
      "Create your component content (add rows, items, or text)",
      "Customize the component with titles and formatting",
      "Share the Loop component in the chat",
      "Collaborate in real-time as team members edit the component",
      "Track changes and see who made what edits",
      "Access Loop components from multiple conversations",
      "Sync changes across all shared instances",
      "Use Loop workspace for managing all your components"
    ],
    duration: "4:10",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    videoUrl: "1yR-QQ1GZO2HQID1J9nLAGBsBZonCD98M"
  },
  {
    id: "21",
    title: "How to Share System Audio in Microsoft Teams", 
    description: "Learn how to share your computer's system audio during Microsoft Teams meetings and screen sharing sessions. This tutorial covers audio sharing settings, troubleshooting common audio issues, and ensuring clear sound transmission for presentations and media playbook.",
    steps: [
      "Join a Teams meeting first",
      "Start screen sharing by clicking 'Share content'",
      "In the sharing options, look for 'Include computer sound' checkbox",
      "Enable 'Include computer sound' before starting to share",
      "Alternatively, enable it after sharing by clicking 'Share computer sound'",
      "Test audio sharing by playing a sound or video",
      "Adjust system volume levels for optimal audio quality",
      "Monitor participant feedback about audio clarity",
      "Troubleshoot if audio is not coming through",
      "Check audio drivers and system settings if needed",
      "Disable system audio sharing when not needed",
      "End screen sharing when presentation is complete"
    ],
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
