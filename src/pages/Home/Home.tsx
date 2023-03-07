import { Card, Carousel, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import "../../asset/style/Home.scss";
import adidas from "../../asset/video/adidas.mp4";
import nike from "../../asset/video/nike.mp4";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../../store/store";
export const Home = (): React.ReactElement => {
	// const navigate = useNavigate();
	// const userAccessToken = useSelector(
	// 	(state: RootState) => state.userReducer.accessToken,
	// );
	return (
		<>
			<div className="home">
				<div className="banner">
					<video
						autoPlay
						muted
						loop
						style={{
							width: "100%",
							height: "86vh",
							objectFit: "cover",
						}}
					>
						<source src={adidas} type="video/mp4" />
					</video>
					<video
						autoPlay
						muted
						loop
						style={{
							width: "100%",
							height: "86vh",
							objectFit: "cover",
						}}
					>
						<source src={nike} type="video/mp4" />
					</video>
					<Carousel autoplay>
						<div>
							<video
								autoPlay
								muted
								loop
								style={{
									width: "100%",
									height: "86vh",
									objectFit: "cover",
								}}
							>
								<source src={adidas} type="video/mp4" />
							</video>
						</div>
						<div>
							<video
								autoPlay
								muted
								loop
								style={{
									width: "100%",
									height: "86vh",
									objectFit: "cover",
								}}
							>
								<source src={adidas} type="video/mp4" />
							</video>
						</div>
						<div>
							<video
								autoPlay
								muted
								loop
								style={{
									width: "100%",
									height: "86vh",
									objectFit: "cover",
								}}
							>
								<source src={adidas} type="video/mp4" />
							</video>
						</div>
						<div>
							<video
								autoPlay
								muted
								loop
								style={{
									width: "100%",
									height: "86vh",
									objectFit: "cover",
								}}
							>
								<source src={adidas} type="video/mp4" />
							</video>
						</div>
						<div>
							<video
								autoPlay
								muted
								loop
								style={{
									width: "100%",
									height: "86vh",
									objectFit: "cover",
								}}
							>
								<source src={adidas} type="video/mp4" />
							</video>
						</div>
					</Carousel>
				</div>
				<div className="trending">
					<div className="trending-title">Trending</div>
					<Row>
						<Col span={8}>
							<Card
								className="trending-item"
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
						<Col span={8}>
							<Card
								className="trending-item"
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
						<Col span={8}>
							<Card
								className="trending-item"
								hoverable
								cover={
									<img
										alt="example"
										src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto,fl_lossy,c_fill,g_auto/cb1316406e584892bdb3a991001bd46d_9366/F35543_01_standard.jpg"
									/>
								}
							>
								<Meta
									title="Europe Street beat"
									description="www.instagram.com"
								/>
							</Card>
						</Col>
						<Col span={8}>
							<Card
								className="trending-item"
								hoverable
								cover={
									<img
										alt="example"
										src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto,fl_lossy,c_fill,g_auto/cb1316406e584892bdb3a991001bd46d_9366/F35543_01_standard.jpg"
									/>
								}
							>
								<Meta
									title="Europe Street beat"
									description="www.instagram.com"
								/>
							</Card>
						</Col>
						<Col span={8}>
							<Card
								className="trending-item"
								hoverable
								cover={
									<img
										alt="example"
										src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto,fl_lossy,c_fill,g_auto/cb1316406e584892bdb3a991001bd46d_9366/F35543_01_standard.jpg"
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
					<Row>
						<Col span={12}>
							<Card
								className="trending-item"
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
								className="trending-item"
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
