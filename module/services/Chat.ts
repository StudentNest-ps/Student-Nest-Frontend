import axios from 'axios';
import { getToken } from './token';
import { IMessage, IMessages } from '../types/Chat';

class Chat {
  async getChatId(apartmentId: string) {
    console.log(apartmentId);

    const res = await axios.get(
      `/api/sn/api/messages/property/${apartmentId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  }

  async sendMessage(message: IMessage) {
    const res = await axios.post(`/api/sn/api/messages`, message, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(res.data, res.status);
  }

  async getMessages(chatId: string) {
    const res = await axios.get(`/api/sn/api/messages/${chatId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.data as IMessages[];
  }

  async getMessagesByThread(senderId: string, receiverId: string, propertyId: string) {
    const res = await axios.get(
      `/api/sn/api/messages/thread?senderId=${senderId}&receiverId=${receiverId}&propertyId=${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return res.data as IMessages[];
  }
}

const ChatService = new Chat();
export default ChatService;
