import { Layout, Menu, theme } from "antd";
import "../asset/style/LayoutWrapper.scss";
import {
	HomeOutlined,
	ShoppingCartOutlined,
	ShopOutlined,
	FundOutlined,
	UserOutlined,
	// SolutionOutlined,
	LogoutOutlined,
	// ProfileOutlined,
	// TeamOutlined,
} from "@ant-design/icons";
import { SideBar } from "./SideBar/SideBar";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Router } from "../router/router";
import { userAction } from "../store/action/userAction";

const LayoutWrapper = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const userAccessToken = useSelector(
		(state: RootState) => state.userReducer.accessToken,
	);
	const role = useSelector((state: RootState) => state.userReducer.role);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	type Menu = {
		key: number;
		label: React.ReactElement;
		url: string;
	};

	const menu: Menu[] = [
		{
			key: 1,
			label: (
				<div>
					<HomeOutlined />
					<span>Trang chủ</span>
				</div>
			),
			url: "/",
		},
		{
			key: 2,
			label: (
				<div>
					<ShopOutlined />
					<span>Sản phẩm</span>
				</div>
			),
			url: "/product",
		},
		{
			key: 3,
			label: (
				<div>
					<FundOutlined />
					<span>Danh mục</span>
				</div>
			),
			url: "/category",
		},
		{
			key: 4,
			label: (
				<div>
					<ShoppingCartOutlined />
					<span>Giỏ hàng</span>
				</div>
			),
			url: "/cart",
		},
		{
			key: 5,
			label: (
				<div>
					<UserOutlined />
					<span>Tài khoản</span>
				</div>
			),
			url: "/account",
		},
		{
			key: 6,
			label: (
				<div>
					<LogoutOutlined />
					<span>{userAccessToken ? "Đăng xuất" : "Đăng nhập"}</span>
				</div>
			),
			url: userAccessToken ? "/" : "/sign-in",
		},
	];

	const handleNavigate = (key: number) => {
		menu.forEach((item) => {
			if (key == item.key) {
				if (item.key == 6) {
					if (userAccessToken) dispatch(userAction.signOut());
					else navigate(item.url);
				} else return navigate(item.url);
			}
		});
	};

	return (
		<>
			{userAccessToken && role === "admin" ? (
				<Layout
					style={{
						height: "100vh",
					}}
					className="layoutWrapperComponent"
				>
					<ToastContainer />
					<SideBar />
					<Layout className="site-layout">
						<Header />
						<Content />
					</Layout>
				</Layout>
			) : (
				<>
					<Layout className="layout layout-user">
						<Layout.Header style={{ padding: "0 40px" }}>
							<div className="logo" />
							<Menu
								theme="dark"
								mode="horizontal"
								defaultSelectedKeys={["1"]}
								items={menu.map((item) => item)}
								onClick={(value: any) =>
									handleNavigate(value.key)
								}
							/>
						</Layout.Header>
						<Layout.Content style={{ padding: "0 40px" }}>
							<div
								className="site-layout-content"
								style={{ background: colorBgContainer }}
							>
								<Router />
							</div>
						</Layout.Content>
						<Layout.Footer
							style={{ textAlign: "center", color: "red" }}
						>
							Foot ware ©2023 Created by Vantu0512
						</Layout.Footer>
					</Layout>
				</>
			)}
		</>
	);
};
export default LayoutWrapper;
