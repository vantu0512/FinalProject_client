import { actionType } from "../action/actionType";

export type UserReducer = {
	email: string;
	accessToken: string;
	role: string;
};

const initialState: UserReducer = {
	email: "",
	accessToken: "",
	role: "",
};

export const userReducer = (state: UserReducer = initialState, action: any) => {
	switch (action.type) {
		case actionType.SIGN_UP_SUCCESS:
			return {
				...state,
				email: action.payload.email,
				accessToken: action.payload.accessToken,
				role: action.payload.role,
			};
		case actionType.SIGN_IN_SUCCESS:
			return {
				...state,
				email: action.payload.email,
				accessToken: action.payload.accessToken,
				role: action.payload.role,
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
