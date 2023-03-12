import { Button } from "antd";
import { categoryApi } from "../../api/categoryApi";

export const Category = (): React.ReactElement => {
	const handleGetAllCategory = async () => {
		try {
			const res = await categoryApi.create({
				categoryId: "ct1",
				name: "adidas",
			});
			if (res) console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Button onClick={handleGetAllCategory}>Fetch category</Button>
		</>
	);
};
