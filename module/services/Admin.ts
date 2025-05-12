import axios from 'axios';
import { Role } from '../@types';
import { token } from './token';

class Admin {
  async getUsersByRole(role: Role) {
    const res = await axios.get(`/api/sn/api/admin/users/role/${role}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  }
}
const admin = new Admin();
export default admin;
