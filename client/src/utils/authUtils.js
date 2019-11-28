import React from 'react';
import axios from "axios";

import * as c from "../config/constants";
import {setLoggedIn, setLoggedOut} from "../actions/auth";

export function setTokens(data = null, dispatch){
    if (data){
        let {token, user} =  data;

        localStorage.setItem(c.USER_KEY, JSON.stringify(user));
        localStorage.setItem(c.TOKEN_KEY, JSON.stringify(token));

        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        dispatch(setLoggedIn(data));

    }else{
        localStorage.removeItem(c.USER_KEY)
        localStorage.removeItem(c.TOKEN_KEY)

        //Delete authorization token
        delete axios.defaults.headers.common["Authorization"];// Delete auth header

        dispatch(setLoggedOut(data));
    }
}

