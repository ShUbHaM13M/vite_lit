type Address = {
	street: string,
	suite: string,
	city: string,
	zipcode: string,
	geo: {
		lat: string,
		lng: string,
	}
}

type CompanyDetail = {
	name: string,
	catchPhrase: string,
	bs: string,
}

export type User = {
	id: number,
	name: string,
	email: string,
	username: string,
	address: Address,
	phone: string,
	website: string,
	company: CompanyDetail,
}