import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Play, BookOpen, Headphones, Clock, Filter } from 'lucide-react';
import { mockResources, type Resource } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const categories = ['All Categories', 'Meditation', 'Mental Health Education', 'Sleep & Wellness', 'Relaxation', 'Academic Support'];
  const types = ['All Types', 'Video', 'Audio', 'Guide'];

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'audio':
        return <Headphones className="h-4 w-4" />;
      case 'guide':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'audio':
        return 'bg-blue-100 text-blue-800';
      case 'guide':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const featuredResources = [
    {
      title: 'Quick Stress Relief',
      description: 'Immediate techniques for managing acute stress',
      emoji: '🌬️',
      action: 'Try Now'
    },
    {
      title: 'Sleep Better Tonight',
      description: 'Evidence-based sleep improvement strategies',
      emoji: '😴',
      action: 'Learn More'
    },
    {
      title: 'Anxiety Toolkit',
      description: 'Comprehensive guide to understanding and managing anxiety',
      emoji: '🧰',
      action: 'Explore'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Featured Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredResources.map((resource, index) => (
          <Card key={index} className="mood-card hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">{resource.emoji}</div>
              <h3 className="font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
              <Button variant="outline" size="sm">
                {resource.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="mood-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Meditation">Meditation</SelectItem>
                  <SelectItem value="Mental Health Education">Mental Health Education</SelectItem>
                  <SelectItem value="Sleep & Wellness">Sleep & Wellness</SelectItem>
                  <SelectItem value="Relaxation">Relaxation</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="guide">Guides</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="mood-card hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="text-3xl">{resource.thumbnail}</div>
                <Badge className={getTypeColor(resource.type)}>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(resource.type)}
                    {resource.type}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <CardTitle className="text-lg mb-1">{resource.title}</CardTitle>
                <CardDescription className="text-sm">{resource.description}</CardDescription>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="bg-mood-soft px-2 py-1 rounded-full text-xs">
                  {resource.category}
                </span>
                {resource.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {resource.duration}
                  </div>
                )}
              </div>
              
              <Button className="w-full" variant="outline">
                {resource.type === 'video' && 'Watch Now'}
                {resource.type === 'audio' && 'Listen Now'}
                {resource.type === 'guide' && 'Read Guide'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="mood-card">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Emergency Resources */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Crisis Resources</CardTitle>
          <CardDescription>
            Immediate help when you need it most
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">National Crisis Text Line</h4>
              <p className="text-sm text-muted-foreground">Text HOME to 741741</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">National Suicide Prevention Lifeline</h4>
              <p className="text-sm text-muted-foreground">Call or text 988</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Campus Crisis Line</h4>
              <p className="text-sm text-muted-foreground">(555) 123-HELP</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Emergency Services</h4>
              <p className="text-sm text-muted-foreground">Call 911</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};