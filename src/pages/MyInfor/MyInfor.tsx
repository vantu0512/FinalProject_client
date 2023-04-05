import { Button, Form, Input } from "antd";
import "../../asset/style/ModalProduct.scss";
import { useEffect, useState } from "react";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { userApi } from "../../api/userApi";
import { UserType } from "../../type/type";

export const MyInfor = (): React.ReactElement => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const email = user.email;
	const [form] = Form.useForm();
	const [selectedFile, setSelectedFile] = useState<any>();
	const [preview, setPreview] = useState<string>();
	const [userData, setUserData] = useState<any>();
	const [type, setType] = useState<string>("detail");

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	useEffect(() => {
		handleGetDetailUser();
	}, []);

	useEffect(() => {
		userData && handleFillForm(userData);
	}, [userData]);

	const handleGetDetailUser = async (): Promise<any> => {
		try {
			const params = {
				email,
			};
			const res = await userApi.getDetailUser(params);
			if (res?.data?.data) {
				console.log("user data:  ", res?.data?.data);
				setUserData(res?.data?.data);
				setType("detail");
				toast.success("ok");
			}
		} catch (error) {
			console.log("error:", error);
		}
	};

	const handleFillForm = (data: UserType) => {
		form.setFieldValue("email", data.email);
		form.setFieldValue("fullName", data.fullName);
		form.setFieldValue("address", data.address);
		setPreview(data.avatar);
	};

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			return;
		}
		setSelectedFile(e.target.files[0]);
	};

	const uploadImage = async () => {
		if (!selectedFile) {
			if (type === "detail") return;
			else return preview;
		}
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
				avatar: `${imgUrl}`,
			};
			console.log(data);
			const res = await userApi.edit(data);
			if (res) toast.success("Thành công");
		} catch (error) {
			console.log("err: ", error);
		}
	};

	return (
		<div className="user-infor">
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
				<Form.Item label="Email" name="email">
					<Input disabled />
				</Form.Item>
				<Form.Item
					label="Họ và tên"
					name="fullName"
					rules={[
						{
							required: true,
							message: "Không được để trống",
						},
					]}
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
			</Form>
			<div className="upload">
				<label htmlFor="file-upload" className="custom-file-upload">
					Upload
				</label>
				<input type="file" id="file-upload" onChange={onSelectFile} />
				{type === "detail" ? (
					selectedFile ? (
						<img src={preview} className="preview-img" />
					) : (
						<></>
					)
				) : selectedFile ? (
					<img src={preview} className="preview-img" />
				) : (
					<img src={userData.imgUrl} className="preview-img" />
				)}
			</div>
			<Button
				htmlType="submit"
				form="form"
				type="primary"
				style={{ width: 100, marginTop: 32 }}
			>
				{type === "edit" ? "Save" : "Thêm"}
			</Button>
		</div>
	);
};
