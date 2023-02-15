import { Home } from "../pages/HomePage/HomePage";
import { ManageProduct } from "../pages/ManageProduct/ManageProduct";

export const pathConfig = [
	{
		url: "/home",
		element: <Home />,
		isPrivateRoute: true,
	},
	{
		url: "/manage-product",
		element: <ManageProduct />,
		isPrivateRoute: true,
	},
];
