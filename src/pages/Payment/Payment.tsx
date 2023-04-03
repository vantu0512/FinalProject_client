import StripeCheckout from "react-stripe-checkout";

type Props = {
	price: any;
	email: any;
	disabled: any;
	callbackFn: any;
};
const StripeButton = ({ price, email, disabled, callbackFn }: Props) => {
	const exchangePrice = price * 100;
	const successAction = (token: any) => {
		successAction(callbackFn(token));
	};

	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		/* @ts-ignore */
		<StripeCheckout
			name="Hóa đơn thanh toán"
			email={email}
			description={`Your total is $${price}`}
			amount={exchangePrice}
			panelLabel="Thanh toán ngay"
			token={successAction}
			stripeKey={
				"pk_test_51Ms1qKD8Zu3841aLQhySm3dx2BnK7Bwir8OHiBxvpjCXu9knwAQjErz4edOYZJuq9BuL3PiaSb4rPaptGB4SmfCB00LmRYHWgd"
			}
			ComponentClass="div"
		>
			<button type="button" disabled={disabled}>
				Thanh toán
			</button>
		</StripeCheckout>
	);
};

export default StripeButton;
