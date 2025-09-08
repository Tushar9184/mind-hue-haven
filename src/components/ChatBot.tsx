import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Phone, Calendar } from 'lucide-react';
import { mockChatMessages, type ChatMessage } from '@/data/mockData';
import { useMood } from '@/contexts/MoodContext';

const botResponses: Record<string, { message: string; suggestions?: string[]; showActions?: boolean }> = {
  default: {
    message: "I understand you're going through a difficult time. Can you tell me more about what's bothering you?",
    suggestions: ['I feel overwhelmed', 'I can\'t focus', 'I feel lonely', 'I\'m having panic attacks']
  },
  anxiety: {
    message: "Anxiety can be really challenging. Here are some immediate techniques that might help: Try the 4-7-8 breathing exercise - breathe in for 4, hold for 7, exhale for 8. Would you like me to guide you through this?",
    suggestions: ['Guide me through breathing', 'Tell me more coping strategies', 'I need professional help'],
    showActions: true
  },
  overwhelmed: {
    message: "Feeling overwhelmed is very common among students. Let's break this down: What's your biggest stressor right now? Academic work, social situations, or something else?",
    suggestions: ['Academic pressure', 'Social anxiety', 'Financial stress', 'Family issues']
  },
  professional: {
    message: "It sounds like you might benefit from speaking with a professional counselor. I can help you book an appointment with our on-campus mental health services, or connect you with our 24/7 helpline.",
    suggestions: ['Book counselor appointment', 'Call helpline now', 'Learn more about services'],
    showActions: true
  }
};

export const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setMood } = useMood();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowercaseContent = content.toLowerCase();
      let response = botResponses.default;

      if (lowercaseContent.includes('anxious') || lowercaseContent.includes('anxiety') || lowercaseContent.includes('panic')) {
        response = botResponses.anxiety;
        setMood('anxious');
      } else if (lowercaseContent.includes('overwhelmed') || lowercaseContent.includes('stress')) {
        response = botResponses.overwhelmed;
        setMood('stressed');
      } else if (lowercaseContent.includes('help') || lowercaseContent.includes('counselor') || lowercaseContent.includes('professional')) {
        response = botResponses.professional;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <Card className="mood-card h-96 flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-semibold">Mental Health Assistant</h3>
            <p className="text-xs text-muted-foreground">Always here to help • Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-bubble-bot">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Show suggestions from the last bot message */}
        {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].suggestions && !isTyping && (
          <div className="flex flex-wrap gap-2">
            {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs h-auto py-1 px-2 rounded-full"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2 mb-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Phone className="h-4 w-4" />
            Crisis Helpline
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="How are you feeling today?"
            onKeyPress={(e) => e.key === 'Enter' && inputValue.trim() && handleSendMessage(inputValue)}
            className="rounded-2xl"
          />
          <Button 
            onClick={() => inputValue.trim() && handleSendMessage(inputValue)}
            size="icon"
            className="rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};