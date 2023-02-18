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

export type DataTypeProDuct = {
	key: string;
	name: string;
	brand: string;
	thumbnail_url: string;
	quantity?: number;
	sold?: number;
	description?: string;
	specifications?: string;
	sale_percent?: number;
	price: number;
	type: number;
};

export type DataTypeStaff = {
	key: string;
	nick_name: string;
	birthday?: Date;
	address?: string;
	phone_number?: string;
	avatar_url?: string;
	gender?: number;
	email?: string;
	username: string;
};
