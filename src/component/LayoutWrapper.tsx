import { Layout, Menu, theme } from "antd";
import "../asset/style/LayoutWrapper.scss";
import {
	HomeOutlined,
	ShoppingCartOutlined,
	ShopOutlined,
	UserOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { SideBar } from "./SideBar/SideBar";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Router } from "../router/router";
import { userApi } from "../api/userApi";
import { toast } from "react-toastify";

const LayoutWrapper = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname.split("/")[1];
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const role = user.role;
	const userAccessToken = user.accessToken;
	const userRefreshToken = user.refreshToken;

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	type Menu = {
		key: number;
		label: React.ReactElement;
		url: string;
		children?: any;
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
			children: [
				{
					label: "Thông tin cá nhân",
					key: "personal",
				},
				{
					label: "Ảnh đại diện",
					key: "avatar",
				},
				{
					label: "Đổi mật khẩu",
					key: "change-password",
				},
			],
		},
		{
			key: 6,
			label: (
				<div>
					<LogoutOutlined />
					<span>{userAccessToken ? "Đăng xuất" : "Đăng nhập"}</span>
				</div>
			),
			url: "/sign-in",
		},
	];

	const handleNavigate = (key: number) => {
		menu.forEach(async (item) => {
			if (key == item.key) {
				if (item.key == 6) {
					if (userAccessToken) {
						try {
							const res = await userApi.signOut({
								refreshToken: userRefreshToken,
							});
							if (res) {
								localStorage.removeItem("user");
								navigate("/");
							}
						} catch (e: any) {
							console.log(e);
							toast.error(e.message);
						}
					} else navigate(item.url);
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
					<SideBar />
					<Layout className="site-layout">
						<Header />
						<Content />
					</Layout>
				</Layout>
			) : (
				<>
					<Layout className="layout layout-user">
						{currentPath !== "sign-in" &&
							currentPath !== "sign-up" && (
								<Layout.Header style={{ padding: "0 40px" }}>
									<div className="logo" />
									<Menu
										theme="light"
										mode="horizontal"
										defaultSelectedKeys={["1"]}
										items={menu.map((item) => item)}
										onClick={(value: any) =>
											handleNavigate(value.key)
										}
									/>
								</Layout.Header>
							)}
						<Layout.Content
							style={{
								marginTop: currentPath !== "sign-in" ? 64 : 0,
								padding:
									currentPath !== "sign-in"
										? "0 40px"
										: "0px",
								backgroundColor: "#FFFFFF",
							}}
						>
							<div
								className="site-layout-content"
								style={{ background: colorBgContainer }}
							>
								<Router />
							</div>
						</Layout.Content>
						{currentPath !== "sign-in" &&
							currentPath !== "sign-up" && (
								<Layout.Footer
									style={{
										textAlign: "center",
										color: "red",
									}}
								>
									Foot ware ©2023 Created by Vantu0512
								</Layout.Footer>
							)}
					</Layout>
				</>
			)}
		</>
	);
};
export default LayoutWrapper;
