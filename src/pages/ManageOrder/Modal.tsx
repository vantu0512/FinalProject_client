import { DatePicker, Form, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

type Props = {
	data?: any;
};

export const ModalOrder: React.FC<Props> = ({ data }: Props) => {
	// console.log({ data: data.avatar_url });
	const [form] = Form.useForm();
	useEffect(() => {
		if (data) {
			console.log("data");

			// form.setFieldsValue(data);
		} else form.resetFields();
	}, [data]);
	return (
		<Form
			style={{ padding: "15px 0" }}
			name="basic"
			form={form}
			labelCol={{ span: 8 }}
			// wrapperCol={{ span: 16 }}
			// style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			// onFinish={onFinish}
			// onFinishFailed={onFinishFailed}
			autoComplete="off"
			labelAlign="left"
		>
			<Form.Item
				label="Mã đơn hàng"
				name="orderId"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Tình trạng"
				name="status"
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
				label="Địa chỉ"
				name="address"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Số điện thoại"
				name="phoneNumber"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Tên người nhận"
				name="recipentName"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Phương thức thanh toán"
				name="paymentMethod"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Ngày đặt hàng"
				name="orderDate"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<DatePicker />
			</Form.Item>
			<Form.Item label="Ghi chú" name="note">
				<Input />
			</Form.Item>
		</Form>
	);
};
