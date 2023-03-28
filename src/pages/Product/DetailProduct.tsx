import { Button, Card, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../asset/style/DetailProduct.scss";
import { cartAction } from "../../store/action/cartAction";
// import { Comment } from "./Comment";
// import { Assessment } from "./Assessment";
// import moment from "moment";
import { productApi } from "../../api/productApi";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { CartType } from "../../type/type";

export const DetailProduct = (): React.ReactElement => {
	const params = useParams();
	const [detailProduct, setDetailProduct] = useState<any>();
	const [quantity, setQuantity] = useState(1);
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const email = user.email;
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		params?.id && handleGetDetailProduct(params.id);
	}, [params?.id]);

	const handleGetDetailProduct = async (id: string) => {
		try {
			const params = {
				id,
			};
			const res = await productApi.getDetail(params);
			setDetailProduct(res?.data?.product);
		} catch (e) {
			console.log("err: ", e);
		}
	};

	const handleChangeQuantity = (value: any) => {
		setQuantity(value);
	};

	const handleAddToCart = async () => {
		try {
			const data: CartType = {
				email: email,
				productId: params.id,
				productName: detailProduct?.productName,
				imgUrl: detailProduct?.imgUrl,
				price: detailProduct?.price,
				quantity: quantity,
			};
			await dispatch(cartAction.addToCart(data));
		} catch (e) {
			console.log("error: ", e);
		}
	};

	return (
		<>
			<div className="detailProductUser">
				<div className="bookInfor">
					<Card
						bordered={false}
						style={{
							width: "40%",
							height: 400,
							border: "1px solid rgba(50,100,100,0.1)",
						}}
					>
						<img
							src={detailProduct?.imgUrl}
							alt=""
							className="bookImg"
						/>
					</Card>
					<div className="bookDetailInfor">
						<h3 className="title">{detailProduct?.productName}</h3>
						<p className="author">{detailProduct?.description}</p>
						<p>Ngày ra mắt: {detailProduct?.datePublish}</p>
						<p>Danh mục sản phẩm: {detailProduct?.categoryName}</p>
						<p className="price">{`Đơn giá: ${detailProduct?.price}`}</p>
						<div className="quantity">
							<label>Số lượng mua:</label>
							<InputNumber
								className="inputNumber"
								min={1}
								defaultValue={1}
								onChange={handleChangeQuantity}
							/>
						</div>
						<p className="totalCost">{`Thành tiền: ${
							detailProduct?.price * quantity
						} VNĐ`}</p>
						<Button
							type="primary"
							style={{ width: "100%", height: 40, marginTop: 80 }}
							onClick={handleAddToCart}
						>
							Thêm vào giỏ hàng
						</Button>
					</div>
				</div>
				<div className="bookComment">
					{/* <Comment email={email} bookId={params.id} /> */}
				</div>
			</div>
		</>
	);
};
