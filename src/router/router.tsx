import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { adminRoute, publicRoute, userRoute } from "./listRoute";

const AuthWrapper = () => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const userAccessToken = user.accessToken;
	if (userAccessToken) {
		return <Outlet />;
	}
	return <Navigate to={"/sign-in"} replace />;
};

const AdminRoleWrapper = () => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const role = user.role;
	if (role === "admin") {
		return <Outlet />;
	}
	return <Navigate to={"/component403"} replace />;
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
					{userRoute.map((item) => {
						return (
							<Route
								path={item.url}
								element={item.element}
								key={item.url}
							/>
						);
					})}
				</Route>
			</Routes>
		</>
	);
};
