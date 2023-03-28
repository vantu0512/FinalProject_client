import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../asset/style/Cart.scss";
import { cartAction } from "../../store/action/cartAction";
import { AppDispatch, RootState } from "../../store/store";

export const Cart = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const email = user.email;
	const listProduct = useSelector(
		(state: RootState) => state.cartReducer.arrProduct,
	);

	useEffect(() => {
		handleGetAllCart(email);
	}, []);

	const handleGetAllCart = async (email: any) => {
		try {
			await dispatch(cartAction.getAllCart(email));
		} catch (e) {
			console.log("err: ", e);
		}
	};

	const handleRemoveFromCart = async (data: any) => {
		try {
			const params = {
				email: email,
				productId: data.productId,
			};
			await dispatch(cartAction.removeFromCart(params));
		} catch (e) {
			console.log("err: ", e);
		}
	};

	return (
		<>
			{listProduct && listProduct.length > 0 ? (
				listProduct.map((item) => {
					return (
						<div className="cart">
							<img
								src={item?.imgUrl}
								alt=""
								className="bookImg"
								onClick={() => {
									navigate(
										`/detail-product/${item?.productId}`,
									);
								}}
							/>
							<div className="cart-right">
								<div className="bookDetailInfor">
									<h3>{item?.title}</h3>
									<p
										style={{ marginTop: 4 }}
									>{`Tên sản phẩm: ${item?.productName}`}</p>
									<p
										style={{ marginTop: 4 }}
									>{`Đơn giá: ${item?.price} VNĐ`}</p>
									<p
										style={{ marginTop: 4 }}
									>{`Số lượng đặt: ${item?.quantity}`}</p>
								</div>
								<Button
									type="primary"
									onClick={() => {
										handleRemoveFromCart(item);
									}}
								>
									Hủy đặt hàng
								</Button>
							</div>
						</div>
					);
				})
			) : (
				<h1 style={{ color: "red" }}>
					Không có sản phẩm nào trong giỏ hàng
				</h1>
			)}
		</>
	);
};
