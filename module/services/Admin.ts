import axios from 'axios';
import { Role } from '../@types';
import { IRegisterUser, Property, User } from '../types/Admin';
import { getToken } from './token';

class Admin {
  async getUsersByRole(role: Role) {
    const res = await axios.get(`/api/sn/api/admin/users/role/${role}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    console.log(res.data);
    return res.data as User[];
  }

  async deleteUser(userId: string) {
    const res = await axios.delete(`/api/sn/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(res.data);

    return res.status === 200;
  }

  async getProperties(): Promise<Property[]> {
    const res = await axios.get(`/api/sn/api/admin/properties`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.data as Property[];
  }

  async deleteProperty(propertyId: string) {
    const res = await axios.delete(
      `/api/sn/api/admin/properties/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return res.status === 200;
  }

  async addAccount(values: IRegisterUser): Promise<boolean> {
    const res = await axios.post(`/api/sn/api/admin/users`, values, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    console.log(res.data);
    return res.status === 201;
  }
}

const admin = new Admin();
export default admin;
