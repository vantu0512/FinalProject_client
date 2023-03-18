import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";

export const PaginationComponent = (): React.ReactElement => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChangePage = (page: number) => {
		searchParams.set("page", page.toString());
		setSearchParams(searchParams);
	};
	return (
		<>
			<Pagination
				defaultCurrent={1}
				total={50}
				onChange={(page) => handleChangePage(page)}
			/>
		</>
	);
};
