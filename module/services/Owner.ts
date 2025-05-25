import axios from 'axios';
import { token } from './token';
import { Property } from '../types/Admin';
import Cookies from 'js-cookie';
class Owner {
  ownerId = Cookies.get('user-id');

  async addProperty(property: Property | null) {
    const res = await axios.post(
      `/api/sn/api/owner/${this.ownerId}/properties`,
      property,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    return res.status === 200;
  }
}

const owner = new Owner();
export default owner;
