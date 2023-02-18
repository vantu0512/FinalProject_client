import { actionType } from "../action/actionType";

export type CommonReducer = {
	curentTab?: string;
	currentTabKey?: number;
};

const initialState: CommonReducer = {
	currentTabKey: 1,
	curentTab: "Thống kê",
};

export const commonReducer = (
	state: CommonReducer = initialState,
	action: any,
) => {
	switch (action.type) {
		case actionType.CHANGE_TAB:
			return {
				...state,
				currentTabKey: action.payload.key,
				curentTab: action.payload.name,
			};
		default:
			return state;
	}
};
