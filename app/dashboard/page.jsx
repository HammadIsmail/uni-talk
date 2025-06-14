'use client';

import { useState, useEffect, useRef } from 'react';
import ChatRooms from '@/components/dashboardComponents/ChatRoom/ChatRooms';
import Leaderboard from '@/components/dashboardComponents/Leaderboard/Leaderboard';
import Tasks from '@/components/dashboardComponents/tasks/Tasks';
import Friends from '@/components/dashboardComponents/friends/Friends';
import StudyNotes from '@/components/dashboardComponents/studyNotes/StudyNotes';
import Sidebar from './sidebar/Sidebar';
import Feed from '@/components/dashboardComponents/feed/Feed';
import { useRouter } from 'next/navigation'; // ✅ FIXED
import { verifySession } from '@/lib/auth';

export default function StudentDashboard({ user: authUser }) {
  const router = useRouter();
  const dashboardRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');

  const [user, setUser] = useState({
    name: authUser?.name || authUser?.username || 'Student',
    university: 'University of Engineering & Technology',
    department: 'Computer Science',
    points: 1247,
    rank: 12,
    avatar: '👩‍🎓'
  });

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Database Assignment', completed: false, priority: 'high', deadline: '2024-06-15' },
    { id: 2, title: 'Study for Algorithms Midterm', completed: false, priority: 'medium', deadline: '2024-06-18' },
    { id: 3, title: 'Submit Research Paper Draft', completed: true, priority: 'high', deadline: '2024-06-10' },
    { id: 4, title: 'Prepare Presentation Slides', completed: false, priority: 'low', deadline: '2024-06-20' }
  ]);

  const [notes, setNotes] = useState([
    { id: 1, title: 'Data Structures Notes - Trees & Graphs', author: 'Mike Wilson', downloads: 156, rating: 4.8, type: 'PDF', size: '2.3 MB' },
    { id: 2, title: 'Machine Learning Cheat Sheet', author: 'Sarah Kim', downloads: 89, rating: 4.6, type: 'DOCX', size: '1.1 MB' },
    { id: 3, title: 'Database Design Principles', author: 'John Doe', downloads: 203, rating: 4.9, type: 'PDF', size: '3.7 MB' }
  ]);

  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: 'UET 2024 CS Batch', members: 45, lastMessage: 'Hey everyone! Study group tomorrow?', type: 'public', unread: 3 },
    { id: 2, name: 'Final Year Project Help', members: 23, lastMessage: 'Anyone working on AI projects?', type: 'public', unread: 0 },
    { id: 3, name: 'Study Buddies', members: 8, lastMessage: 'Meeting at library 6 PM', type: 'private', unread: 1 }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Emma Davis', points: 2340, avatar: '👩‍🔬', university: 'UET', badge: 'Gold' },
    { rank: 2, name: 'James Wilson', points: 2156, avatar: '👨‍💼', university: 'UET', badge: 'Silver' },
    { rank: 3, name: 'Lisa Chen', points: 1987, avatar: '👩‍💻', university: 'MIT', badge: 'Bronze' },
    { rank: 4, name: 'You', points: 1247, avatar: '👩‍🎓', university: 'UET', badge: 'Rising Star' }
  ]);

  useEffect(() => {
    async function checkAuth() {
      const session = await verifySession();

      if (!session) {
        router.push('/signup');
      } else {
        setUser(prev => ({
          ...prev,
          ...session.user
        }));
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'chat':
        return <ChatRooms chatRooms={chatRooms} />;
      case 'notes':
        return <StudyNotes initialNotes={notes} />;
      case 'tasks':
        return <Tasks tasks={tasks} />;
      case 'friends':
        return <Friends />;
      case 'leaderboard':
        return <Leaderboard leaderboard={leaderboard} user={user} />;
      default:
        return null;
    }
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      <div className="flex-1 ml-64">
        <div className="p-6 max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
