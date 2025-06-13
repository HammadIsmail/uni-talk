"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Heart, MessageCircle, Share2, Flag, Hash } from 'lucide-react';

const Feed = () => {
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    university: 'University of Engineering & Technology',
    department: 'Computer Science',
    points: 1247,
    rank: 12,
    avatar: '👩‍🎓'
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Alex Chen',
      avatar: '👨‍💻',
      university: 'UET',
      department: 'CS',
      content: 'Finally finished my Machine Learning assignment! The neural network actually works 🎉 Anyone else struggling with backpropagation?',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      isAnonymous: false,
      tags: ['ML', 'Assignment']
    },
    {
      id: 2,
      author: 'Anonymous',
      avatar: '👤',
      university: 'UET',
      department: 'CS',
      content: 'Feeling overwhelmed with final year project. Anyone else dealing with imposter syndrome? Sometimes I wonder if I even belong here...',
      likes: 18,
      comments: 12,
      timestamp: '4 hours ago',
      isAnonymous: true,
      tags: ['Mental Health', 'FYP']
    }
  ]);

  const addPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: isAnonymous ? 'Anonymous' : user.name,
        avatar: isAnonymous ? '👤' : user.avatar,
        university: user.university,
        department: user.department,
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        isAnonymous,
        tags: []
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const likePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="tab-content space-y-6">
      {/* Create Post */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">{user.avatar}</div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts with fellow students..."
                className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Post anonymously</span>
                  </label>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Hash className="w-4 h-4" />
                    <span>Add tags</span>
                  </div>
                </div>
                <Button onClick={addPost} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map(post => (
        <Card key={post.id} className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{post.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold">{post.author}</span>
                  {!post.isAnonymous && (
                    <>
                      <span className="text-gray-500">•</span>
                      <Badge variant="outline" className="text-xs">
                        {post.university}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {post.department}
                      </Badge>
                    </>
                  )}
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{post.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => likePost(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Feed;