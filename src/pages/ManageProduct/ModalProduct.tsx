import {
	Col,
	Row,
	Button,
	Form,
	Input,
	Select,
	DatePicker,
	InputNumber,
	Modal,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { productApi } from "../../api/productApi";
import { ProductType } from "../../type/type";
import { SearchParams } from "../../type/common";

type Props = {
	handleClose: () => void;
	getAllUser: (params: SearchParams) => Promise<any>;
	typeModal: string;
	dataToModal: ProductType;
};

export const ModalProduct = ({
	handleClose,
	typeModal,
}: // dataToModal,
Props): React.ReactElement => {
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState<any>();
	const [preview, setPreview] = useState<string>();

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			return;
		}
		setSelectedFile(e.target.files[0]);
	};

	const uploadImage = async () => {
		if (!selectedFile) return;
		const imageRef = ref(storage, `image/${selectedFile.name + v4()}`);
		await uploadBytesResumable(imageRef, selectedFile);
		const res = await getDownloadURL(imageRef);
		return res;
	};

	const onFinish = async (values: any) => {
		try {
			const imgUrl = await uploadImage();
			const data = {
				...values,
				imgUrl: `${imgUrl}`,
			};
			console.log("URL: ", imgUrl);
			await productApi.add(data);
			navigate("/");
		} catch (error) {
			console.log("err: ", error);
		}
	};

	return (
		<>
			<Modal
				title={
					typeModal === "edit"
						? "Chỉnh sửa sản phẩm"
						: "Thêm sản phẩm"
				}
				open={true}
				onOk={handleClose}
				onCancel={handleClose}
				footer={null}
			>
				<Row>
					<Col span={16}>
						<Form
							name="addBook-form"
							size="large"
							layout="vertical"
							labelCol={{
								span: 4,
							}}
							wrapperCol={{
								span: 20,
							}}
							onFinish={onFinish}
						>
							<Form.Item>
								<Form.Item
									label="Tiêu đề"
									name="title"
									rules={[
										{
											required: true,
											message:
												"Tiêu đề không được bỏ trống",
										},
									]}
									style={{
										display: "inline-block",
										width: "calc(50% - 8px)",
									}}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label="Tác giả"
									name="author"
									rules={[
										{
											required: true,
											message:
												"Tác giả không được bỏ trống",
										},
									]}
									style={{
										display: "inline-block",
										width: "calc(50% - 8px)",
										marginLeft: 16,
									}}
								>
									<Input />
								</Form.Item>
							</Form.Item>
							<Form.Item
								label="Mô tả"
								name="description"
								rules={[
									{
										required: true,
										message: "Mô tả không được bỏ trống",
									},
								]}
							>
								<Input.TextArea rows={4} />
							</Form.Item>
							<Form.Item>
								<Form.Item
									label="Ngày xuất bản"
									name="datePublish"
									style={{
										display: "inline-block",
										width: "calc(50% - 8px)",
									}}
									rules={[
										{
											required: true,
											message:
												"Ngày xuất bản không được bỏ trống",
										},
									]}
								>
									<DatePicker style={{ width: "100%" }} />
								</Form.Item>
								<Form.Item
									label="Số trang"
									name="pageNumber"
									style={{
										display: "inline-block",
										width: "calc(50% - 8px)",
										marginLeft: 16,
									}}
									rules={[
										{
											required: true,
											message:
												"Số trang không được bỏ trống",
										},
									]}
								>
									<InputNumber style={{ width: "100%" }} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item
									label="Thể loại"
									name="category"
									rules={[
										{
											required: true,
											message:
												"Thể loại không được bỏ trống",
										},
									]}
									style={{
										display: "inline-block",
										width: "calc(50% - 8px)",
									}}
								>
									<Select>
										<Select.Option value="Truyện">
											Truyện
										</Select.Option>
										<Select.Option value="Sách">
											Sách
										</Select.Option>
										<Select.Option value="Báo">
											Báo
										</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									label="Giá tiền"
									name="price"
									rules={[
										{
											required: true,
											message:
												"Giá tiền không được bỏ trống",
										},
									]}
									style={{
										display: "inline-block",
										width: "calc(50% - 8px)",
										marginLeft: 16,
									}}
								>
									<Input />
								</Form.Item>
							</Form.Item>
						</Form>
					</Col>
					<Col span={8}>
						<div className="upload">
							<label
								htmlFor="file-upload"
								className="custom-file-upload"
							>
								Upload
							</label>
							<input
								type="file"
								id="file-upload"
								onChange={onSelectFile}
							/>
							{selectedFile && (
								<img src={preview} className="preview-img" />
							)}
						</div>
					</Col>
				</Row>
				<Button
					htmlType="submit"
					form="addBook-form"
					type="primary"
					style={{ width: 100, marginTop: 32 }}
				>
					Thêm
				</Button>
				<Button
					style={{ width: 100, marginTop: 32, marginLeft: 16 }}
					onClick={() => {
						navigate("/");
					}}
				>
					Hủy
				</Button>
			</Modal>
		</>
	);
};
