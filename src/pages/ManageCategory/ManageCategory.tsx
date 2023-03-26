import { Button } from "antd";
import { categoryApi } from "../../api/categoryApi";

export const ManageCategory = (): React.ReactElement => {
	const handleGetAllCategory = async () => {
		try {
			const res = await categoryApi.add({
				categoryId: "ct1",
				categoryName: "adidas",
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
