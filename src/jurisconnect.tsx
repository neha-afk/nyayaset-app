import React, { useState, useEffect, useRef, useReducer, useCallback, useMemo } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Bell, Plus, Home, Compass, Send, User, Play, Trophy, Zap, Briefcase, Scale, TrendingUp, Users, Award, Video, Eye, Clock, X, Shield, CheckCircle, AlertTriangle, Hash, Flame, Target, Sparkles, MapPin, Calendar, FileText, LayoutDashboard, Loader2, Link, Image as ImageIcon, Video as VideoIcon, MoreHorizontal, Star, Cpu, BookOpen, Gavel, MessageSquare } from 'lucide-react';

// Types
interface Post {
  id: string;
  type: 'case-flex' | 'legal-reel' | 'doc-share';
  author: string;
  avatar: string;
  specialization: string;
  badge: string;
  timeAgo: string;
  title: string;
  content: string;
  stats?: { before: string; after: string };
  image: string;
  videoUrl?: string;
  videoIcon?: boolean;
  duration?: string;
  likes: number;
  comments: number;
  shares: number;
  verified: boolean;
  contentScore: number;
  isLive?: boolean;
  mediaType: 'image' | 'video';
}

interface Story {
  id: string;
  name: string;
  avatar: string;
  isUser: boolean;
  gradient: string;
  content: StoryContent[];
  hasVideo: boolean;
  views?: string;
  badge?: string;
}

interface StoryContent {
  type: 'video' | 'image';
  duration?: number;
  thumbnail: string;
  title: string;
  mediaUrl: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  followers: string;
  badge: string;
  verified: boolean;
}

interface AppState {
  activeTab: string;
  activeNav: string;
  likedPosts: Record<string, boolean>;
  bookmarkedPosts: Record<string, boolean>;
  showCreateMenu: boolean;
  followingUsers: Record<string, boolean>;
}

const initialState: AppState = {
  activeTab: 'feed',
  activeNav: 'feed',
  likedPosts: {},
  bookmarkedPosts: {},
  showCreateMenu: false,
  followingUsers: {},
};

type AppAction = 
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_ACTIVE_NAV'; payload: string }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'TOGGLE_BOOKMARK'; payload: string }
  | { type: 'TOGGLE_CREATE_MENU' }
  | { type: 'TOGGLE_FOLLOW'; payload: string };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_ACTIVE_NAV':
      return { ...state, activeNav: action.payload, showCreateMenu: false };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        likedPosts: {
          ...state.likedPosts,
          [action.payload]: !state.likedPosts[action.payload]
        }
      };
    case 'TOGGLE_BOOKMARK':
      return {
        ...state,
        bookmarkedPosts: {
          ...state.bookmarkedPosts,
          [action.payload]: !state.bookmarkedPosts[action.payload]
        }
      };
    case 'TOGGLE_CREATE_MENU':
      return { ...state, showCreateMenu: !state.showCreateMenu };
    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        followingUsers: {
          ...state.followingUsers,
          [action.payload]: !state.followingUsers[action.payload]
        }
      };
    default:
      return state;
  }
}

