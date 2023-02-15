import { actionType } from "../action/actionType";

export type UserReducer = {
	email: string;
	accessToken: string;
};

const initialState: UserReducer = {
	email: "",
	accessToken: "",
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
