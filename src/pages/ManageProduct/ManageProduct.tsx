import { Button, Drawer, Input, Modal, Space, Table, Tooltip } from "antd";
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
import { ContentDrawer } from "./ContentDrawer";
import { DataTypeProDuct } from "../../type/type";
// import { useState } from "react";

const data: DataTypeProDuct[] = [
	{
		key: "1",
		name: "John Brown",
		brand: "Laptop",
		thumbnail_url:
			"https://i.pinimg.com/236x/08/44/c5/0844c5eb33e92d674e6ad124bac4903a.jpg",
		quantity: 1000,
		sold: 20,
		description: "hihi",
		specifications: "huhu",
		sale_percent: 28,
		price: 10000,
		type: 0,
	},
];

export const ManageProduct: React.FC = () => {
	const [productSelect, setProductSelect] = useState(null);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [modal, contextHolder] = Modal.useModal();

	const showDrawer = () => {
		setOpenDrawer(true);
	};

	const onClose = () => {
		setOpenDrawer(false);
		resetProductSelect();
	};

	const resetProductSelect = () => setProductSelect(null);

	const columns: ColumnsType<DataTypeProDuct> = [
		{
			title: "Ảnh",
			dataIndex: "thumbnail_url",
			key: "thumbnail_url",
			render: (url) => (
				<div style={{ width: "50px", height: "30px" }}>
					<img
						src={url}
						alt=""
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
					,
				</div>
			),
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Thương hiệu",
			dataIndex: "brand",
			key: "brand",
		},
		{
			title: "Số lượng còn",
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: "Đã bán",
			dataIndex: "sold",
			key: "sold",
		},
		{
			title: "Giá tiền",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Khuyễn mãi",
			dataIndex: "sale_percent",
			key: "sale_percent",
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
								setProductSelect(item);
								showDrawer();
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

	const confirm = () => {
		modal.confirm({
			title: "Thông báo",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa sản phẩm không ?",
			okText: "Đồng ý",
			cancelText: "Hủy",
		});
	};
	return (
		<div className="ms">
			<div className="ms__search">
				<Input
					placeholder="Nhập tên sản phẩm"
					prefix={<SearchOutlined />}
					style={{ width: "20%" }}
				/>
				<Button type="primary">Tìm kiếm</Button>
			</div>
			<div className="ms__table">
				<div className="ms__table--buttonAdd">
					<Button
						type="primary"
						icon={<PlusCircleOutlined />}
						onClick={() => {
							// showModal();
							setProductSelect(null);
							showDrawer();
						}}
					>
						Thêm sản phẩm
					</Button>
				</div>
				<Table
					columns={columns}
					dataSource={data}
					pagination={{
						position: ["bottomRight"],
						pageSize: 10,
						simple: true,
						// total: 100,
						showTotal: (total, range) =>
							`${range[0]} - ${range[1]} trong số ${total}`,
					}}
				/>
			</div>
			<Drawer
				title={!productSelect ? "Thêm sản phẩm" : "Sửa thông tin"}
				width={720}
				onClose={onClose}
				open={openDrawer}
				bodyStyle={{ paddingBottom: 0 }}
				extra={
					<Space>
						<Button onClick={onClose}>Hủy</Button>
						<Button onClick={onClose} type="primary">
							Thêm
						</Button>
					</Space>
				}
			>
				<ContentDrawer data={productSelect} />
			</Drawer>
			{contextHolder}
		</div>
	);
};
