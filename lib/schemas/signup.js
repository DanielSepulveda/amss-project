import { string, object, ref } from "yup";

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
});

export default schema;