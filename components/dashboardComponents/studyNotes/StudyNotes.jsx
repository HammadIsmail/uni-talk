"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Filter, Star } from 'lucide-react';

export default function StudyNotes({ initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);
  
  return (
    <div className="tab-content space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Study Notes</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Notes
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <Input placeholder="Search notes..." className="w-full" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Notes List */}
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
}