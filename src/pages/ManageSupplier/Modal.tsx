import { Form, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

type Props = {
	data?: any;
};

export const ModalSupplier: React.FC<Props> = ({ data }: Props) => {
	// console.log({ data: data.avatar_url });
	const [form] = Form.useForm();
	useEffect(() => {
		if (data) {
			form.setFieldsValue(data);
		} else form.resetFields();
	}, [data]);

	return (
		<Form
			style={{ padding: "15px 0" }}
			name="basic"
			form={form}
			labelCol={{ span: 8 }}
			initialValues={{ remember: true }}
			// onFinish={onFinish}
			// onFinishFailed={onFinishFailed}
			autoComplete="off"
			labelAlign="left"
		>
			<Form.Item
				label="Tên nhà cung cấp"
				name="suplierName"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Địa chỉ"
				name="address"
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
				label="Số điện thoại"
				name="phoneNumber"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input disabled={data} />
			</Form.Item>
			<Form.Item label="Mô tả" name="description">
				<Input disabled={data} />
			</Form.Item>
		</Form>
	);
};
