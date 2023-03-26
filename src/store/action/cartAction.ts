import { userProductApi } from "../../api/userProductApi";
import { CartType } from "../../type/type";
import { RootState, AppDispatch } from "../store";
import { actionType } from "./actionType";

const getAllCart = (email: string) => {
	return async (dispatch: AppDispatch) => {
		const res = await userProductApi.getAll(email);

		const arrData = res?.data?.data;
		const arrProduct: CartType[] = arrData.map((product: any) => {
			return {
				productId: product?.productId?._id,
				quantity: product?.quantity,
				price: product?.productId?.price,
				imgUrl: product.productId?.imgUrl,
				productName: product.productId?.productName,
			};
		});
		await dispatch({
			type: actionType.GET_ALL_CART,
			payload: arrProduct,
		});
	};
};

const addToCart = (data: CartType) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		await userProductApi.addToCart(data);
		let arr: CartType[] = [...getState().cartReducer.arrProduct];
		let checkExist = false;
		arr.forEach((product: CartType) => {
			if (
				product.productId === data.productId &&
				product.quantity &&
				data.quantity
			) {
				checkExist = true;
				product.quantity += data.quantity;
			}
		});
		if (!checkExist) {
			arr = [...arr, data];
		}
		dispatch({
			type: actionType.ADD_TO_CART,
			payload: arr,
		});
	};
};

const removeFromCart = (data: CartType) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const params = {
			email: data.email,
			productId: data.productId,
		};
		await userProductApi.removeFromCart(params);
		const arr: CartType[] = getState().cartReducer.arrProduct;
		const newArr = arr.filter((item) => {
			return item.productId !== data.productId;
		});
		dispatch({
			type: actionType.REMOVE_FROM_CART,
			payload: newArr,
		});
	};
};

export const cartAction = {
	getAllCart,
	addToCart,
	removeFromCart,
};
