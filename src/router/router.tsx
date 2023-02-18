import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { adminRoute, publicRoute } from "./listRoute";

const AuthWrapper = () => {
	const userAccessToken = useSelector(
		(state: RootState) => state.userReducer.accessToken,
	);
	if (userAccessToken) {
		return <Outlet />;
	}
	return <Navigate to={"/sign-in"} replace />;
};

const AdminRoleWrapper = () => {
	const role = useSelector((state: RootState) => state.userReducer.role);
	if (role === "admin") {
		return <Outlet />;
	}
	return <Navigate to={"/403Component"} replace />;
};

export const Router = () => {
	return (
		<>
			<Routes>
				{publicRoute.map((item) => {
					return (
						<Route
							path={item.url}
							element={item.element}
							key={item.url}
						/>
					);
				})}
				<Route element={<AuthWrapper />}>
					<Route element={<AdminRoleWrapper />}>
						{adminRoute.map((item) => {
							return (
								<Route
									path={item.url}
									element={item.element}
									key={item.url}
								/>
							);
						})}
					</Route>
				</Route>
			</Routes>
		</>
	);
};
