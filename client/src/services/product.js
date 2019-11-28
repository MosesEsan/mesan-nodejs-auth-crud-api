import axios from "axios";

import * as c from '../config/constants';

export async function addProduct(data){
    try{
        let res = await axios.post(c.PRODUCT, data);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function updateProduct(id, data){
    try{
        let res = await axios.post(`${c.PRODUCT}/id`, data);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function deleteProduct(id){
    try{
        let res = await axios.delete(`${c.PRODUCT}/id`);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}