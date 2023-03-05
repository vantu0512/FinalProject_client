import { AppDispatch, RootState } from "../store";
import { actionType } from "./actionType";
import { UserType } from "../../type/type";
import { userApi } from "../../api/userApi";
import { toast } from "react-toastify";

const signUp = (userInfor: UserType) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const res = await userApi.signUp(userInfor);
		if (res?.data?.accessToken) toast.success(res.data.errMessage);
		dispatch({
			type: actionType.SIGN_IN_SUCCESS,
			payload: res.data,
		});
	};
};

const signIn = (userInfor: UserType) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const res = await userApi.signIn(userInfor);
		if (res?.data?.accessToken) toast.success(res.data.errMessage);
		dispatch({
			type: actionType.SIGN_IN_SUCCESS,
			payload: res.data,
		});
	};
};

const signOut = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch({
			type: actionType.LOG_OUT,
		});
	};
};

export const userAction = {
	signUp,
	signIn,
	signOut,
};
