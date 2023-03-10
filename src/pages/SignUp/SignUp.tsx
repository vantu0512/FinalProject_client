import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import img from "../../asset/image/library.png";
import loginIcon from "../../asset/image/login.png";
import { userApi } from "../../api/userApi";
import { useEffect } from "react";

export const SignUp = (): React.ReactElement => {
	const [loginForm] = Form.useForm();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const role = user.role;

	useEffect(() => {
		role && role === "user" && navigate("/");
		role && role === "admin" && navigate("/statistical");
	}, []);

	const onFinish = async (values: any) => {
		try {
			const res = await userApi.signUp({
				email: values.email,
				password: values.password,
			});
			if (res) {
				const data = {
					email: res.data.userInfor.email,
					role: res.data.userInfor.role,
					accessToken: res.data.accessToken,
					refreshToken: res.data.refreshToken,
				};
				localStorage.setItem("user", JSON.stringify(data));
				if (data.role === "user") navigate("/");
				if (data.role === "admin") navigate("/statistical");
			}
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
					<h2 style={{ margin: 24, fontSize: 32 }}>Sign up</h2>
					<Form
						onFinish={onFinish}
						layout="vertical"
						style={{ width: "60%" }}
						form={loginForm}
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your email!",
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
								Sign up
							</Button>
						</Form.Item>
						<span
							style={{
								color: "green",
								fontSize: 14,
								cursor: "pointer",
							}}
							onClick={() => {
								navigate("/sign-in");
							}}
						>
							Sign in here!
						</span>
					</Form>
				</div>
			</Col>
		</Row>
	);
};
