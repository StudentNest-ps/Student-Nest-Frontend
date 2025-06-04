import axios from 'axios';
import { User, IRegisterUser, UserResponse } from '../@types';
import { token } from './token';
import { UserProfile } from '@/context/Auth';

class Auth {
  async registerUser(user: IRegisterUser) {
    const res = await axios.post(`api/sn/api/signup`, user);

    if (res.status === 201) {
      return true;
    }
    return false;
  }

  async loginUser(user: User) {
    const res = await axios.post(`api/sn/api/login`, user);

    if (res.status === 200) {
      return { status: true, data: res.data as UserResponse };
    }
    return { status: false };
  }

  async getUserProfile() {
    const res = await axios.get(`api/sn/api/general/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data as UserProfile;
  }

  async getUserInformation(userToken: string) {
    const res = await axios.get(`api/sn/api/general/me`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return res.data as UserProfile;
  }
}

const auth = new Auth();
export default auth;
