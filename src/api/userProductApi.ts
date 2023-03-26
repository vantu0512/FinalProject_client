import { CartType } from "../type/type";
import axiosConfig from "./axiosConfig";

export const userProductApi = {
	getAll: (email: string) => axiosConfig.get(`/get-all-cart?email=${email}`),
	addToCart: (body: CartType) => axiosConfig.post("/add-to-cart", body),
	removeFromCart: (params: any) =>
		axiosConfig.delete("/remove-from-cart", { params }),
};
