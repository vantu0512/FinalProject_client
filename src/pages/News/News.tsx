import { useEffect, useState } from "react";
import { SearchParams } from "../../type/common";
import { newsApi } from "../../api/newsApi";
import { NewsType } from "../../type/type";
import { useSearchParams } from "react-router-dom";
import { CONSTANT } from "../../constant/constant";
import "../../asset/style/News.scss";

export const News = (): React.ReactElement => {
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page") || CONSTANT.DEFAULT_PAGE;
	const size = searchParams.get("size") || CONSTANT.DEFAULT_SIZE;
	const keyword = searchParams.get("keyword") || CONSTANT.DEFAULT_KEYWORD;
	const [listNews, setListNews] = useState<NewsType[]>();
	const [dataView, setDataView] = useState<NewsType>();

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
				setListNews(res.data.data);
				setDataView(res.data.data[0]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="news">
			<div className="view-news">
				<div
					className="view-news-content"
					dangerouslySetInnerHTML={
						dataView?.contentHTML
							? { __html: dataView.contentHTML }
							: undefined
					}
				></div>
			</div>
			<div className="list-news">
				{listNews?.map((item) => {
					return (
						<div
							className="news-item"
							onClick={() => setDataView(item)}
						>
							<span>{item.name}</span>
							<p>{item.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
