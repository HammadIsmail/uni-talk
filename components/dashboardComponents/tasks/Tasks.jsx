"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, CheckSquare } from 'lucide-react';

export default function Tasks({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

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

      {/* Tasks List */}
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
}