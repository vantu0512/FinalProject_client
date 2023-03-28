import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import "../../asset/style/Home.scss";
import { ProductType } from "../../type/type";
import { CONSTANT } from "../../constant/constant";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productApi } from "../../api/productApi";
import { SearchParams } from "../../type/common";
export const Product = (): React.ReactElement => {
	const navigate = useNavigate();
	const [data, setData] = useState<ProductType[]>([]);
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page") || CONSTANT.DEFAULT_PAGE;
	const size = searchParams.get("size") || CONSTANT.DEFAULT_SIZE;
	const keyword = searchParams.get("keyword") || CONSTANT.DEFAULT_KEYWORD;

	useEffect(() => {
		handleGetAllProduct({
			page,
			size,
			keyword,
		});
	}, [page, size, keyword]);

	const handleGetAllProduct = async (params: SearchParams): Promise<any> => {
		try {
			const res = await productApi.getAll(params);
			if (res?.data?.listProduct) {
				const arr = handleFormatData(res.data.listProduct);
				setData(arr);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFormatData = (data: any) => {
		const arr: ProductType[] = data.map((item: any) => {
			return {
				_id: item._id,
				productName: item.productName,
				description: item.description,
				categoryName: item.categoryName,
				imgUrl: item.imgUrl,
				price: item.price,
				datePublish: item.datePublish,
			};
		});
		return arr;
	};

	return (
		<>
			<div className="home">
				<div className="trending">
					<div className="trending-title">Addidas</div>
					<Row>
						{data &&
							data.map((item: ProductType) => {
								return (
									item?.categoryName === "Adidas" && (
										<Col span={8}>
											<Card
												className="trending-item"
												hoverable
												cover={
													<img
														style={{
															height: 400,
															objectFit: "cover",
														}}
														alt="example"
														src={item?.imgUrl}
													/>
												}
												onClick={() => {
													navigate(
														`/detail-product/${item._id}`,
													);
												}}
											>
												<Meta
													title={item?.productName}
													description={
														item?.description
													}
												/>
											</Card>
										</Col>
									)
								);
							})}
					</Row>
				</div>
				<div className="trending">
					<div className="trending-title">Nike</div>
					<Row>
						{data &&
							data.map((item: ProductType) => {
								return (
									item?.categoryName === "Nike" && (
										<Col span={8}>
											<Card
												className="trending-item"
												hoverable
												cover={
													<img
														style={{
															height: 400,
															objectFit: "cover",
														}}
														alt="example"
														src={item?.imgUrl}
													/>
												}
												onClick={() => {
													navigate(
														`/detail-product/${item._id}`,
													);
												}}
											>
												<Meta
													title={item?.productName}
													description={
														item?.description
													}
												/>
											</Card>
										</Col>
									)
								);
							})}
					</Row>
				</div>
				<div className="feature-style">
					<div className="feature-style-title">Featured styles</div>
					<Row>
						<Col span={12}>
							<Card
								className="feature-style-item"
								hoverable
								cover={
									<img
										alt="example"
										src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9bd6dc6bbb84a8faa3dae8400320b3e_9366/GX6632_01_standard.jpg"
									/>
								}
							>
								<Meta
									title="Europe Street beat"
									description="www.instagram.com"
								/>
							</Card>
						</Col>
						<Col span={12}>
							<Card
								className="feature-style-item"
								hoverable
								cover={
									<img
										alt="example"
										src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto,fl_lossy,c_fill,g_auto/e01dea68cf93434bae5aac0900af99e8_9366/FX5500_01_standard.jpg"
									/>
								}
							>
								<Meta
									title="Europe Street beat"
									description="www.instagram.com"
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};
