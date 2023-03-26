import axiosConfig from "./axiosConfig";

export const cartApi = {
	getAll: (userName: any) =>
		axiosConfig.get(`/get-all-cart?userName=${userName}`),
	create: (body: any) => axiosConfig.post("/add-to-cart", body),
	delete: (body: any) => axiosConfig.delete("/remove-from-cart", body),
};
