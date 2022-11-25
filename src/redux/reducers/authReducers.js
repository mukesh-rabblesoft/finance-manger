import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_AUTH_MSG,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    FORGOT_SUCCESS,
    FORGOT_FAIL,
    QRCODEIMAGE,
    SET_TOKEN
} from "../types";

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    msg: null,
    credentials: null,
    two_factor_authentication:false,
    twoFactoDetails:null,
    qrcodeImage:null,
    setToken : null
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                //credentials: action.payload.credentials,
                twoFactoDetails:action.payload.result,
                isAuthenticated: true,
                msg: "Logged in",
               
            };
        case LOGIN_FAIL:
            return{
                ...state,
                msg: action.payload.invalid,
                two_factor_authentication:action.payload.two_factor_authentication,
                twoFactoDetails:null,
                user:action.payload.user,
                 isAuthenticated: true,
                 token:action.payload.token,
            }
          case QRCODEIMAGE:
              return {
                  ...state,
                  qrcodeImage:action.payload.qrcode
              }
        case SET_TOKEN:{
            return{
                ...state,
                setToken:action.payload
            }
        }
        case REGISTER_FAIL:
        case REGISTER_SUCCESS:
        case ACTIVATE_SUCCESS:
        case ACTIVATE_FAIL:
        case FORGOT_SUCCESS:
        case FORGOT_FAIL:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                msg: action.payload,
                credentials: null,
            };
        case CLEAR_AUTH_MSG:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                two_factor_authentication:false,
                msg: null,
                credentials: null,
            };
        default:
            return state;
    }
}