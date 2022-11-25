import {
  GET_BUDGET,
  GET_DEBT,
  GET_STOCKS,
  GET_INTRINSIC_STOCKS,
  GET_DATA_BANKS,
  GET_SCREENERS,
  GET_WATCH_LIST,
  GET_BANKS,
  GET_PORTFOLIO,
  LOGOUT_SUCCESS,
  REMOVE_BUDGET,
  REMOVE_BANK,
  GET_STOCKS_LIST,
  GET_DIVIDEND_STOCKS,
} from "../types";

const initialState = {
  budget: null,
};

export default function (state = initialState, action) {
  console.log("budget",action)
  switch (action.type) {
    case GET_BUDGET:
      return {
        ...state,
        budget: action.payload,
      };
    case REMOVE_BUDGET:
      var updatedBudget = state.budget.filter((b) => b.id !== action.payload);
      console.log("Inside reducer", updatedBudget);
      return {
        ...state,
        budget: updatedBudget,
      };
    default:
      return state;
  }
}
