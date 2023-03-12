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
import { ModalPromotion } from "./Modal";
// import { StatusApi } from "../../constant/statusApi";

type DataType = {
	key: string;
	promotionId: number;
	promotionName: string;
	description: string;
	promotionPrice: string;
};

const data: DataType[] = [
	{
		key: "1",
		promotionId: 123,
		promotionName: "John Brown",
		description: "Khuyến mãi 50% khi mua đơn hàng từ 1000000VND",
		promotionPrice: "1000",
	},
];

export const ManagePromotion = (): React.ReactElement => {
	// const [data, setData] = useState(dataTest);
	// const [statusApi, setStatusApi] = useState(StatusApi.NULL);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userSelect, setUserSelect] = useState(null);
	const [modal, contextHolder] = Modal.useModal();
	const columns: ColumnsType<DataType> = [
		{
			title: "Mã khuyến mãi",
			dataIndex: "promotionId",
			key: "promotionId",
			render: (text) => (
				<div className="ms__table--name">
					<span>{text}</span>
				</div>
			),
		},
		{
			title: "Tên khuyến mãi",
			dataIndex: "promotionName",
			key: "promotionName",
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Chi phí khuyến mãi",
			dataIndex: "promotionPrice",
			key: "promotionPrice",
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
			content: "Bạn có muốn xóa khuyến mãi không ?",
			okText: "Đồng ý",
			cancelText: "Hủy",
		});
	};

	return (
		<div className="ms">
			<div className="ms__search">
				<Input
					placeholder="Nhập tên khuyến mãi"
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
						Thêm khuyến mãi
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
					!userSelect ? "Tạo khuyến mãi" : "Sửa thông tin khuyễn mãi"
				}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={1000}
			>
				<ModalPromotion data={userSelect} />
			</Modal>
			{contextHolder}
		</div>
	);
};
