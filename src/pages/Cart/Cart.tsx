import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../asset/style/Cart.scss";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { cartAction } from "../../store/action/cartAction";
import { AppDispatch, RootState } from "../../store/store";
import { CartType } from "../../type/type";
import StripeButton from "../Payment/Payment";
import { orderApi } from "../../api/OrderApi";

export const Cart = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const email = user.email;
	const listProduct = useSelector(
		(state: RootState) => state.cartReducer.arrProduct,
	);
	const [subTotal, setSubTotal] = useState<number>();
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		// Update network status
		const handleStatusChange = () => {
			setIsOnline(navigator.onLine);
		};

		// Listen to the online status
		window.addEventListener("online", handleStatusChange);

		// Listen to the offline status
		window.addEventListener("offline", handleStatusChange);

		// Specify how to clean up after this effect for performance improvment
		return () => {
			window.removeEventListener("online", handleStatusChange);
			window.removeEventListener("offline", handleStatusChange);
		};
	}, [isOnline]);

	useEffect(() => {
		handleGetAllCart(email);
	}, []);

	useEffect(() => {
		handleCalculateSubTotal(listProduct);
	}, [listProduct]);

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

	const handleAddToCart = async (data: CartType, type: boolean) => {
		try {
			const newData: CartType = {
				email: email,
				productId: data?.productId,
				productName: data?.productName,
				imgUrl: data?.imgUrl,
				price: data?.price,
				quantity: type ? 1 : -1,
			};
			await dispatch(cartAction.addToCart(newData));
		} catch (e) {
			console.log("error: ", e);
		}
	};

	const handleCalculateSubTotal = (data: any[]) => {
		let total: any = 0;
		data.forEach((item) => {
			total += item?.price * item?.quantity;
		});
		setSubTotal(total);
	};

	const submitHandler = async (token: any) => {
		console.log("submit: ", token);

		const orderInfor = {
			cartId: "6424633274ac4508ed41b463",
		};

		try {
			console.log("here");
			const res = await orderApi.checkout(orderInfor);
			if (res) console.log("result: ", res);
		} catch (error) {
			console.log("err:", error);
		}
	};

	return (
		<div className="cart">
			<Row>
				<Col span={18}>
					<div className="cart-list">
						{listProduct && listProduct.length > 0 ? (
							listProduct.map((item) => {
								return (
									<div className="cart-item">
										<div className="cart-left">
											<img
												src={item?.imgUrl}
												alt=""
												className="productImg"
												onClick={() => {
													navigate(
														`/detail-product/${item?.productId}`,
													);
												}}
											/>
										</div>
										<div className="cart-mid">
											<span>{item?.productName}</span>
											<span>{item?.price} VNĐ</span>
											<div className="quantity">
												<div className="quantity-minus">
													<MinusOutlined
														style={{
															cursor: "pointer",
														}}
														onClick={() => {
															item?.quantity >
																1 &&
																handleAddToCart(
																	item,
																	false,
																);
														}}
													/>
												</div>
												<div className="quantity-number">
													{item?.quantity}
												</div>
												<div className="quantity-plus">
													<PlusOutlined
														style={{
															cursor: "pointer",
														}}
														onClick={() =>
															handleAddToCart(
																item,
																true,
															)
														}
													/>
												</div>
											</div>
											<span>
												{item?.price * item?.quantity}{" "}
												VNĐ
											</span>
										</div>
										<div className="cart-right">
											<CloseOutlined
												style={{
													fontSize: 20,
													color: "red",
												}}
												onClick={() => {
													handleRemoveFromCart(item);
												}}
											/>
										</div>
									</div>
								);
							})
						) : (
							<h1 style={{ color: "red" }}>
								Không có sản phẩm nào trong giỏ hàng
							</h1>
						)}
					</div>
				</Col>
				<Col span={6}>
					<div className="cart-summary">
						<div className="summary-header">Order summary</div>
						<div className="summary-detail ">
							<div className="summary-detail-item summary-sub-total">
								<label>Sub total:</label>
								<span>{`${subTotal} VNĐ`}</span>
							</div>
							<div className="summary-detail-item summary-shipping">
								<label>Shipping:</label>
								<span>20000 VNĐ</span>
							</div>
							<div className="summary-detail-item summary-pay-method">
								<label>Pay method:</label>
								<span>Momo</span>
							</div>
							<div className="summary-total">
								{`${subTotal && subTotal + 20000} VNĐ`}
							</div>
						</div>
						<div className="summary-payment">
							{isOnline && (
								<StripeButton
									price={subTotal && subTotal + 20000}
									email={email ?? ""}
									disabled={subTotal === 0 ? true : false}
									callbackFn={submitHandler}
								/>
							)}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};
