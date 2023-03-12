import { CategoryType } from "../type/type";
import axiosConfig from "./axiosConfig";

export const categoryApi = {
	getAll: () => axiosConfig.get("/get-all-category"),
	create: (body: CategoryType) => axiosConfig.post(`/add-category`, body),
	update: (body: CategoryType) => axiosConfig.put(`/update-category`, body),
	delete: (id: string) => axiosConfig.delete(`/delete-category/${id}`),
};
