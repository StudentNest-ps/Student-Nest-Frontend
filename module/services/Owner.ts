import axios from 'axios';
import { token } from './token';
import { Property } from '../types/Admin';

class Owner {
  //TODO: create the requests for the owner here
  async addProperty(property: Property | null) {
    const res = await axios.post(
      `/api/sn/api/owner/68080ab403dbd8d02fca6876/properties`,
      property,
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
