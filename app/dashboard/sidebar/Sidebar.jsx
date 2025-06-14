"use client";
import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  CheckSquare, 
  Users, 
  Trophy, 
  Settings,
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function Sidebar({ activeTab, setActiveTab, notifications, user }) {
  const sidebarItems = [
    { id: 'feed', icon: Home, label: 'Social Feed', notifications: 0 },
    { id: 'chat', icon: MessageSquare, label: 'Chat Rooms', notifications: 4 },
    { id: 'notes', icon: BookOpen, label: 'Study Notes', notifications: 4 },
    { id: 'tasks', icon: CheckSquare, label: 'To-Do List', notifications: 4 },
    { id: 'friends', icon: Users, label: 'Friends', notifications: 2 },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', notifications: 0 }
  ];


  return (
    <div className="w-64 bg-white shadow-lg flex flex-col fixed h-full z-10">
      {/* Avatar Section */}
      <div className="p-4 border-b flex justify-center">
        <button
          onClick={() => setActiveTab('userprofile')}
          className="focus:outline-none"
        >
          <Image
            src={"/avatar.jpg"}
            alt="User Avatar"
            width={64}
            height={64}
            className="rounded-full hover:ring-2 ring-blue-500 transition duration-300 object-cover"
          />
        </button>
      </div>

      {/* Sidebar Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
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

      {/* Bottom Buttons */}
      <div className="p-4 border-t space-y-2">
        <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
          {notifications > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {notifications.total}
            </Badge>
          )}
        </button>
        <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}
