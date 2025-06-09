'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  MapPin,
} from 'lucide-react';
import type { Booking } from '../types/booking';
import Image from 'next/image';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'owner';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

// Mock messages for demonstration
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! I have a booking for your property. I wanted to ask about the check-in process.',
    sender: 'user',
    timestamp: '10:30 AM',
    status: 'read',
  },
  {
    id: '2',
    text: "Hello! Thanks for reaching out. Check-in is from 3 PM onwards. I'll send you the access codes closer to your arrival date.",
    sender: 'owner',
    timestamp: '10:32 AM',
    status: 'read',
  },
  {
    id: '3',
    text: 'Perfect! Is there parking available?',
    sender: 'user',
    timestamp: '10:33 AM',
    status: 'read',
  },
  {
    id: '4',
    text: "Yes, there's free parking right in front of the building. Space #12 is reserved for you.",
    sender: 'owner',
    timestamp: '10:35 AM',
    status: 'delivered',
  },
];

export function ChatPopup({ isOpen, onClose, booking }: ChatPopupProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');

    // Simulate owner typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const ownerResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you shortly.",
        sender: 'owner',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'sent',
      };
      setMessages((prev) => [...prev, ownerResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-full max-w-md h-[600px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-background/95 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10 h-full flex flex-col">
            {/* Header */}
            <CardHeader className="pb-3 border-b border-primary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {booking.apartment.owner?.name?.charAt(0) || 'O'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-headline">
                      {booking.apartment.owner?.name || 'Property Owner'}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer h-8 w-8 p-0"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Property Info */}
              <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-center gap-3">
                  <Image
                    src={booking.apartment.image || '/placeholder.svg'}
                    alt={booking.apartment.name}
                    width={36}
                    height={36}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-headline text-sm truncate">
                      {booking.apartment.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">
                        {booking.apartment.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Booking #{booking.id.slice(-4)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-background'
                            : 'bg-muted/50 text-foreground border border-primary/10'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-background/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {message.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted/50 border border-primary/10 rounded-2xl px-4 py-2">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">
                            typing...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-primary/10">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer h-8 w-8 p-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="pr-10 bg-background/50 border-primary/20 focus:border-primary/40"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1 h-6 w-6 p-0"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="cursor-pointer h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/*
BACKEND INTEGRATION INSTRUCTIONS:

1. WEBSOCKET CONNECTION:
   - Replace mock messages with real-time WebSocket connection
   - Use libraries like Socket.IO or native WebSocket API
   - Example: const socket = io('/chat', { query: { bookingId: booking.id } })

2. MESSAGE PERSISTENCE:
   - Store messages in database (MongoDB, PostgreSQL, etc.)
   - Implement message history loading on chat open
   - Add pagination for older messages

3. REAL-TIME FEATURES:
   - Implement typing indicators using socket events
   - Add message delivery/read receipts
   - Show online/offline status of property owners

4. FILE SHARING:
   - Implement file upload for attachments (images, documents)
   - Use cloud storage (AWS S3, Cloudinary) for file hosting
   - Add image preview and download functionality

5. PUSH NOTIFICATIONS:
   - Integrate with Firebase Cloud Messaging or similar
   - Send notifications for new messages when chat is closed
   - Add email notifications for offline users

6. AUTHENTICATION:
   - Verify user identity and booking ownership
   - Implement JWT tokens for secure communication
   - Add rate limiting to prevent spam

7. MODERATION:
   - Add message filtering for inappropriate content
   - Implement report/block functionality
   - Store chat logs for dispute resolution

8. API ENDPOINTS NEEDED:
   - GET /api/chat/:bookingId/messages - Fetch message history
   - POST /api/chat/:bookingId/messages - Send new message
   - PUT /api/chat/:bookingId/messages/:messageId/read - Mark as read
   - POST /api/chat/:bookingId/upload - File upload endpoint

9. DATABASE SCHEMA:
   - Messages table: id, booking_id, sender_id, content, timestamp, type, status
   - Chat_participants table: booking_id, user_id, owner_id, last_read_at
   - File_attachments table: id, message_id, file_url, file_type, file_size

10. SECURITY CONSIDERATIONS:
    - Validate booking ownership before allowing chat access
    - Sanitize message content to prevent XSS attacks
    - Implement message encryption for sensitive data
    - Add CORS configuration for WebSocket connections
*/
