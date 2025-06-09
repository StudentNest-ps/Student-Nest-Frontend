import React, { useState } from 'react';
import {
  InfoIcon,
  CheckCircleIcon,
  XCircleIcon,
  BellIcon,
  Check,
  LoaderCircle,
} from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button } from '../ui/button';
import NotificationService from '@/module/services/Notifications';
import { toast } from 'sonner';

dayjs.extend(relativeTime);

type NotificationProps = {
  _id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'system';
  seen: boolean;
  createdAt: string;
};

const getIcon = (type: NotificationProps['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon className="text-green-600" size={20} />;
    case 'error':
      return <XCircleIcon className="text-red-600" size={20} />;
    case 'system':
      return <BellIcon className="text-yellow-600" size={20} />;
    case 'info':
    default:
      return <InfoIcon className="text-blue-600" size={20} />;
  }
};

const NotificationCard: React.FC<NotificationProps> = ({
  _id,
  message,
  type,
  seen,
  createdAt,
}) => {
  const [seenLoading, setSeenLoading] = useState(false);
  const onMarkAsSeen = async (id: string) => {
    try {
      setSeenLoading(true);
      console.log('this notification is seen: ', id);
      await NotificationService.markAsSeen(id);
    } catch {
      toast.error(
        'Failed to mark this Notification as seen. Please contact an admin for troubleshooting'
      );
    } finally {
      setSeenLoading(false);
    }
  };
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg shadow-md transition-all border-2 ${
        seen ? 'bg-muted/50 border-muted' : 'bg-accent/50 border-accent'
      }`}
    >
      <div className="mt-1">{getIcon(type)}</div>
      <div className="flex-1">
        <p className="text-sm text-foreground">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
      {!seen && (
        <Button
          onClick={() => onMarkAsSeen(_id)}
          variant="outline"
          className="cursor-pointer text-sm hover:underline flex items-center gap-1"
        >
          {seenLoading ? (
            <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <Check size={16} />
          )}
        </Button>
      )}
    </div>
  );
};

export default NotificationCard;
