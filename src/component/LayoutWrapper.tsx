import { Layout } from "antd";
import { SideBar } from "./SideBar/SideBar";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const LayoutWrapper = () => {
	const userAccessToken = useSelector(
		(state: RootState) => state.userReducer.accessToken,
	);
	return (
		<>
			<Layout
				style={{
					height: "100vh",
				}}
				className="layoutWrapperComponent"
			>
				<ToastContainer />
				{userAccessToken && <SideBar />}
				<Layout className="site-layout">
					{userAccessToken && <Header />}
					<Content />
				</Layout>
			</Layout>
		</>
	);
};
export default LayoutWrapper;
