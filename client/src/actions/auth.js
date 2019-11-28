import * as c from "../config/constants";

export const setLoggedIn = ({token, user}) => ({
    type: c.LOGGED_IN,
    user
});

export const setLoggedOut = () => ({
    type: c.LOGGED_OUT
});