// Custom hooks for data
const usePosts = () => {
  return useMemo(() => {
    const posts: Post[] = [
      {
        id: '1',
        type: 'case-flex',
        author: 'Adv. Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        specialization: 'Senior Advocate, Supreme Court',
        badge: 'CASE VICTORY',
        timeAgo: '2h ago',
        title: 'Landmark Victory in Contract Dispute',
        content: 'Just secured a major win in the Delhi High Court! Successfully argued breach of contract case using the doctrine of frustration from Satyabrata Ghose v. Mugneeram Bangur (1954). The key was establishing impossibility of performance under Section 56. Proud moment for the team! 🏆',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
        mediaType: 'image',
        likes: 342,
        comments: 67,
        shares: 23,
        verified: true,
        contentScore: 95
      },
      {
        id: '2',
        type: 'legal-reel',
        author: 'Adv. Rajesh Kumar',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
        specialization: 'Criminal Defense Specialist',
        badge: 'SEEKING ADVICE',
        timeAgo: '5h ago',
        title: 'Anticipatory Bail Strategy Discussion',
        content: 'Working on an anticipatory bail application under Section 438 CrPC for a white-collar crime case. Client has no prior record and strong community ties. What recent precedents would you recommend citing? Looking for insights from experienced criminal lawyers. #CriminalLaw #BailMatters',
        image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=500&fit=crop',
        mediaType: 'image',
        likes: 128,
        comments: 45,
        shares: 12,
        verified: true,
        contentScore: 88
      },
      {
        id: '3',
        type: 'doc-share',
        author: 'Dr. Anjali Mehta',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        specialization: 'Constitutional Law Expert',
        badge: 'LEGAL INSIGHT',
        timeAgo: '8h ago',
        title: 'Analysis: Recent Privacy Law Amendments',
        content: 'Deep dive into the Digital Personal Data Protection Act, 2023. Key takeaways: (1) Stricter consent requirements (2) Enhanced user rights (3) Penalties up to ₹250 crores. This will reshape how businesses handle data. Full analysis in comments. 📊',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
        mediaType: 'image',
        likes: 567,
        comments: 134,
        shares: 89,
        verified: true,
        contentScore: 97
      }
    ];

    return {
      byId: posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {} as Record<string, Post>),
      allIds: posts.map(post => post.id)
    };
  }, []);
};

const useUsers = () => {
  return useMemo(() => {
    const users: User[] = [
      { 
        id: '1', 
        name: 'Adv. Sarah Johnson', 
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 
        specialization: 'Corporate Law Expert', 
        followers: '15.2K', 
        badge: '💎', 
        verified: true 
      },
      { 
        id: '2', 
        name: 'Adv. Vikram Singh', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 
        specialization: 'IP & Tech Law', 
        followers: '12.8K', 
        badge: '⭐', 
        verified: true 
      },
      { 
        id: '3', 
        name: 'Adv. Meera Krishnan', 
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face', 
        specialization: 'Family Law Advocate', 
        followers: '9.5K', 
        badge: '🌟', 
        verified: true 
      }
    ];

    return {
      byId: users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {} as Record<string, User>),
      allIds: users.map(user => user.id)
    };
  }, []);
};

// Post Component with enhanced design
interface PostComponentProps {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onComment: (postId: string) => void;
}

