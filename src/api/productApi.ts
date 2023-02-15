import { ProductType } from "../type/type";
import axiosConfig from "./axiosConfig";

export const productApi = {
  getAll: () => axiosConfig.get("/get-all-product"),
  update: (body: ProductType) => axiosConfig.put(`/update-product`, body),
  delete: (id: string) => axiosConfig.delete(`/delete-product/${id}`),
};
