import axios from 'axios';
import { Booking, IBooking } from '../types/Student';
import { getToken } from './token';

class Student {
  async bookProperty(booking: IBooking) {
    const res = await axios.post(`/api/sn/api/bookings`, booking, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.status;
  }

  async getMyBookings() {
    const res = await axios.get(`/api/sn/api/bookings/me`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.data as Booking[];
  }

  async cancelBooking(bookingId: string) {
    const res = await axios.delete(`/api/sn/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.status === 200; // OK
  }
}

const student = new Student();
export default student;
