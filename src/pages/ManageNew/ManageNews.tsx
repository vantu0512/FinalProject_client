import "../../asset/style/ManageAccount.scss";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { NewsType } from "../../type/type";
import { CONSTANT } from "../../constant/constant";
import { PaginationComponent } from "../../component/Pagination/PaginationComponent";
import { useSearchParams } from "react-router-dom";
import { SearchParams } from "../../type/common";
import { ConfirmModal } from "../../component/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { SearchComponent } from "../../component/SearchComponent/SearchComponent";
import { ModalNews } from "./ModalNews";
import { newsApi } from "../../api/newsApi";
export const ManageNews = (): React.ReactElement => {
	const [data, setData] = useState<NewsType[]>([]);
	const [dataToModal, setDataToModal] = useState<NewsType>({});
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [typeModal, setTypeModal] = useState<string>("create");
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page") || CONSTANT.DEFAULT_PAGE;
	const size = searchParams.get("size") || CONSTANT.DEFAULT_SIZE;
	const keyword = searchParams.get("keyword") || CONSTANT.DEFAULT_KEYWORD;
	const [totalRecord, setTotalRecord] = useState<number>();

	const columns: ColumnsType<NewsType> = [
		{
			title: "Tên tin tức",
			dataIndex: "name",
			width: "10%",
			render: (text) => <span>{text}</span>,
		},
		{
			width: "20%",
			title: "Mô tả",
			dataIndex: "description",
		},
		{
			width: "30%",
			title: "Nội dung",
			dataIndex: "contentMarkdown",
			render: (text) => <span className="mark-down">{text}</span>,
		},
		{
			width: "30%",
			title: "Nội dung HTML",
			dataIndex: "contentHTML",
			render: (text) => <span className="mark-down">{text}</span>,
		},
		{
			width: "10%",
			title: "Chức năng",
			render: (record) => (
				<>
					<span
						style={{
							marginLeft: 8,
							cursor: "pointer",
							color: "blue",
							fontSize: 16,
						}}
					>
						<EditOutlined
							onClick={() => {
								setIsOpenModal(true);
								setTypeModal("edit");
								setDataToModal(record);
							}}
						/>
					</span>
					<span
						style={{
							marginLeft: 8,
							cursor: "pointer",
							color: "red",
							fontSize: 16,
						}}
					>
						<DeleteOutlined
							onClick={() => handleDeleteNews(record?.id)}
						/>
					</span>
				</>
			),
		},
	];

	useEffect(() => {
		handleGetAllNews({
			page,
			size,
			keyword,
		});
	}, [page, size, keyword]);

	const handleGetAllNews = async (params: SearchParams): Promise<any> => {
		try {
			const res = await newsApi.getAll(params);
			if (res?.data?.data) {
				const arr = handleFormatData(res.data.data);
				setData(arr);
				setTotalRecord(res.data?.totalRecord);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFormatData = (data: any) => {
		const arr: NewsType[] = data.map((item: any) => {
			return {
				id: item._id,
				name: item.name,
				description: item.description,
				contentHTML: item.contentHTML,
				contentMarkdown: item.contentMarkdown,
			};
		});
		return arr;
	};

	const handleDeleteNews = (id: string) => {
		ConfirmModal({
			icon: <></>,
			onOk: async () => {
				try {
					const params = {
						id,
					};
					const res = await newsApi.delete(params);
					if (res?.data?.errCode === 0) {
						toast.success(res.data.errMessage);
						await handleGetAllNews({ page, size });
					}
				} catch (error: any) {
					console.log(error);

					toast.error(error.message);
				}
			},
			className: "confirm__modal",
			title: "Bạn có chắc muốn xóa không",
			description: "Tin tức này sẽ bị xóa vĩnh viễn",
			canceText: `Hủy bỏ`,
			okText: "Xóa",
		});
	};

	const handleClose = () => {
		setIsOpenModal(false);
	};

	return (
		<div className="manage-account">
			<SearchComponent
				placeholder="Nhập từ khóa tìm kiếm"
				style={{ width: 600 }}
			/>
			<div
				className="manage-account-header"
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "end",
				}}
			>
				<Button
					type="primary"
					onClick={() => {
						setIsOpenModal(true);
						setTypeModal("add");
					}}
				>
					Add news
				</Button>
			</div>
			<div className="manage-account-table">
				<div className="table-content">
					<Table
						columns={columns}
						dataSource={[...data]}
						pagination={false}
					/>
				</div>
				<div className="table-pagination">
					<PaginationComponent
						totalRecord={totalRecord ? totalRecord : Number(size)}
					/>
				</div>
			</div>
			{isOpenModal && (
				<ModalNews
					handleClose={handleClose}
					getAllNews={handleGetAllNews}
					typeModal={typeModal}
					dataToModal={dataToModal}
				/>
			)}
		</div>
	);
};
