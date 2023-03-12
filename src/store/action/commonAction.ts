import { AppDispatch } from "../store";
import { actionType } from "./actionType";

const changeTab = (data: { key?: number; name?: string }) => {
	return (dispatch: AppDispatch) => {
		dispatch({
			type: actionType.CHANGE_TAB,
			payload: data,
		});
	};
};

export const commonAction = {
	changeTab,
};
