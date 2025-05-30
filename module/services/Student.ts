import axios from 'axios';
import { IBooking } from '../types/Student';
import { token } from './token';

class Student {
  async bookProperty(booking: IBooking) {
    const res = await axios.post(`/api/sn/api/bookings`, booking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status === 201; // Created
  }
}

const student = new Student();
export default student;
