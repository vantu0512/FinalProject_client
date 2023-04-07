import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newsApi } from "../../api/newsApi";
import { CONSTANT } from "../../constant/constant";
import { SearchParams } from "../../type/common";
import { NewsType } from "../../type/type";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "../../asset/style/ModalNews.scss";
const mdParser = new MarkdownIt();

type Props = {
	handleClose: () => void;
	getAllNews: (params: SearchParams) => Promise<any>;
	typeModal: string;
	dataToModal: NewsType;
};

export const ModalNews = ({
	handleClose,
	getAllNews,
	typeModal,
	dataToModal,
}: Props): React.ReactElement => {
	const [form] = Form.useForm();
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page") || CONSTANT.DEFAULT_PAGE;
	const size = searchParams.get("size") || CONSTANT.DEFAULT_SIZE;
	const [contentMarkdown, setContentMarkdown] = useState<any>("");
	const [contentHTML, setContentHTML] = useState<any>("");
	const handleEditorChange = ({ html, text }: any) => {
		setContentHTML(html);
		setContentMarkdown(text);
	};

	useEffect(() => {
		if (typeModal === "edit") handleFillForm(dataToModal);
	}, []);

	const handleFillForm = (data: NewsType) => {
		form.setFieldValue("name", data.name);
		form.setFieldValue("description", data.description);
		setContentHTML(data.contentHTML);
		setContentMarkdown(data.contentMarkdown);
	};

	const onFinish = () => {
		const data: NewsType = {
			id: dataToModal.id,
			name: form.getFieldValue("name"),
			description: form.getFieldValue("description"),
			contentHTML,
			contentMarkdown,
		};
		if (typeModal === "add") handleAddNews(data);
		else handleEditNews(data);
	};

	const handleAddNews = async (news: NewsType): Promise<any> => {
		try {
			const res = await newsApi.add(news);
			if (res?.data) {
				if (res.data.errCode === 0) {
					toast.success(res.data.errMessage);
					await getAllNews({ page, size });
				}
				if (res.data.errCode === 1) toast.error(res.data.errMessage);
			}
		} catch (error) {
			console.log(error);
		} finally {
			handleClose();
		}
	};

	const handleEditNews = async (news: NewsType): Promise<any> => {
		try {
			const res = await newsApi.edit(news);
			if (res?.data) {
				if (res.data.errCode === 0) {
					toast.success(res.data.errMessage);
					await getAllNews({ page, size });
				}
				if (res.data.errCode === 1) toast.error(res.data.errMessage);
			}
		} catch (error) {
			console.log(error);
		} finally {
			handleClose();
		}
	};

	return (
		<>
			<Modal
				title={
					typeModal === "edit" ? "Chỉnh sửa tin tức" : "Thêm tin tức"
				}
				open={true}
				onOk={handleClose}
				onCancel={handleClose}
				footer={null}
				width={1200}
			>
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
					<Form.Item
						label="Tên tin tức"
						name="name"
						rules={[
							{
								required: true,
								message: "Không được để trống",
							},
						]}
					>
						<Input disabled={typeModal === "edit" ? true : false} />
					</Form.Item>

					<Form.Item
						label="Mô tả"
						name="description"
						rules={[
							{ required: true, message: "Không được để trống" },
						]}
					>
						<Input />
					</Form.Item>
				</Form>
				<div className="editor-component">
					<MdEditor
						className="markdown"
						style={{ height: "650px" }}
						renderHTML={(text: any) => mdParser.render(text)}
						onChange={handleEditorChange}
						value={contentMarkdown}
					/>
				</div>
				<Button
					type="primary"
					htmlType="submit"
					form="form"
					style={{ marginTop: 16 }}
				>
					Save
				</Button>
			</Modal>
		</>
	);
};
