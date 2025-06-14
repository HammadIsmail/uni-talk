"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, Crown, Medal, Award } from 'lucide-react';

export default function Leaderboard({ leaderboard, user }) {
  return (
    <div className="tab-content space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          This Month
        </Button>
      </div>

      {/* User Stats */}
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

      {/* Rankings List */}
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
}