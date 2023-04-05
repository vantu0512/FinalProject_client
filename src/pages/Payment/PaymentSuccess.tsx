import { useEffect } from "react";
import { orderApi } from "../../api/OrderApi";
import { cartApi } from "../../api/cartApi";
import { useParams } from "react-router-dom";

export const PaymentSuccess = (): React.ReactElement => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const email = user.email;
	const params = useParams();

	useEffect(() => {
		handleEditOrder();
	}, []);

	const handleEditOrder = async (): Promise<any> => {
		try {
			const data = {
				email,
				isPurchase: true,
				orderId: params?.orderId,
			};
			const res = await orderApi.edit(data);
			if (res) {
				await handleDeleteAllCart();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteAllCart = async (): Promise<any> => {
		try {
			const params = {
				email,
			};
			const res = await cartApi.deleteAllCart(params);
			if (res) console.log("delete all cart: ", res?.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1>Thanh toán thành công</h1>
		</div>
	);
};
