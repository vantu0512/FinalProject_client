import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import img from "../../asset/image/library.png";
import loginIcon from "../../asset/image/login.png";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { userAction } from "../../store/action/userAction";
import { toast } from "react-toastify";

export const SignIn = (): React.ReactElement => {
	const [loginForm] = Form.useForm();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const userAccessToken = useSelector(
		(state: RootState) => state.userReducer.accessToken,
	);
	useEffect(() => {
		userAccessToken && navigate("/");
	}, [userAccessToken]);

	const onFinish = async (values: any) => {
		try {
			console.log("ok: ", values);
			dispatch(
				userAction.signIn({
					email: "email@gmail.com",
					password: "password",
				}),
			);
			toast.success("Welcome admin!");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Row style={{ height: "100vh" }}>
			<Col span={12} style={{ background: "gray" }}>
				<img
					src={img}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			</Col>
			<Col span={12}>
				<div
					className="formLogin"
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<img
						src={loginIcon}
						style={{
							width: 80,
							height: 80,
							objectFit: "cover",
							marginBottom: 24,
						}}
					/>
					<h2 style={{ margin: 24, fontSize: 32 }}>Sign in</h2>
					<Form
						onFinish={onFinish}
						layout="vertical"
						style={{ width: "60%" }}
						form={loginForm}
					>
						<Form.Item
							label="Username"
							name="userName"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}
						>
							<Input size="large" />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password size="large" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: "100%", marginTop: 32 }}
								size="large"
							>
								Sign in
							</Button>
						</Form.Item>
						<span
							style={{
								color: "green",
								fontSize: 14,
								cursor: "pointer",
							}}
							onClick={() => {
								navigate("/sign-up");
							}}
						>
							Sign up here!
						</span>
					</Form>
				</div>
			</Col>
		</Row>
	);
};
