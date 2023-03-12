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
import { ModalStaff } from "./Modal";
import { DataTypeStaff } from "../../type/type";
// import { StatusApi } from "../../constant/statusApi";

const data: DataTypeStaff[] = [
	{
		key: "1",
		nick_name: "John Brown",
		email: "hmhdev@gamil.com",
		username: "hmhdev",
		phone_number: "0328641477",
		avatar_url:
			"https://i.pinimg.com/236x/08/44/c5/0844c5eb33e92d674e6ad124bac4903a.jpg",
		// birthday: Date.now(),
		gender: 0,
		address: "New York No. 1 Lake Park",
	},
];

export const ManageStaff: React.FC = () => {
	// const [data, setData] = useState(dataTest);
	// const [statusApi, setStatusApi] = useState(StatusApi.NULL);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userSelect, setUserSelect] = useState(null);
	const [modal, contextHolder] = Modal.useModal();
	const columns: ColumnsType<DataTypeStaff> = [
		{
			title: "Họ và tên",
			dataIndex: "nick_name",
			key: "nick_name",
			render: (text, record) => (
				<div className="ms__table--name">
					<div className="ms__table--img">
						<img src={record.avatar_url} alt="" />
					</div>
					<span>{text}</span>
				</div>
			),
		},
		{
			title: "Tên đăng nhập",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Ngày sinh",
			dataIndex: "birthday",
			key: "birthday",
		},
		{
			title: "Giới tính",
			dataIndex: "gender",
			key: "gender",
			render: (text, record) => {
				if (record.gender === 0) return <p>Nam</p>;
				return <p>Nữ</p>;
			},
		},
		{
			title: "Đỉa chỉ",
			dataIndex: "address",
			key: "address",
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
		resetUserSelect();
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		resetUserSelect();
		setIsModalOpen(false);
	};
	console.log({ userSelect });

	const confirm = () => {
		modal.confirm({
			title: "Thông báo",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa thành viên không ?",
			okText: "Đồng ý",
			cancelText: "Hủy",
		});
	};

	const resetUserSelect = () => setUserSelect(null);

	return (
		<div className="ms">
			<div className="ms__search">
				<Input
					placeholder="Nhập tên nhân viên"
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
							resetUserSelect();
							showModal();
						}}
					>
						Thêm nhân viên
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
			<Modal
				title={!userSelect ? "Thêm nhân viên" : "Sửa thông tin"}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				destroyOnClose={true}
			>
				<ModalStaff data={userSelect} />
			</Modal>
			{contextHolder}
		</div>
	);
};
