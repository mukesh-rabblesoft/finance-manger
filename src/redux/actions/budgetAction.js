import {
    GET_BUDGET,
    GET_DEBT,
    GET_STOCKS,
    GET_INTRINSIC_STOCKS,
    GET_DATA_BANKS,
    GET_SCREENERS,
    GET_WATCH_LIST,
    GET_BANKS,
    REMOVE_BUDGET,
    REMOVE_BANK,
    GET_PORTFOLIO,
    GET_STOCKS_LIST,
    GET_DIVIDEND_STOCKS,
    LOGOUT_SUCCESS
} from "../types";

import urls from "../urls";

export const getBudget = (user, name = null) => async (dispatch) => {


    console.log("user",user)
    await fetch(`${urls.base + urls.budgets}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.auth.token ? user.auth.token : user.setToken.token,
        },
    }).then((res) => res.json())
        .then((result) => {
            if (result.message) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: "Logged out",
                });
            } else {
                dispatch({
                    type: GET_BUDGET,
                    payload: result,
                });
            }
        }).catch((e)=>{
            console.log(e)
        })
};