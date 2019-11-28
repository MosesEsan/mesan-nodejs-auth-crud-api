import * as c from '../config/constants';

export const initialState = {
    isLoggedIn: false,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case c.LOGGED_IN: {
            let {user} = action;

            return {...state, isLoggedIn: true, user};
        }

        case c.LOGGED_OUT: {
            return {...state, ...initialState};
        }

        default:
            return state;
    }
};

export default authReducer;