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
import { DetailProduct } from "../pages/Product/DetailProduct";
import { Cart } from "../pages/Cart/Cart";
import { PaymentSuccess } from "../pages/Payment/PaymentSuccess";
import { PaymentCancel } from "../pages/Payment/PaymentCancel";
import { News } from "../pages/News/News";
import { Page } from "../pages/Page/Page";
import { Contact } from "../pages/Contact/Contact";
import { MyInfor } from "../pages/MyInfor/MyInfor";

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
		url: "/cart",
		element: <Cart />,
	},
	{
		url: "/my-infor",
		element: <MyInfor />,
	},
	{
		url: "/payment-success/:orderId",
		element: <PaymentSuccess />,
	},
	{
		url: "/payment-cancel/:orderId",
		element: <PaymentCancel />,
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
		url: "/detail-product/:id",
		element: <DetailProduct />,
	},
	{
		url: "/news",
		element: <News />,
	},
	{
		url: "/page",
		element: <Page />,
	},
	{
		url: "/contact",
		element: <Contact />,
	},
	{
		url: "/sign-in",
		element: <SignIn />,
	},
	{
		url: "/sign-up",
		element: <SignUp />,
	},
];
