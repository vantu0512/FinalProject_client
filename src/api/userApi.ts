import { TokenType, UserType } from "../type/type";
import axiosConfig from "./axiosConfig";

export const userApi = {
	signUp: (body: UserType) => axiosConfig.post("/sign-up", body),
	signIn: (body: UserType) => axiosConfig.post("/sign-in", body),
	refreshToken: (body: TokenType) => axiosConfig.post("/refresh-token", body),
	signOut: (body: UserType) => axiosConfig.post("/sign-out", body),
	create: (body: UserType) => axiosConfig.post("/create-new-user", body),
	update: (body: UserType) => axiosConfig.put("/update-user", body),
	delete: (id: string) => axiosConfig.delete(`/delete-user/${id}`),
	getAllUser: () => axiosConfig.get("/get-all-user"),
};
