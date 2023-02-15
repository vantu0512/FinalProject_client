export const Home: React.FC = () => {
	return (
		<>
			<input
				type="file"
				onChange={(e) => {
					console.log("check: ", e.target.files);
				}}
			/>
		</>
	);
};
