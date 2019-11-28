import axios from "axios";

import * as c from '../config/constants';

export async function register(data){
    try{
        let res = await axios.post(c.REGISTER, data);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function login(data){
    try{
        let res = await axios.post(c.LOGIN, data);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function forgotPassword(email){
    try{
        let res = await axios.post(c.FORGOT_PASSWORD, {email});

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}


//
// import {setAuthToken} from "../pages/auth/utils";
//
// export default class Auth {
//
//     user = {};
//
//     login = async (data) => {
//         try{
//             let res = await axios.post(c.LOGIN, data);
//
//             return res.data;
//         }catch (e) {
//             return e;
//         }
//     };
//
//     logout = () => {
//         localStorage.removeItem(c.USER_KEY)
//         localStorage.removeItem(c.TOKEN_KEY)
//     };
//
//     handleAuth = (authResult) => {
//         let {token, user} = authResult;
//
//         this.user = user;
//
//         localStorage.setItem(c.USER_KEY, JSON.stringify(user));
//         localStorage.setItem(c.TOKEN_KEY, JSON.stringify(token));
//
//         setAuthToken(token); // Set token to Auth header
//     };
//
//     isLoggedIn = () => {
//         return localStorage.getItem(c.TOKEN_KEY)
//     };
// }