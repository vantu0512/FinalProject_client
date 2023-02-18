import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const Header = (): React.ReactElement => {
	const navigate = useNavigate();
	const curentTab = useSelector(
		(state: RootState) => state.commonReducer.curentTab,
	);
	return (
		<>
			<Layout.Header
				style={{
					padding: 0,
					display: "flex",
					alignItems: "center",
					background: "rgba(255, 255, 255, 0.2)",
					height: 60,
				}}
			>
				<Breadcrumb
					style={{
						margin: "0 16px",
					}}
				>
					<Breadcrumb.Item>
						<HomeOutlined
							style={{ color: "blue", fontSize: 20 }}
							onClick={() => navigate("/")}
						/>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<b>{curentTab}</b>
					</Breadcrumb.Item>
				</Breadcrumb>
			</Layout.Header>
		</>
	);
};
