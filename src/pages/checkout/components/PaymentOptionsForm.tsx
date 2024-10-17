import Image from "next/image";
import React from "react";

const PaymentOptionsForm: React.FC = () => {
	const [, setPaymentOption] = React.useState<string>("credit-card");

	const handlePaymentOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentOption(e.target.value);
	};

	return (
		<div className="payment-cont">
			<h2>Payment</h2>
			<form id="payment-options-form">
				<div className="payment-option">
					<input
						type="radio"
						id="credit-card"
						name="payment-option"
						value="credit-card"
						defaultChecked
						onChange={handlePaymentOptionChange}
					/>
					<label htmlFor="credit-card">
						<Image
							src="/images/mastercard.jpeg"
							alt="Credit Card"
							width={80}
							height={50}
						/>
						<p>Credit Card</p>
					</label>
				</div>
				<div className="payment-option">
					<input
						type="radio"
						id="paypal"
						name="payment-option"
						value="paypal"
						onChange={handlePaymentOptionChange}
					/>
					<label htmlFor="paypal">
						<Image src="/images/paypal.png" alt="PayPal" width={60} height={50} />
						<p>PayPal</p>
					</label>
				</div>
				<div className="payment-option">
					<input
						type="radio"
						id="google-pay"
						name="payment-option"
						value="google-pay"
						onChange={handlePaymentOptionChange}
					/>
					<label htmlFor="google-pay">
						<Image src="/images/gpay.png" alt="Google Pay" width={80} height={50} />
						<p>Google Pay</p>
					</label>
				</div>
				<div className="payment-option">
					<input
						type="radio"
						id="apple-pay"
						name="payment-option"
						value="apple-pay"
						onChange={handlePaymentOptionChange}
					/>
					<label htmlFor="apple-pay">
						<Image src="/images/applepay.jpg" alt="Apple Pay" width={80} height={50} />
						<p>Apple Pay</p>
					</label>
				</div>
				<button type="submit">Pay</button>
			</form>
		</div>
	);
};

export default PaymentOptionsForm;
