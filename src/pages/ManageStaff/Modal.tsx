import { DatePicker, Form, Input, Radio, Select } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { AvatarPicker } from "../../component/AvatarPicker/AvatarPicker";

type Props = {
	data?: any;
};

export const ModalStaff: React.FC<Props> = ({ data }: Props) => {
	// console.log({ data: data.avatar_url });
	const [avt, setAvt] = useState<any>();
	const [form] = Form.useForm();
	useEffect(() => {
		if (data) {
			form.setFieldsValue(data);
		} else form.resetFields();
	}, [data]);
	const onChangePickAvatar = (value: any) => {
		setAvt(value);
	};
	console.log(avt);
	return (
		<Form
			style={{ padding: "15px 0" }}
			form={form}
			preserve={false}
			labelCol={{ span: 8 }}
			// onFinish={onFinish}
			// onFinishFailed={onFinishFailed}
			labelAlign="left"
			layout="horizontal"
		>
			<Form.Item label="Avatar" name="avatar_url">
				<AvatarPicker
					width={100}
					value={data ? data.avatar_url : null}
					type="circle"
					isImgDefault={true}
					onChangePickAvatar={onChangePickAvatar}
				/>
			</Form.Item>
			<Form.Item
				label="Họ và tên"
				name="nick_name"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{
						type: "email",
						message: "Không đúng định dạng !",
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Tên đăng nhập"
				name="username"
				rules={[{ required: true, message: "Không được để trống" }]}
			>
				<Input disabled={data} />
			</Form.Item>
			{!data && (
				<Form.Item
					label="Mật khẩu"
					name="password"
					rules={[{ required: true, message: "Không được để trống" }]}
				>
					<Input.Password />
				</Form.Item>
			)}
			<Form.Item label="Giới tính" name="gender">
				<Radio.Group>
					<Radio value={0}> Nam </Radio>
					<Radio value={1}> Nữ </Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item label="Chức vụ" name="role">
				<Select>
					<Select.Option value="demo">Demo</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item label="Ngày sinh" name="birthday">
				<DatePicker />
			</Form.Item>
			<Form.Item label="Địa chỉ" name="address">
				<Input />
			</Form.Item>
		</Form>
	);
};
