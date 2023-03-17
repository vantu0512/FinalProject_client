import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
export const ManageAccount = (): React.ReactElement => {
	type UserType = {
		userName?: string;
		email?: string;
		fullName?: string;
		role?: string;
		address?: string;
	};

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
					<span style={{ marginLeft: 8, cursor: "pointer" }}>
						<EditOutlined />
					</span>
					<span style={{ marginLeft: 8, cursor: "pointer" }}>
						<DeleteOutlined />
					</span>
				</>
			),
		},
	];
	// const data: UserType[] = [
	// 	{
	// 		email: "asdfasd@gmail.com",
	// 		fullName: "John Brown",
	// 		role: "admin",
	// 		address: "New York No. 1 Lake Park",
	// 	},
	// 	{
	// 		email: "asdfasd@gmail.com",
	// 		fullName: "Jim Green",
	// 		role: "admin",
	// 		address: "London No. 1 Lake Park",
	// 	},
	// 	{
	// 		email: "asdfasd@gmail.com",
	// 		fullName: "Joe Black",
	// 		role: "admin",
	// 		address: "Sydney No. 1 Lake Park",
	// 	},
	// ];

	// const [data, setData] = useState<UserType[]>([]);

	const [data, setData] = useState<UserType[]>([]);
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
	useEffect(() => {
		handleGetAllAccount();
	}, []);
	return (
		<>
			<Table columns={columns} dataSource={data} />
		</>
	);
};
