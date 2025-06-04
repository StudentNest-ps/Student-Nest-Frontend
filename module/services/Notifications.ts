import axios from 'axios';
import { token } from './token';

class Notifications {
  async getNotifications() {
    const res = await axios.get(`/api/sn/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  async markAsSeen(notificationId: string) {
    const res = await axios.put(
      `/api/sn/api/notifications/${notificationId}/seen`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.status);
    console.log(res.data);
  }
}

const NotificationService = new Notifications();
export default NotificationService;
