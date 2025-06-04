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
}

const NotificationService = new Notifications();
export default NotificationService;
