"use client";
import { Zap, Mail, Link, Calendar, Users, GraduationCap, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserProfile({ user }) {
  return (
    <div className="border-b bg-white dark:bg-gray-900">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <div className="absolute -bottom-16 left-6">
          <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-900">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="text-4xl">{user.avatar}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" />
              {user.university} • {user.department}
            </p>
            
            <div className="flex items-center space-x-4 mt-3">
              <Badge variant="secondary" className="flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                {user.points} pts
              </Badge>
              <Badge>Rank #{user.rank}</Badge>
            </div>

            <p className="mt-3 text-gray-700 dark:text-gray-300">
              {user.bio || "Hey there! I'm a student passionate about technology and learning."}
            </p>

            <div className="flex items-center space-x-4 mt-3 text-sm">
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                1,248 followers
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                563 following
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button size="sm">
              Follow
            </Button>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex border-t mt-4 pt-4 justify-between">
          <div className="text-center">
            <div className="font-bold">246</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold">1.2K</div>
            <div className="text-sm text-gray-500">Likes</div>
          </div>
          <div className="text-center">
            <div className="font-bold">89</div>
            <div className="text-sm text-gray-500">Groups</div>
          </div>
          <div className="text-center">
            <div className="font-bold">24</div>
            <div className="text-sm text-gray-500">Badges</div>
          </div>
        </div>
      </div>
    </div>
  );
}