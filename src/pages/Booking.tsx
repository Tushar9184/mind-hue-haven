import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';
import { mockAppointments, type Appointment } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'counselor' | 'helpline'>('counselor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableSlots = mockAppointments.filter(apt => apt.status === 'available');
  
  const urgencyLevels = [
    { value: 'low', label: 'Routine Support', description: 'General wellness check-in' },
    { value: 'medium', label: 'Moderate Concern', description: 'Specific issues affecting daily life' },
    { value: 'high', label: 'Urgent Support', description: 'Significant distress requiring prompt attention' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your appointment has been scheduled. You'll receive a confirmation email shortly.
          </p>
          <div className="mood-card p-6 space-y-2">
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Type:</strong> {selectedType === 'counselor' ? 'Counselor Session' : 'Helpline Support'}</p>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            className="mt-6"
          >
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <Card className="mood-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule an Appointment
            </CardTitle>
            <CardDescription>
              All appointments are completely confidential and free for students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select value={selectedType} onValueChange={(value: 'counselor' | 'helpline') => setSelectedType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="counselor">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        On-Campus Counselor
                      </div>
                    </SelectItem>
                    <SelectItem value="helpline">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Consultation
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...new Set(availableSlots.map(slot => slot.date.toDateString()))].map(date => (
                        <SelectItem key={date} value={date}>
                          {new Date(date as string).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots
                        .filter(slot => selectedDate ? slot.date.toDateString() === selectedDate : true)
                        .map(slot => (
                          <SelectItem key={slot.id} value={slot.time}>
                            {slot.time} - {slot.counselor}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-sm text-muted-foreground">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Brief Description (Optional)</Label>
                <Textarea 
                  id="reason"
                  placeholder="What would you like to discuss? This helps us prepare for your session."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full mood-button">
                Book Appointment
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Available Slots & Information */}
        <div className="space-y-6">
          <Card className="mood-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Available This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableSlots.slice(0, 6).map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-3 bg-mood-soft rounded-2xl">
                    <div>
                      <p className="font-medium">
                        {slot.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{slot.counselor}</p>
                      <p className="text-xs text-muted-foreground">
                        {slot.type === 'counselor' ? 'In-Person' : 'Phone Call'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mood-card">
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Confidential Environment</h4>
                  <p className="text-sm text-muted-foreground">Your privacy is our top priority. All sessions are completely confidential.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Professional Support</h4>
                  <p className="text-sm text-muted-foreground">Licensed counselors trained in student mental health.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Flexible Options</h4>
                  <p className="text-sm text-muted-foreground">Choose between in-person, phone, or video sessions.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-destructive mb-2">Crisis Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're in immediate crisis, don't wait for an appointment
              </p>
              <div className="space-y-2">
                <Button variant="destructive" size="sm" className="w-full">
                  Crisis Helpline: 988
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Campus Security: (555) 123-4567
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};