import { Button, Input, Space, Table, Tooltip, Modal } from "antd";
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
	PlusCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import "../../asset/style/ManageStaff.scss";
import { useState } from "react";
import { ModalSupplier } from "./Modal";
// import { StatusApi } from "../../constant/statusApi";

type DataType = {
	key: string;
	supplierId: number;
	supplierName: string;
	phoneNumber: number;
	address: string;
	description: string;
};

const data: DataType[] = [
	{
		key: "1",
		supplierId: 123,
		supplierName: "John Brown",
		phoneNumber: 123456789,
		address: "New York No. 1 Lake Park",
		description: "description",
	},
];

export const ManageSupplier = (): React.ReactElement => {
	// const [data, setData] = useState(dataTest);
	// const [statusApi, setStatusApi] = useState(StatusApi.NULL);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userSelect, setUserSelect] = useState(null);
	const [modal, contextHolder] = Modal.useModal();
	const columns: ColumnsType<DataType> = [
		{
			title: "Mã nhà cung cấp",
			dataIndex: "supplierId",
			key: "orderId",
			render: (text) => (
				<div className="ms__table--name">
					<span>{text}</span>
				</div>
			),
		},
		{
			title: "Tên nhà cung cấp",
			dataIndex: "supplierName",
			key: "supplierName",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
			key: "status",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
		},

		{
			title: "Hành động",
			key: "action",
			render: (item) => (
				<Space size="middle">
					<Tooltip title="Sửa">
						<EditOutlined
							style={{ cursor: "pointer" }}
							onClick={() => {
								console.log("first", item);
								setUserSelect(item);
								showModal();
							}}
						/>
					</Tooltip>
					<Tooltip title="Xóa">
						<DeleteOutlined
							style={{ color: "red", cursor: "pointer" }}
							onClick={confirm}
						/>
					</Tooltip>
				</Space>
			),
		},
	];

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const confirm = () => {
		modal.confirm({
			title: "Thông báo",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa nhà cung cấp không ?",
			okText: "Đồng ý",
			cancelText: "Hủy",
		});
	};

	return (
		<div className="ms">
			<div className="ms__search">
				<Input
					placeholder="Nhập tên nhân viên"
					prefix={<SearchOutlined />}
					style={{ width: "40%" }}
				/>
				<Button type="primary">Tìm kiếm</Button>
			</div>
			<div className="ms__table">
				<div className="ms__table--buttonAdd">
					<Button
						type="primary"
						icon={<PlusCircleOutlined />}
						onClick={() => {
							setUserSelect(null);
							showModal();
						}}
					>
						Thêm nhà cung cấp
					</Button>
				</div>
				<Table
					columns={columns}
					dataSource={data}
					pagination={{
						position: ["bottomRight"],
						// pageSize: 10,
						// simple: true,
						// // total: 100,
						// showTotal: (total, range) =>
						// 	`${range[0]} - ${range[1]} trong số ${total}`,
					}}
				/>
			</div>
			<Modal
				title={
					!userSelect
						? "Thêm nhà cung cấp"
						: "Sửa thông tin nhà cung cấp"
				}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={1000}
			>
				<ModalSupplier data={userSelect} />
			</Modal>
			{contextHolder}
		</div>
	);
};
