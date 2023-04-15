import "../../asset/style/Contact.scss";
import emailjs from "@emailjs/browser";
import {
	MailOutlined,
	InstagramOutlined,
	FacebookOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import { toast } from "react-toastify";
export const Contact = (): React.ReactElement => {
	const form1: any = useRef();

	const sendEmail = (e: any) => {
		e.preventDefault();
		emailjs
			.sendForm(
				"service_2qir8fl",
				"template_rnqykgu",
				form1.current,
				"QrRRO0bb5sqsoQ_Ut",
			)
			.then(
				(result) => {
					console.log(result.text);
					toast.success("Liên hệ thành công!");
				},
				(error) => {
					console.log(error.text);
				},
			);
	};
	return (
		<div className="contact">
			<div className="contact-bg">
				<div className="contact-left">
					<h1>Let's chat.</h1>
					<h1>Tell me about anything</h1>
					<h1>you want.</h1>
					<div className="something-together">
						Let's create something together
					</div>
					<div className="associate-network">
						<div className="app-email">
							<MailOutlined />
							<p>vantu0512@gmail.com</p>
						</div>
						<div className="app-email">
							<InstagramOutlined />
							<p>vantu0512@gmail.com</p>
						</div>
						<div className="app-email">
							<FacebookOutlined />
							<p>vantu0512@gmail.com</p>
						</div>
					</div>
				</div>
				<div className="contact-right">
					<div className="form-contact">
						<form ref={form1} onSubmit={sendEmail} className="form">
							<div className="row">
								<label>Name</label>
								<input type="text" name="user_name" />
							</div>
							<div className="row">
								<label>Email</label>
								<input type="email" name="user_email" />
							</div>
							<div className="row">
								<label>Message</label>
								<textarea name="message" />
							</div>
							<input type="submit" value="Send" className="btn" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
