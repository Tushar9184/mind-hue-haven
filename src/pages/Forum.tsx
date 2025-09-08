import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Heart, 
  MessageCircle, 
  Clock, 
  Shield,
  TrendingUp,
  Eye,
  Filter
} from 'lucide-react';
import { mockForumPosts, type ForumPost } from '@/data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    isAnonymous: true,
    tags: [] as string[]
  });

  const allTags = ['anxiety', 'academicStress', 'sleep', 'depression', 'meditation', 'support', 'routine', 'overwhelmed'];
  
  const filteredPosts = mockForumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      anxiety: 'bg-orange-100 text-orange-800',
      academicStress: 'bg-red-100 text-red-800',
      sleep: 'bg-blue-100 text-blue-800',
      depression: 'bg-purple-100 text-purple-800',
      meditation: 'bg-green-100 text-green-800',
      support: 'bg-pink-100 text-pink-800',
      routine: 'bg-indigo-100 text-indigo-800',
      overwhelmed: 'bg-yellow-100 text-yellow-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  const handleCreatePost = () => {
    // Simulate post creation
    console.log('Creating post:', newPost);
    setIsCreateOpen(false);
    setNewPost({ title: '', content: '', isAnonymous: true, tags: [] });
  };

  const communityStats = [
    { label: 'Active Members', value: '1,247', icon: '👥' },
    { label: 'Posts This Week', value: '89', icon: '📝' },
    { label: 'Support Given', value: '2,156', icon: '❤️' },
    { label: 'Wellness Challenges', value: '12', icon: '🎯' }
  ];

  return (
    <div className="space-y-8">
      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => (
          <Card key={index} className="mood-card text-center">
            <CardContent className="pt-4">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Create */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedTag} 
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 border border-border rounded-2xl text-sm"
          >
            <option value="all">All Topics</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>#{tag}</option>
            ))}
          </select>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="mood-button gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Share with the Community</DialogTitle>
                <DialogDescription>
                  Create a post to connect with others and share your experiences
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="What's on your mind?"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, experiences, or questions..."
                    rows={4}
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="anonymous"
                    checked={newPost.isAnonymous}
                    onCheckedChange={(checked) => setNewPost(prev => ({ ...prev, isAnonymous: checked }))}
                  />
                  <Label htmlFor="anonymous">Post anonymously</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={newPost.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          setNewPost(prev => ({
                            ...prev,
                            tags: prev.tags.includes(tag)
                              ? prev.tags.filter(t => t !== tag)
                              : [...prev.tags, tag]
                          }));
                        }}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreatePost} className="flex-1">
                    Post to Community
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Community Guidelines */}
      <Card className="mood-card bg-mood-soft/50">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Community Guidelines</span>
          </div>
          <p className="text-xs text-muted-foreground">
            This is a safe space for peer support. Be kind, respectful, and remember that everyone's journey is unique. 
            Posts are moderated to ensure a supportive environment.
          </p>
        </CardContent>
      </Card>

      {/* Forum Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="mood-card hover:scale-[1.02] transition-transform duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {post.isAnonymous ? '?' : post.author.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {post.isAnonymous ? 'Anonymous' : post.author}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(post.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{post.likes + post.replies} interactions</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.content}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} className={getTagColor(tag)} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    {post.replies} replies
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="mood-card">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to start a conversation about this topic!
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              Create First Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};