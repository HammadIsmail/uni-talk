"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus } from 'lucide-react';

export default function ChatRooms({ chatRooms }) {
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
}