import "../../asset/style/FilterComponent.scss";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { SearchParams } from "../../type/common";
import { categoryApi } from "../../api/categoryApi";
import { useState, useEffect, useRef } from "react";
import { CategoryType } from "../../type/type";
import { CONSTANT } from "../../constant/constant";
import { useSearchParams } from "react-router-dom";

export const FilterComponent = (): React.ReactElement => {
	const [optionsCategory, setOptionsCategory] = useState<any>();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || CONSTANT.DEFAULT_PAGE;
	const size = searchParams.get("size") || CONSTANT.DEFAULT_SIZE;
	const keyword = searchParams.get("keyword") || CONSTANT.DEFAULT_KEYWORD;

	const optionsPrice = [
		{ label: "100$", value: 100 },
		{ label: "120$", value: 120 },
		{ label: "200$", value: 200 },
	];

	useEffect(() => {
		handleGetAllCategory({
			page,
			size,
			keyword,
		});
	}, []);

	const timeOut: any = useRef();
	const onChange = (checkedValues: CheckboxValueType[]) => {
		if (timeOut.current) clearTimeout(timeOut.current);
		timeOut.current = setTimeout(() => {
			searchParams.set("filter", checkedValues.toString());
			setSearchParams(searchParams);
		}, 1000);
		console.log("checked = ", checkedValues);
	};

	const handleGetAllCategory = async (params: SearchParams): Promise<any> => {
		try {
			const res = await categoryApi.getAll(params);
			if (res?.data?.listCategory) {
				const arr = handleFormatData(res.data.listCategory);
				setOptionsCategory(arr);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFormatData = (data: any) => {
		const arr: CategoryType[] = data.map((item: any) => {
			return {
				label: item.categoryName,
				value: item.categoryId,
			};
		});
		return arr;
	};

	return (
		<div className="filter-component">
			<div className="filter-category">
				<span className="category">Category</span>
				<Checkbox.Group
					style={{ display: "flex", flexDirection: "column" }}
					options={optionsCategory}
					defaultValue={["Pear"]}
					onChange={onChange}
				/>
			</div>
			<div className="filter-price">
				<span className="price">Price</span>
				<Checkbox.Group
					style={{ display: "flex", flexDirection: "column" }}
					options={optionsPrice}
					defaultValue={[100]}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
