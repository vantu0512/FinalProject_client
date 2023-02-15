import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
// import { useSelector } from "react-redux";
import { pathConfig } from "./path";

const AuthWrapper = () => {
	const userAccessToken = "123";
	if (userAccessToken) {
		return <Outlet />;
	}
	return <Navigate to={"/sign-in"} replace />;
};

export const Router = () => {
	return (
		<>
			<Routes>
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route element={<AuthWrapper />}>
					{pathConfig.map((item) => {
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
