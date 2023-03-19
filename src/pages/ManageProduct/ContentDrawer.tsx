import { Col, Form, Input, Row, Select } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { AvatarPicker } from "../../component/AvatarPicker/AvatarPicker";
// import { useState } from "react";

type Props = {
	data?: any;
};

export const ContentDrawer: React.FC<Props> = ({ data }: Props) => {
	const [content, setContent] = useState<any>("");
	const [form] = Form.useForm();
	const [avt, setAvt] = useState<any>();
	useEffect(() => {
		if (data) {
			form.setFieldsValue(data);
			// setContent(data.description);
		} else form.resetFields();
	}, [data]);

	const onChangePickAvatar = (value: any) => {
		setAvt(value);
	};
	console.log({ avt, content });
	return (
		<Form
			labelAlign="left"
			form={form}
			preserve={false}
			/*onFinish={handleSubmit}*/ layout="vertical"
		>
			<Row>
				<Col span={6}>
					<Form.Item
						label="Ảnh"
						name="thumbnail_url"
						rules={[{ required: true, message: "" }]}
					>
						<AvatarPicker
							width={100}
							value={data && data.thumbnail_url}
							type="circle"
							isImgDefault={true}
							onChangePickAvatar={onChangePickAvatar}
						/>
					</Form.Item>
				</Col>

				<Col span={18}>
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item
								label="Tên sản phẩm"
								name="name"
								rules={[
									{
										required: true,
										message: "",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label="Giá tiền"
								name="price"
								rules={[
									{
										required: true,
										message: "",
										pattern: new RegExp(/^[0-9]+$/),
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label="Khuyễn mãi"
								name="sale_percent"
								rules={[
									{
										required: true,
										message: "",
										pattern: new RegExp(/^[0-9]+$/),
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={8}>
						<Col span={24}>
							<Form.Item
								label="Thương hiệu"
								name="brand"
								rules={[
									{
										required: true,
										message: "",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row gutter={8}>
				<Col span={18}>
					<Form.Item
						label="Loại sản phẩm"
						name="type"
						rules={[
							{
								required: true,
								message: "",
							},
						]}
					>
						<Select>
							<Select.Option value={0}>Addidas</Select.Option>
							<Select.Option value={1}>Nike</Select.Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item
						label="Số lượng nhập"
						name="quantity"
						rules={[
							{
								required: true,
								message: "",
								pattern: new RegExp(/^[0-9]+$/),
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<div>
				<p>
					<span style={{ color: "red" }}>*</span> Mô tả:
				</p>
				{/* {!data ? ( */}
				<Editor
					wrapperClassName="rich-editor demo-wrapper"
					editorClassName="demo-editor"
					onContentStateChange={setContent}
					// editorState={content}
					// toolbarStyle={toolbarStyle}
				/>
				{/* ) : ( */}
				{/* content && ( */}
				{/* <Editor
							wrapperClassName="rich-editor demo-wrapper"
							editorClassName="demo-editor"
							onContentStateChange={setContent}
							initialContentState={content}
						/>
					)
				)} */}
			</div>
		</Form>
	);
};
