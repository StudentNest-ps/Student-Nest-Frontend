import axios from 'axios';
import { INotification, INotificationRequest } from '../types/Notifications';
import { getToken } from './token';

class Notifications {
  async getNotifications() {
    const res = await axios.get(`/api/sn/api/notifications`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  }

  async markAsSeen(notificationId: string) {
    const res = await axios.put(
      `/api/sn/api/notifications/${notificationId}/seen`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    console.log(res.status);
    console.log(res.data);
  }

  async createNotification(notification: INotificationRequest) {
    //TODO: Use this in various placed like when the user creates a booking, when the admin sends some feedback, when the owner accepts or rejects a booking
    const res = await axios.post(`/api/sn/api/notifications`, notification, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data as INotification;
  }
}

const NotificationService = new Notifications();
export default NotificationService;
