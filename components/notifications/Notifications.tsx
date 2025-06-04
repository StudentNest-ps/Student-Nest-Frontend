import React from 'react';
import NotificationCard from '@/components/notifications/NotificationCard';
import { LoaderCircle } from 'lucide-react';
import { INotification } from '@/module/types/Notifications';

const Notifications = ({
  notifications,
  loading,
}: {
  notifications: INotification[];
  loading: boolean;
}) => {
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
            _id={n._id}
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
