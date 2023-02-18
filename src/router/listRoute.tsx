import { Component403 } from "../component/Component403/Component403";
import { Home } from "../pages/Home/Home";
import { ManageClient } from "../pages/ManageClient/ManageClient";
import { ManageOrder } from "../pages/ManageOrder/ManageOrder";
import { ManageProduct } from "../pages/ManageProduct/ManageProduct";
import { ManagePromotion } from "../pages/ManagePromotion/ManagePromotion";
import { ManageStaff } from "../pages/ManageStaff/ManageStaff";
import { ManageSupplier } from "../pages/ManageSupplier/ManageSupplier";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { StatisticalPage } from "../pages/StatisticalPage/StatisticalPage";

export const adminRoute = [
	{
		url: "/statistical",
		element: <StatisticalPage />,
	},
	{
		url: "/manage-order",
		element: <ManageOrder />,
	},
	{
		url: "/manage-staff",
		element: <ManageStaff />,
	},
	{
		url: "/manage-client",
		element: <ManageClient />,
	},
	{
		url: "/manage-supplier",
		element: <ManageSupplier />,
	},

	{
		url: "/manage-promotion",
		element: <ManagePromotion />,
	},
	{
		url: "/manage-product",
		element: <ManageProduct />,
	},
];

export const userRoute = [
	{
		url: "/user",
		element: <>user route</>,
	},
];

export const publicRoute = [
	{
		url: "/",
		element: <Home />,
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
