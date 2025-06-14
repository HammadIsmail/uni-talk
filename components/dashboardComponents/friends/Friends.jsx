
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, Heart } from 'lucide-react';

export default function Friends() {
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
        {/* Friend Requests */}
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

        {/* Recent Activity */}
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
}