const PostComponent: React.FC<PostComponentProps> = React.memo(({ 
  post, 
  isLiked, 
  isBookmarked, 
  onLike, 
  onBookmark,
  onComment
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = useCallback(() => {
    onLike(post.id);
  }, [post.id, onLike]);

  const handleBookmark = useCallback(() => {
    onBookmark(post.id);
  }, [post.id, onBookmark]);

  const handleComment = useCallback(() => {
    setShowComments(!showComments);
    onComment(post.id);
  }, [post.id, onComment, showComments]);

  const handleAddComment = useCallback(() => {
    if (commentText.trim()) {
      setCommentText('');
    }
  }, [commentText]);

  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 mb-8 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Post Header */}
      <div className="p-6 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src={post.avatar} 
                alt={post.author}
                className="relative w-14 h-14 rounded-full object-cover border-3 border-white shadow-lg"
              />
              {post.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-lg">{post.author}</h3>
                <span className="text-lg">{post.badge === 'CASE VICTORY' ? '🏆' : post.badge === 'SEEKING ADVICE' ? '💭' : '📚'}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{post.specialization}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.timeAgo}
                </span>
                <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full font-semibold shadow-sm">
                  {post.badge}
                </span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h4>
        <p className="text-gray-700 leading-relaxed text-base">{post.content}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['#ContractLaw', '#SupremeCourt', '#LegalVictory'].slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-3 py-1.5 rounded-full font-semibold hover:shadow-md transition-all cursor-pointer border border-blue-100">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Post Image with loading effect */}
      {post.image && (
        <div className="px-6 pb-5">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}
            <img 
              src={post.image} 
              alt="Post content"
              onLoad={() => setImageLoaded(true)}
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-gray-700 font-semibold">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-pink-500 border-2 border-white flex items-center justify-center shadow-sm">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center shadow-sm">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
              </div>
              {post.likes} likes
            </span>
            <span className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
              {post.comments} comments
            </span>
            <span className="text-gray-600 hover:text-green-600 cursor-pointer transition-colors">
              {post.shares} shares
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">2.4K views</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex justify-between gap-2">
          <button 
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              isLiked 
                ? 'text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg shadow-red-200' 
                : 'text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </button>
          
          <button 
            onClick={handleComment}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all transform hover:scale-105">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
          
          <button 
            onClick={handleBookmark}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              isBookmarked 
                ? 'text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-amber-200' 
                : 'text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-600'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 py-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="space-y-5 mb-5">
            {/* Sample comments */}
            {[
              { name: 'Adv. Rahul Verma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', comment: 'Brilliant analysis! This precedent will be very useful for my upcoming case.', time: '5 min ago' },
              { name: 'Adv. Sneha Patel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', comment: 'Congratulations on the victory! Would love to read the full judgment.', time: '12 min ago' }
            ].map((comment, idx) => (
              <div key={idx} className="flex gap-3 animate-fadeIn">
                <img 
                  src={comment.avatar} 
                  alt={comment.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="font-bold text-sm text-gray-900">{comment.name}</div>
                    <p className="text-gray-700 text-sm mt-1 leading-relaxed">{comment.comment}</p>
                  </div>
                  <div className="flex gap-5 mt-2 text-xs text-gray-500 ml-1">
                    <button className="hover:text-blue-600 font-semibold transition-colors">Like</button>
                    <button className="hover:text-blue-600 font-semibold transition-colors">Reply</button>
                    <span>{comment.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comment Input */}
          <div className="flex gap-3">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Your avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
            <div className="flex-1 flex gap-3">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 border-2 border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all"
              />
              <button 
                onClick={handleAddComment}
                className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Network Item Component
const NetworkItem: React.FC<{ user: User; isOnline?: boolean }> = ({ user, isOnline = false }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity"></div>
        <img 
          src={user.avatar} 
          alt={user.name}
          className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-bold text-sm text-gray-900 flex items-center gap-1">
          {user.name}
          {user.verified && <CheckCircle className="w-3 h-3 text-blue-500" />}
        </div>
        <div className="text-xs text-gray-600">{user.specialization}</div>
        <div className="text-xs text-gray-500 mt-0.5">{user.followers} followers</div>
      </div>
    </div>
  );
};

// Main JurisConnect Component
export default function JurisConnect() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const posts = usePosts();
  const users = useUsers();

  const handleLike = useCallback((postId: string) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: postId });
  }, []);

  const handleBookmark = useCallback((postId: string) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: postId });
  }, []);

  const handleComment = useCallback((postId: string) => {
    console.log('Comment on post:', postId);
  }, []);

  const trendingTopics = [
    { id: '1', tag: '#BailReform', posts: '1.2K', description: 'New SC guidelines on bail', gradient: 'from-orange-500 to-red-500' },
    { id: '2', tag: '#DataProtection', posts: '845', description: 'DPDP Act implementation', gradient: 'from-blue-500 to-purple-600' },
    { id: '3', tag: '#LabourLaw', posts: '623', description: 'New labor code updates', gradient: 'from-green-500 to-teal-600' }
  ];

  const practiceGroups = [
    { name: 'Criminal Law Forum', members: '1.2K', icon: '⚖️', color: 'from-red-500 to-pink-600' },
    { name: 'Corporate Law Network', members: '845', icon: '💼', color: 'from-blue-500 to-indigo-600' },
    { name: 'Family Law Association', members: '567', icon: '👨‍👩‍👧', color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-2xl sticky top-0 z-50 border-b-4 border-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-3 rounded-2xl shadow-xl">
                  <Scale className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  JurisConnect
                </h1>
                <p className="text-xs text-gray-500 font-semibold">Legal Network Platform</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-2">
              {[
                { name: 'Feed', icon: Home },
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Network', icon: Users },
                { name: 'Jobs', icon: Briefcase },
                { name: 'Learning', icon: BookOpen }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => dispatch({ type: 'SET_ACTIVE_NAV', payload: item.name.toLowerCase() })}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-2 ${
                    state.activeNav === item.name.toLowerCase()
                      ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-xl shadow-purple-200'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search cases, lawyers, insights..."
                className="w-96 pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white font-medium text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="relative w-11 h-11 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110 group">
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold shadow-lg animate-pulse">3</span>
              </button>
              
              <button className="relative w-11 h-11 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110 group">
                <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold shadow-lg">5</span>
              </button>
              
              <div className="h-8 w-px bg-gray-200"></div>
              
              <button className="flex items-center gap-3 p-2 pr-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                    alt="Profile"
                    className="relative w-10 h-10 rounded-full border-3 border-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm text-gray-900">John Doe, Esq.</div>
                  <div className="text-xs text-gray-500 font-semibold">Criminal Lawyer</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="col-span-3 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col items-center -mt-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                    alt="Profile"
                    className="relative w-20 h-20 rounded-full border-4 border-white shadow-xl"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
                </div>
                <h3 className="mt-3 font-black text-gray-900 text-lg">John Doe, Esq.</h3>
                <p className="text-sm text-gray-600 font-semibold">Criminal Defense Lawyer</p>
                <div className="flex gap-4 mt-4 w-full">
                  <div className="flex-1 text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <div className="font-black text-gray-900 text-lg">342</div>
                    <div className="text-xs text-gray-600 font-semibold">Posts</div>
                  </div>
                  <div className="flex-1 text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="font-black text-gray-900 text-lg">1.2K</div>
                    <div className="text-xs text-gray-600 font-semibold">Network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-amber-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white py-3.5 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-200">
                <Plus className="w-5 h-5" />
                Create Post
              </button>
              <button className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 text-white py-3.5 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-red-200">
                <Video className="w-5 h-5" />
                Go Live
              </button>
              <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white py-3.5 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                <MessageSquare className="w-5 h-5" />
                Ask Question
              </button>
            </div>
          </div>

          {/* My Network */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-gray-900 flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-blue-500" />
                My Network
              </h3>
              <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full font-bold shadow-md">
                8 online
              </span>
            </div>
            <div className="space-y-2">
              {users.allIds.slice(0, 3).map(userId => (
                <NetworkItem 
                  key={userId} 
                  user={users.byId[userId]} 
                  isOnline={true}
                />
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 font-bold text-sm py-2 hover:bg-blue-50 rounded-xl transition-all">
              View All Connections
            </button>
          </div>

          {/* Practice Groups */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-purple-500" />
              Practice Groups
            </h3>
            <div className="space-y-3">
              {practiceGroups.map((group, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 hover:shadow-lg transition-all cursor-pointer group border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${group.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <span className="text-lg">{group.icon}</span>
                    </div>
                    <span className="font-bold text-sm text-gray-800">{group.name}</span>
                  </div>
                  <span className="text-xs text-gray-600 bg-white px-3 py-1.5 rounded-full font-bold shadow-sm">
                    {group.members}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="col-span-6 space-y-6">
          {/* Create Post Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex gap-4 mb-5">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                alt="Your avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-200 shadow-md"
              />
              <textarea 
                placeholder="Share your legal insights, cases, or questions..."
                className="flex-1 border-2 border-gray-200 rounded-2xl p-4 resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all h-24 font-medium bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {[
                  { type: 'text', label: 'Article', icon: FileText, color: 'from-blue-500 to-indigo-600' },
                  { type: 'case', label: 'Case File', icon: Gavel, color: 'from-green-500 to-emerald-600' },
                  { type: 'poll', label: 'Poll', icon: Target, color: 'from-purple-500 to-pink-600' },
                  { type: 'help', label: 'Question', icon: MessageSquare, color: 'from-red-500 to-rose-600' }
                ].map((item) => (
                  <button
                    key={item.type}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-lg transform hover:scale-105 bg-gradient-to-r ${item.color} text-white shadow-md flex items-center gap-2`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
              <button className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 shadow-lg shadow-purple-200">
                Publish
              </button>
            </div>
          </div>

          {/* Trending Banner */}
          <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white rounded-3xl p-8 shadow-2xl overflow-hidden border border-orange-400">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
            <div className="relative flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-6 h-6 animate-pulse" />
                  <span className="text-sm font-black uppercase tracking-wide">🔥 Trending Now</span>
                </div>
                <h3 className="text-2xl font-black mb-2">Supreme Court: Tech Privacy Landmark Case</h3>
                <p className="text-orange-100 text-sm font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  245 legal professionals discussing
                </p>
              </div>
              <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black hover:shadow-2xl transition-all transform hover:scale-105 shadow-xl">
                Join Now
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.allIds.map(postId => (
              <PostComponent
                key={postId}
                post={posts.byId[postId]}
                isLiked={!!state.likedPosts[postId]}
                isBookmarked={!!state.bookmarkedPosts[postId]}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onComment={handleComment}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center py-8">
            <button className="bg-white text-gray-700 px-10 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-blue-500 transform hover:scale-105 flex items-center gap-3 mx-auto">
              <Loader2 className="w-5 h-5" />
              Load More Posts
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 space-y-6">
          {/* Trending This Week */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Trending Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map(topic => (
                <div 
                  key={topic.id}
                  className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 hover:shadow-lg transition-all cursor-pointer border border-gray-100 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 bg-gradient-to-r ${topic.gradient} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Hash className="w-4 h-4 text-white" />
                    </div>
                    <div className="font-black text-gray-900 text-sm">{topic.tag}</div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mb-2">{topic.description}</div>
                  <div className="text-xs text-gray-500 font-bold bg-white px-3 py-1 rounded-full inline-block shadow-sm">
                    {topic.posts} posts
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-green-500" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-100 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-black text-sm text-gray-900">Bar Association Meet</div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Dec 15, 2024 • 10:00 AM</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Supreme Court, Delhi</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-100 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-black text-sm text-gray-900">Legal Tech Summit</div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Dec 20, 2024 • 2:00 PM</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Virtual Event</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 text-lg">
              <Award className="w-5 h-5 text-amber-500" />
              Achievements
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🏆', label: 'Top Contributor', color: 'from-amber-400 to-orange-500' },
                { icon: '💬', label: '100+ Answers', color: 'from-blue-400 to-indigo-500' },
                { icon: '👥', label: 'Networker', color: 'from-green-400 to-emerald-500' },
                { icon: '📚', label: 'Scholar', color: 'from-purple-400 to-pink-500' },
                { icon: '⚡', label: 'Fast Reply', color: 'from-red-400 to-rose-500' },
                { icon: '🌟', label: 'Rising Star', color: 'from-cyan-400 to-blue-500' }
              ].map((badge, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${badge.color} p-4 rounded-2xl text-center hover:scale-110 transition-transform cursor-pointer shadow-lg hover:shadow-2xl`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="text-xs font-bold text-white">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Resources */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl p-6 text-white border border-indigo-400">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6" />
              <h3 className="font-black text-lg">Legal Resources</h3>
            </div>
            <p className="text-sm text-indigo-100 mb-4 font-semibold">
              Access premium legal databases, case law, and research materials
            </p>
            <button className="w-full bg-white text-purple-600 py-3 rounded-2xl font-black hover:shadow-2xl transition-all transform hover:scale-105">
              Explore Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}