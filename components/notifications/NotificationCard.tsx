import React from 'react';
import { InfoIcon, CheckCircleIcon, XCircleIcon, BellIcon } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
type NotificationProps = {
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
  message,
  type,
  seen,
  createdAt,
}) => {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg shadow-md transition-all border ${
        seen ? 'bg-muted border-green-500' : 'bg-accent border-red-500'
      }`}
    >
      <div className="mt-1">{getIcon(type)}</div>
      <div className="flex-1">
        <p className="text-sm text-foreground">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
