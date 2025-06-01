import axios from 'axios';
import { token } from './token';
import { IPayment } from '../types/Payment';

class Payment {
  async initiatePayment(bookingId: string): Promise<IPayment> {
    const res = await axios.post(
      `/api/sn/api/lahza/initiate/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data as IPayment;
  }
}

const payment = new Payment();
export default payment;
