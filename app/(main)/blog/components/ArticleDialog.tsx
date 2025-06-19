'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface ArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
  } | null;
}

export default function ArticleDialog({
  isOpen,
  onClose,
  article,
}: ArticleDialogProps) {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          {/* Image at the top */}
          <div className="relative w-full h-64 md:h-72">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
              {article.category}
            </div>
          </div>

          {/* Article content below */}
          <div className="flex-1 p-6 overflow-y-auto">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold">
                {article.title}
              </DialogTitle>
              <div className="flex items-center gap-4 text-muted-foreground text-sm mt-2">
                <span>{article.author}</span>
                <span>{article.date}</span>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {article.readTime}
                </div>
              </div>
            </DialogHeader>

            <div className="prose prose-sm max-w-none dark:prose-invert">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
