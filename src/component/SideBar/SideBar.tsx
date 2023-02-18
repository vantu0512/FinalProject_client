import {
	HomeOutlined,
	ShoppingCartOutlined,
	FundOutlined,
	UserOutlined,
	SolutionOutlined,
	LogoutOutlined,
	ProfileOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/action/userAction";
import { commonAction } from "../../store/action/commonAction";

function getItem(label: string, key: string, icon?: any, children?: any) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items: any = [
	getItem("Trang chủ", "0", <HomeOutlined />),
	getItem("Thống kê", "1", <FundOutlined />),
	getItem("Quản lý đơn đặt hàng", "2", <ShoppingCartOutlined />),
	getItem("Quản lý nhân viên", "3", <UserOutlined />),
	getItem("Quản lý khách hàng", "4", <TeamOutlined />),
	getItem("Quản lý nhà cung cấp", "5", <SolutionOutlined />),
	getItem("Quản lý sản phẩm", "6", <ProfileOutlined />),
	getItem("Quản lý khuyễn mãi", "7", <ProfileOutlined />),
];

type ArrTabsType = {
	key: number;
	tabName: string;
	url: string;
};

const arrTabs: ArrTabsType[] = [
	{
		key: 0,
		tabName: "Trang chủ",
		url: "/",
	},
	{
		key: 1,
		tabName: "Thống kê",
		url: "/statistical",
	},
	{
		key: 2,
		tabName: "Quản lý đơn đặt hàng",
		url: "/manage-order",
	},
	{
		key: 3,
		tabName: "Quản lý nhân viên",
		url: "/manage-staff",
	},
	{
		key: 4,
		tabName: "Quản lý khách hàng",
		url: "/manage-client",
	},
	{
		key: 5,
		tabName: "Quản lý nhà cung cấp",
		url: "/manage-supplier",
	},
	{
		key: 6,
		tabName: "Quản lý sản phẩm",
		url: "/manage-product",
	},

	{
		key: 7,
		tabName: "Quản lý khuyến mãi",
		url: "/manage-promotion",
	},
];

export const SideBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch: AppDispatch = useDispatch();
	const email = useSelector((state: RootState) => state.userReducer.email);

	const selectedKey = useMemo(() => {
		const item = arrTabs.find((item) => {
			return item.url === location.pathname;
		});
		dispatch(
			commonAction.changeTab({
				key: item?.key,
				name: item?.tabName,
			}),
		);
		return item?.key ?? 0;
	}, [location.pathname]);

	const handleNavigate = (key: any) => {
		arrTabs.forEach((item) => {
			if (Number(key) === item.key) {
				navigate(item.url);
			}
		});
	};

	const handleSignOut = async () => {
		try {
			await dispatch(userAction.signOut());
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Layout.Sider>
			<div className="sidebar_logo">
				<img
					src="data:image/jpeg;base64,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"
					alt=""
				/>
			</div>
			<Menu
				theme="dark"
				mode="inline"
				items={items}
				onClick={(value) => {
					handleNavigate(value?.key);
				}}
				selectedKeys={[selectedKey.toString()]}
			/>
			<div className="sidebar_login-logout">
				<div className="user-infor">
					<img
						src="data:image/jpeg;base64,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"
						alt=""
						className="avatar"
					/>
					<div className="infor">
						<label>Admin</label>
						<label>{email}</label>
					</div>
				</div>
				<div className="logout-icon">
					<LogoutOutlined
						style={{
							color: "white",
							fontSize: 20,
							cursor: "pointer",
						}}
						onClick={() => {
							handleSignOut();
						}}
					/>
				</div>
			</div>
		</Layout.Sider>
	);
};
