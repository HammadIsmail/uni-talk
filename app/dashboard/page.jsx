'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Home, MessageSquare, BookOpen, CheckSquare, Users, Trophy, 
  Search, Plus, Heart, MessageCircle, Share2, Flag, Eye, EyeOff,
  Calendar, Clock, Star, Upload, Download, Filter, Bell, Settings,
  User, GraduationCap, Building2, Sparkles, TrendingUp, Award,
  FileText, Hash, MapPin, Send, Mic, Image, Paperclip, MoreHorizontal,
  ChevronRight, Activity, Target, Crown, Medal, Zap
} from 'lucide-react';
import Feed from '@/components/dashboardComponents/feed/Feed';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('feed');
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
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


  const [newTask, setNewTask] = useState('');

  const dashboardRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Initial animations
    gsap.fromTo(sidebarRef.current, 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(".dashboard-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  useEffect(() => {
    // Animate content changes
    gsap.fromTo(".tab-content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTab]);



  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
        priority: 'medium',
        deadline: new Date().toISOString().split('T')[0]
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };



  const sidebarItems = [
    { id: 'feed', icon: Home, label: 'Social Feed', notifications: 0 },
    { id: 'chat', icon: MessageSquare, label: 'Chat Rooms', notifications: 4 },
    { id: 'notes', icon: BookOpen, label: 'Study Notes', notifications: 0 },
    { id: 'tasks', icon: CheckSquare, label: 'To-Do List', notifications: 0 },
    { id: 'friends', icon: Users, label: 'Friends', notifications: 2 },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', notifications: 0 }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'feed':
        return (
            <Feed/>
        );

      case 'chat':
        return (
          <div className="tab-content space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Chat Rooms</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Room
              </Button>
            </div>
            
            <div className="grid gap-4">
              {chatRooms.map(room => (
                <Card key={room.id} className="dashboard-card cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-blue-100">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{room.name}</h3>
                          <p className="text-sm text-gray-500">{room.lastMessage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={room.type === 'public' ? 'default' : 'secondary'}>
                          {room.type}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{room.members} members</p>
                        {room.unread > 0 && (
                          <Badge variant="destructive" className="mt-1">
                            {room.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="tab-content space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Study Notes</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Notes
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <Input placeholder="Search notes..." className="w-full" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid gap-4">
              {notes.map(note => (
                <Card key={note.id} className="dashboard-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-purple-100">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{note.title}</h3>
                          <p className="text-sm text-gray-500">by {note.author}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">{note.downloads} downloads</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-500">{note.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{note.type}</Badge>
                        <p className="text-sm text-gray-500 mt-1">{note.size}</p>
                        <Button size="sm" className="mt-2">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="tab-content space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">To-Do List</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar View
              </Button>
            </div>

            {/* Add Task */}
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  />
                  <Button onClick={addTask}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tasks */}
            <div className="space-y-4">
              {tasks.map(task => (
                <Card key={task.id} className={`dashboard-card ${task.completed ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                      </button>
                      <div className="flex-1">
                        <h3 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant={
                            task.priority === 'high' ? 'destructive' : 
                            task.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {task.priority}
                          </Badge>
                          <span className="text-sm text-gray-500">Due: {task.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'friends':
        return (
          <div className="tab-content space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Friends & Following</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Users className="w-4 h-4 mr-2" />
                Find Friends
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Friend Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">👨‍🎓</div>
                          <div>
                            <p className="font-medium">John Smith</p>
                            <p className="text-sm text-gray-500">UET • Computer Science</p>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">Decline</Button>
                          <Button size="sm">Accept</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm">Alex uploaded new ML notes</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-sm">Sarah liked your post</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="tab-content space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Leaderboard</h2>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                This Month
              </Button>
            </div>

            {/* Your Stats */}
            <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{user.avatar}</div>
                    <div>
                      <h3 className="font-bold text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.university}</p>
                      <Badge className="mt-1">Rising Star</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{user.points}</div>
                    <p className="text-sm text-gray-500">points</p>
                    <p className="text-sm text-gray-500">Rank #{user.rank}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Rankings */}
            <div className="space-y-4">
              {leaderboard.map(person => (
                <Card key={person.rank} className={`dashboard-card ${person.name === 'You' ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {person.rank === 1 && <Crown className="w-6 h-6 text-yellow-500" />}
                          {person.rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
                          {person.rank === 3 && <Award className="w-6 h-6 text-orange-500" />}
                          {person.rank > 3 && <span className="text-xl font-bold text-gray-500">#{person.rank}</span>}
                        </div>
                        <div className="text-3xl">{person.avatar}</div>
                        <div>
                          <h3 className="font-semibold">{person.name}</h3>
                          <p className="text-sm text-gray-500">{person.university}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{person.points}</div>
                        <Badge variant={
                          person.badge === 'Gold' ? 'default' :
                          person.badge === 'Silver' ? 'secondary' :
                          person.badge === 'Bronze' ? 'outline' : 'default'
                        }>
                          {person.badge}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className="w-64 bg-white shadow-lg flex flex-col fixed h-full z-10"
      >
        {/* User Profile */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{user.avatar}</div>
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-sm opacity-90">{user.university}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">{user.points} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.notifications > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {item.notifications}
                    </Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div 
          ref={contentRef}
          className="p-6 max-w-4xl mx-auto"
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}