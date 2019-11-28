export const NAME = 'auth';

//API URL
export const API_URL = '/api';

//Redux Action Types
export const LOGGED_IN = `${NAME}/LOGGED_IN`;
export const LOGGED_OUT = `${NAME}/LOGGED_OUT`;
export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";


//PRODUCTS
export const PRODUCTS_AVAILABLE = 'PRODUCTS_AVAILABLE';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const PRODUCT = `${API_URL}/product`;



//API End Points
export const REGISTER = `${API_URL}/auth/register`;
export const LOGIN = `${API_URL}/auth/login`;
export const FORGOT_PASSWORD = `${API_URL}/auth/forgot`;

export const TOKEN_KEY = '@token';
export const USER_KEY = '@user';