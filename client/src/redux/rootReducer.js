import { combineReducers } from 'redux';

import authReducer from "../modules/auth/reducer";

// Combine all the reducers
const rootReducer = combineReducers({authReducer});

export default rootReducer;
