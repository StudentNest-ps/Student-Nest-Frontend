import Cookies from 'js-cookie';
import axios from 'axios';
import { Property } from '../types/Admin';
import { getToken } from './token';
class Owner {
  ownerId = Cookies.get('user-id');

  async addProperty(property: Property | null) {
    const res = await axios.post(
      `/api/sn/api/owner/${this.ownerId}/properties`,
      property,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    console.log(res.data);
    return res.status === 201;
  }

  async getPropertiesByOwnerId() {
    const res = await axios.get(
      `/api/sn/api/owner/${this.ownerId}/properties`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    console.log(res.data);
    return res.data as Property[];
  }

  async editProperty(property: Property) {
    const res = await axios.put(
      `/api/sn/api/owner/${this.ownerId}/properties/${property._id}`,
      property,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    console.log(res.data);
  }

  async deleteProperty(propertyId: string) {
    console.log(propertyId);
    console.log(this.ownerId);

    const res = await axios.delete(
      `/api/sn/api/owner/${this.ownerId}/properties/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    console.log(res.data);
    return res.status === 200;
  }

  async getBookings() {
    const res = await axios.get(`/api/sn/api/bookings/owner`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    console.log(res.data);
    return res.data; // Add this line to return the data
  }

  async approveBooking(bookingId: string) {
    const res = await axios.patch(
      `/api/sn/api/bookings/${bookingId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return res.status === 200;
  }

  async rejectBooking(bookingId: string) {
    const res = await axios.patch(
      `/api/sn/api/bookings/${bookingId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return res.status === 200;
  }
}

const owner = new Owner();
export default owner;
