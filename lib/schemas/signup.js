import { string, object, ref, number } from "yup";

const schema = object().shape({
	name: string().required("Please provide a name"),
	email: string()
		.required("Please provide an email")
		.email("Please provide a valid email"),
	phone: string().required("Please provide a phone number"),
	password: string().required("Please provide a password").min(8),
	confirmPassword: string()
		.oneOf([ref("password"), null], "Passwords must match")
		.required("Please confirm password"),
	type: string().required("Please provide a user type"),
	lat: number().when("type", {
		is: "place",
		then: number().required("Please provide a latitude"),
		otherwise: number().notRequired(),
	}),
	lng: number().when("type", {
		is: "place",
		then: number().required("Please provide a longitude"),
		otherwise: number().notRequired(),
	}),
	description: string().when("type", {
		is: "place",
		then: string().required("Please provide a description"),
		otherwise: string().notRequired(),
	}),
	address: string().when("type", {
		is: "place",
		then: string().required("Please provide an address"),
		otherwise: string().notRequired(),
	}),
});

export default schema;
