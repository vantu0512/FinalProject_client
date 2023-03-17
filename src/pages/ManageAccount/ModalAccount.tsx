import { Button, Form, Input, Modal, Select } from "antd";
import { userApi } from "../../api/userApi";
import { UserType } from "../../type/type";

type Props = {
	handleClose: () => void;
};

type Option = {
	label: string;
	value: string;
};

export const ModalAccount = ({ handleClose }: Props): React.ReactElement => {
	const [form] = Form.useForm();
	const option: Option[] = [
		{
			label: "Admin",
			value: "Admin",
		},
		{
			label: "User",
			value: "User",
		},
	];

	const onFinish = () => {
		const data: UserType = {
			email: form.getFieldValue("email"),
			role: form.getFieldValue("role"),
			fullName: form.getFieldValue("fullName"),
			address: form.getFieldValue("address"),
		};
		handleAddAccount(data);
	};

	const handleAddAccount = async (user: UserType): Promise<any> => {
		try {
			const res = await userApi.add(user);
			if (res) console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Modal
				title="Tạo tài khoản"
				open={true}
				onOk={handleClose}
				onCancel={handleClose}
				footer={null}
			>
				<Form
					style={{ padding: "15px 0" }}
					name="basic"
					form={form}
					labelCol={{ span: 8 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
					labelAlign="left"
					id="form"
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Không được để trống",
							},
							{
								type: "email",
								message: "Email không hợp lệ",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Họ và tên"
						name="fullName"
						rules={[
							{
								required: true,
								message: "Không được để trống !",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Chức vụ"
						name="role"
						rules={[
							{ required: true, message: "Không được để trống" },
						]}
					>
						<Select options={option} />
					</Form.Item>
					<Form.Item
						label="Địa chỉ"
						name="address"
						rules={[
							{ required: true, message: "Không được để trống" },
						]}
					>
						<Input />
					</Form.Item>
				</Form>
				<Button type="primary" htmlType="submit" form="form">
					Save
				</Button>
			</Modal>
		</>
	);
};
