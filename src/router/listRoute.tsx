import { Component403 } from "../component/Component403/Component403";
import { ManageCategory } from "../pages/ManageCategory/ManageCategory";
import { Home } from "../pages/Home/Home";
import { ManageAccessRight } from "../pages/ManageAccessRight/ManageAccessRight";
import { ManageAccount } from "../pages/ManageAccount/ManageAccount";
import { ManageOrder } from "../pages/ManageOrder/ManageOrder";
import { ManageProduct } from "../pages/ManageProduct/ManageProduct";
import { Product } from "../pages/Product/Product";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { ManageNews } from "../pages/ManageNew/ManageNews";
import { ManagePage } from "../pages/ManagePage/ManagePage";

export const adminRoute = [
	{
		url: "/manage-account",
		element: <ManageAccount />,
	},
	{
		url: "/manage-accessRight",
		element: <ManageAccessRight />,
	},
	{
		url: "/manage-product",
		element: <ManageProduct />,
	},
	{
		url: "/manage-category",
		element: <ManageCategory />,
	},
	{
		url: "/manage-order",
		element: <ManageOrder />,
	},
	{
		url: "/manage-news",
		element: <ManageNews />,
	},
	{
		url: "/manage-page",
		element: <ManagePage />,
	},
];

export const userRoute = [
	{
		url: "/user",
		element: <ManageCategory />,
	},
];

export const publicRoute = [
	{
		url: "/",
		element: <Home />,
	},
	{
		url: "/product",
		element: <Product />,
	},
	{
		url: "/sign-in",
		element: <SignIn />,
	},
	{
		url: "/sign-up",
		element: <SignUp />,
	},
	{
		url: "/component403",
		element: <Component403 />,
	},
];
