export type CartType = {
	email?: string;
	productId?: string;
	quantity?: number;
	price?: number;
	imgUrl?: string;
	productName?: string;
};

export type UserType = {
	email: string;
	password?: string;
	gender?: string;
	age?: string;
	role?: string;
};

export type ProductType = {
	_id: string;
	productName: string;
	price: string;
	imgUrl?: string;
};

export type RouteApp = {
	href: string;
	isPublic: boolean;
	element: JSX.Element;
};
