import { actionType } from "../action/actionType";

export type UserReducer = {
	email: string;
	accessToken: string;
	role: string;
};

const initialState: UserReducer = {
	email: "condb@gmail.com",
	accessToken: "accessToken",
	role: "admin",
};

export const userReducer = (state: UserReducer = initialState, action: any) => {
	switch (action.type) {
		case actionType.LOGIN_SUCCESS:
			return {
				...state,
				email: action.payload.email,
				accessToken: action.payload.accessToken,
			};
		case actionType.LOG_OUT:
			return {
				...state,
				email: "",
				accessToken: "",
			};

		default:
			return state;
	}
};
