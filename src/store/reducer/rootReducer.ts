import { combineReducers } from "redux";
import { cartReducer, CartReducer } from "./cartReducer";
import { commonReducer, CommonReducer } from "./commonReducer";
import { userReducer, UserReducer } from "./userReducer";

export type RootReducer = {
	userReducer: UserReducer;
	cartReducer: CartReducer;
	commonReducer: CommonReducer;
};
export const rootReducer = combineReducers({
	userReducer,
	cartReducer,
	commonReducer,
});
