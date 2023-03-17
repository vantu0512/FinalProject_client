import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
import { ModalAccount } from "./ModalAccount";
import { UserType } from "../../type/type";
export const ManageAccount = (): React.ReactElement => {
	const [data, setData] = useState<UserType[]>([]);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const columns: ColumnsType<UserType> = [
		{
			title: "Email",
			dataIndex: "email",
			render: (text) => <span>{text}</span>,
		},
		{
			title: "Full name",
			dataIndex: "fullName",
		},
		{
			title: "Role",
			dataIndex: "role",
		},
		{
			title: "Address",
			dataIndex: "address",
		},
		{
			title: "Chức năng",
			render: () => (
				<>
					<span
						style={{
							marginLeft: 8,
							cursor: "pointer",
							color: "blue",
							fontSize: 16,
						}}
					>
						<EditOutlined />
					</span>
					<span
						style={{
							marginLeft: 8,
							cursor: "pointer",
							color: "red",
							fontSize: 16,
						}}
					>
						<DeleteOutlined />
					</span>
				</>
			),
		},
	];

	useEffect(() => {
		handleGetAllAccount();
	}, []);

	const handleGetAllAccount = async (): Promise<any> => {
		try {
			const res = await userApi.getAllUser();
			if (res?.data?.data) {
				const arr = handleFormatData(res.data.data);
				console.log(arr);
				setData(arr);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFormatData = (data: any) => {
		const arr: UserType[] = data.map((item: any) => {
			return {
				userName: item.userName,
				email: item.email,
				fullName: item.fullName,
				role: item.role,
				address: item.address,
			};
		});
		return arr;
	};

	const handleClose = () => {
		setIsOpenModal(false);
	};

	return (
		<>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "end",
				}}
			>
				<Button
					type="primary"
					style={{ margin: 8 }}
					onClick={() => {
						setIsOpenModal(true);
					}}
				>
					Add account
				</Button>
			</div>
			<Table columns={columns} dataSource={data} />
			{isOpenModal && <ModalAccount handleClose={handleClose} />}
		</>
	);
};
