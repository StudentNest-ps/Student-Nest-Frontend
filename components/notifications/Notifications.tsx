import React, { useEffect, useState } from 'react';
import NotificationService from '@/module/services/Notifications';
import NotificationCard from '@/components/notifications/NotificationCard';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { Notification } from '@/module/types/Notifications';

const dummyNotifications: Notification[] = [
  {
    _id: '684031a90c6f5a63286d1859',
    userId: '681a048ec95d02acc4aeed08',
    message: 'hello from a user to an owner',
    seen: false,
    type: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await NotificationService.getNotifications();
        setNotifications(res);
      } catch {
        toast.error('Failed to load Notifications');
        setNotifications(dummyNotifications);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <LoaderCircle className="h-4 w-4 animate-spin text-primary mx-auto" />
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500">It’s Quiet Here.</div>
      ) : (
        notifications.map((n) => (
          <NotificationCard
            key={n._id}
            message={n.message}
            type={n.type}
            seen={n.seen}
            createdAt={n.createdAt}
          />
        ))
      )}
    </div>
  );
};

export default Notifications;
