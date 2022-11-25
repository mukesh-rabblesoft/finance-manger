import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  ACTIVATE_FAIL,
  ACTIVATE_SUCCESS,
  FORGOT_SUCCESS,
  FORGOT_FAIL,
} from "../types";

import urls from "../urls";

export const login = (credentials) => async (dispatch) => {
  fetch(`${urls.base + urls.login}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " +
        btoa(`${credentials.username}:${credentials.password}`),
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.two_factor_authentication === false) {
        fetch(`${urls.base + urls.profile}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: result.token,
          },
        })  
          .then((profile) => profile.json())
          .then((user) => {
            let data = {
              token: result.token,
              user: user,
              credentials: credentials,
            };
            dispatch({
              type: LOGIN_SUCCESS,
              payload: data,
            });
          });
      } else {
        let factorAuth={
          invalid : "Invalid Login details",
          two_factor_authentication: result.two_factor_authentication,
          user:result.user
        }
        dispatch({
          type: LOGIN_FAIL,
          payload: factorAuth,
        });
      }
    })
    .catch((e) => console.log(e));
};

// Logout User
export const logout = () => {
  console.log("logout");
  localStorage.removeItem('persist:auth')
  return {
    type: LOGOUT_SUCCESS,
    payload: "Logged out",
  };
};

// Clear auth
export const clearAuthMsg = () => async (dispatch) => {
  console.log("CLEARING AUTH MSG")
  dispatch({
    type: CLEAR_AUTH_MSG,
  });
};

export const forgotPassword = (data) => (dispatch) => {
  fetch(`${urls.base + urls.forgotPassword}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
  .then((result) => {
    if(result.message==='Reset link has been sent succesfully'){
      dispatch({
        type: FORGOT_SUCCESS,
        payload: "Reset link has been sent succesfully",
      });
    } else {
      dispatch({
        type: FORGOT_FAIL,
        payload: result.description,
      });
    }
  })
  .catch((e) => console.log(e));
};

export const register = (data) => async (dispatch) => {
  //console.log(data);
  fetch(`${urls.base + urls.register}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify( data ),
  })
    .then((res) => res.json())
    .then((result) => {
      //console.log(result)
      const response = result.username
        ? { 0: result.username[0] }
        : { ...result[0] };
      if (
        response[0] === "Email already exist, please choose another one!" ||
        response[0] === "A user with that username already exists."
      ) {
        dispatch({
          type: REGISTER_FAIL,
          payload: response[0],
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: "Register success",
        });
      }
    })
    .catch((e) => console.log(e));
};

export const activate = (data) => async (dispatch) => {
  //console.log(data);
  fetch(`${urls.base + urls.activate}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify( data ),
  })
    .then((res) => res.json())
    .then((result) => {
      //console.log(result)
      if(result.message==='Account activated successfully'){
        dispatch({
          type: ACTIVATE_SUCCESS,
          payload: "Account activated successfully",
        });
      } else {
        dispatch({
          type: ACTIVATE_FAIL,
          payload: result.description,
        });
      }
    })
    .catch((e) => console.log(e));
};

export const resetPassword = (data) => async (dispatch) => {
  //console.log(data);
  fetch(`${urls.base + urls.resetPassword}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      //console.log(result)
      if(result.message==='Password changed successfully'){
        dispatch({
          type: ACTIVATE_SUCCESS,
          payload: "Password changed successfully",
        });
      } else {
        dispatch({
          type: ACTIVATE_FAIL,
          payload: result.description,
        });
      }
    })
    .catch((e) => console.log(e));
};


// export const activateTwoFactUser=(value)=> async (dispatch)=>{
//     fetch(`${urls.base + urls.twoFactActive}`,{
//       method: "POST",
//       headers:{
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(value)
//     }).then((res)=> res.json())
//     .then((result)=>{
//       if(result){
//         dispatch({
//           type:ACTIVATE_TOWFACTOR,
//           payload:result
//         })
//       }
      
//     })
//     .catch((e)=>{
//       console.log(e)
//     })
// }





//  export const veriFication = (data) => async (dispatch) => {
//    console.log(data);

//      fetch(`${urls.base + urls.verificationCode}`, {
//        method: "POST",
//        headers: {
//          Accept: "application/json",
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify(data),
//      })
//        .then((res) => res.json())
//        .then((result) => {       
//            if(result){
//              fetch(`${urls.base + urls.profile}`, {
//                method: "GET",
//                headers: {
//                  Accept: "application/json",
//                  "Content-Type": "application/json",
//                 // Authorization: result.token,
//                },
//              })
//                .then((profile) => profile.json())
//                .then((user) => {
//                  console.log("user====>",user);
//                  let data = {
//                    token: result.token,
//                    user: user,
//                    credentials: data,
//                  };
//                  dispatch({
//                    type: VERIFICATION_SUCCESS,
//                    payload: data,
//                  });
//                });
//            }
//            else{
//              dispatch({
//                type :VERIFICATION_FAIL,
//                payload: "verification code is not valid"
//              })
//            }
        
//        }).catch((e)=>{
//         console.log(e)
//        })
   
//  };


 
//  export const qrCodegenrater = (data) => async (dispatch) => {
  
//   fetch(`${urls.base + urls.QrCode}?id=${data}`)
//   .then((result)=> result.json()).then((qrdata)=>{
//     console.log("qrdata",qrdata)
//     if(qrdata){

//       dispatch({
//         type:QRCODEIMAGE,
//         payload:qrdata
//       })
//     }
//   }).catch((error)=>{
//     console.log(error)
//   })

// };


 