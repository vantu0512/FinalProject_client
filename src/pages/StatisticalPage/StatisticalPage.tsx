import {
	Chart as ChartJS,
	BarElement,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

export const StatisticalPage: React.FC = () => {
	ChartJS.register(
		BarElement,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement,
		Tooltip,
		Legend,
	);
	const data = {
		labels: [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		],
		datasets: [
			{
				label: "Day",
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(255, 159, 64, 0.2)",
					"rgba(255, 205, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(201, 203, 207, 0.2)",
				],
				borderColor: [
					"rgb(255, 99, 132)",
					"rgb(255, 159, 64)",
					"rgb(255, 205, 86)",
					"rgb(75, 192, 192)",
					"rgb(54, 162, 235)",
					"rgb(153, 102, 255)",
					"rgb(201, 203, 207)",
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<div
			style={{
				height: "100%",
				overflowY: "scroll",
				padding: 40,
			}}
		>
			<div
				className="chart"
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%%",
					height: "100%",
				}}
			>
				<Bar data={data}></Bar>
				<Line data={data}></Line>
			</div>
		</div>
	);
};
