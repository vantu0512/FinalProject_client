import { Layout } from "antd";
// import { useSelector } from "react-redux";
import { Router } from "../../router/router";

export const Content = () => {
	// const userAccessToken = useSelector((state) => state.userReducer.accessToken);
	const userAccessToken = "hello";

	return (
		<Layout.Content
			style={{
				margin: userAccessToken ? "0 24px" : "0px",
			}}
		>
			<Router />
		</Layout.Content>
	);
};
