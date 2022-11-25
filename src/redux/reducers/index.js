import { combineReducers } from "redux";
import budgetReducers from "./budgetReducers";
import authReducers from "./authReducers";
import LocalStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage: LocalStorage,
  blacklist: ["budget"],
};
const rootReducer =  combineReducers({
  auth: persistReducer(authPersistConfig, authReducers),
  budget: budgetReducers,
});

export default rootReducer;