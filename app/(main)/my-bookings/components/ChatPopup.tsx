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
import Cookies from 'js-cookie';
import ChatService from '@/module/services/Chat';
import { IMessage } from '@/module/types/Chat';

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
}

export function ChatPopup({ isOpen, onClose, booking }: ChatPopupProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const senderId = Cookies.get('user-id') || '';

  // Fetch messages when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      // const fetchChatId = async () => {
      //   const apartmentId = booking.apartment.id;
      //   const chatData =
      //   let chatId = '';
      //   if (chatData.length == 0) {
      //     chatId = '684d6660695ca2fe01985f19';
      //   } else {
      //     chatId = chatData[0]._id;
      //   }
      //   console.log(`chatId is:`, chatId);
      //   console.log(`apartmentId is: ${booking.apartment.id}`);

      //   return chatId;
      // };
      const fetchMessages = async () => {
        try {
          const response = await ChatService.getMessagesByThread(
            senderId,
            booking.apartment.owner?.id || '',
            booking.apartment.id
          );

          const formatted: Message[] = response.map((msg) => ({
            id: msg._id,
            text: msg.message,
            sender: msg.senderId === senderId ? 'user' : 'owner',
            timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }));

          setMessages(formatted);
        } catch (err) {
          console.error('Failed to fetch messages:', err);
        }
      };

      fetchMessages();
    }
  }, [
    isOpen,
    booking.id,
    senderId,
    booking.apartment.owner?.id,
    booking.apartment.id,
  ]);

  // Scroll to bottom on message change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const tempMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const payload: IMessage = {
      senderId,
      receiverId: booking.apartment.owner?.id || '',
      propertyId: booking.apartment.id,
      message: newMessage,
    };

    try {
      await ChatService.sendMessage(payload); // <-- make sure this works with backend
      setMessages((prev) => [...prev, tempMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
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
                  {messages.length !== 0 ? (
                    messages.map((message) => (
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
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full text-sm text-muted-foreground">
                      No messages yet. Start the conversation!
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-primary/10">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
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
                  className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
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
