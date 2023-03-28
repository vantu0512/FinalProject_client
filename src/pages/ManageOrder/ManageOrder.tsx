import { Button, Space, Table, Tooltip, Modal } from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	PlusCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import "../../asset/style/ManageStaff.scss";
import { useState } from "react";
import { ModalOrder } from "./Modal";
import { SearchComponent } from "../../component/SearchComponent/SearchComponent";

type DataType = {
	key: string;
	orderId: number;
	status: string;
	address: string;
	phoneNumber: string;
	recipentName: string;
	paymentMethod: string;
	orderDate: string;
	note: string;
};

const data: DataType[] = [
	{
		key: "1",
		orderId: 123,
		status: "approve",
		address: "Ha noi",
		phoneNumber: "123123",
		recipentName: "H M H",
		paymentMethod: "paypal",
		orderDate: "20/11/2022",
		note: "done",
	},
];

export const ManageOrder = (): React.ReactElement => {
	// const [data, setData] = useState(dataTest);
	// const [statusApi, setStatusApi] = useState(StatusApi.NULL);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userSelect, setUserSelect] = useState(null);
	const [modal, contextHolder] = Modal.useModal();
	const columns: ColumnsType<DataType> = [
		{
			title: "Mã đơn hàng",
			dataIndex: "orderId",
			key: "orderId",
			render: (text) => (
				<div className="ms__table--name">
					<span>{text}</span>
				</div>
			),
		},
		{
			title: "Tình trạng",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Tên người nhận",
			dataIndex: "recipentName",
			key: "recipentName",
		},
		{
			title: "Phương thức thanh toán",
			dataIndex: "paymentMethod",
			key: "paymentMethod",
		},
		{
			title: "Ngày đặt hàng",
			dataIndex: "orderDate",
			key: "orderDate",
		},
		{
			title: "Ghi chú",
			dataIndex: "note",
			key: "note",
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
			content: "Bạn có muốn xóa đơn hàng không ?",
			okText: "Đồng ý",
			cancelText: "Hủy",
		});
	};

	return (
		<div className="ms">
			<SearchComponent
				placeholder="Nhập từ khóa tìm kiếm"
				style={{ width: 600 }}
			/>
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
						Thêm đơn hàng
					</Button>
				</div>
				<Table
					columns={columns}
					dataSource={data}
					// pagination={{
					// 	position: ["bottomRight"],
					// 	pageSize: 10,
					// 	simple: true,
					// 	// total: 100,
					// 	// showTotal: (total, range) =>
					// 	// 	`${range[0]} - ${range[1]} trong số ${total}`,
					// }}
				/>
			</div>
			<Modal
				title={!userSelect ? "Thêm đơn hàng" : "Sửa thông tin"}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={1000}
			>
				<ModalOrder data={userSelect} />
			</Modal>
			{contextHolder}
		</div>
	);
};
