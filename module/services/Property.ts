import axios from 'axios';

import { Property as IProperty } from '../types/Admin';
import { getToken } from './token';
class Property {
  async getPropertyById(propertyId: string) {
    const res = await axios.get(`/api/sn/api/properties/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(res.data);

    return res.data as IProperty;
  }
}

const property = new Property();

export default property;
