import axios from 'axios';
import { Role } from '../@types';
import { token } from './token';
import { Property, User } from '../types/Admin';

class Admin {
  async getUsersByRole(role: Role) {
    const res = await axios.get(`/api/sn/api/admin/users/role/${role}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    return res.data as User[];
  }

  async deleteUser(userId: string) {
    const res = await axios.delete(`/api/sn/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);

    return res.status === 200;
  }

  async getProperties(): Promise<Property[]> {
    console.log(token);
    const res = await axios.get(`/api/sn/api/admin/properties`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data as Property[];
  }

  async deleteProperty(propertyId: string) {
    const res = await axios.delete(
      `/api/sn/api/admin/properties/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status === 200;
  }
}

const admin = new Admin();
export default admin;
