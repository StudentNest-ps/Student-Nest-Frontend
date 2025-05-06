import axios from "axios"
import { ILoginUser, IRegisterUser } from "../@types"

class Auth {
    async registerUser(user: IRegisterUser) {
        const res = await axios.post(`api/sn/api/signup`,user)

        if(res.status === 201) {
            return true
        }
        return false;
    }

    async loginUser(user: ILoginUser) {
        const res = await axios.post(`api/sn/api/login`,user)

        if(res.status === 200) {
            return {status: true, data: res.data}
        }
        return {status: false};
    }
}


const auth = new Auth();
export default auth;
