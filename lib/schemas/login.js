import { string, object } from "yup";

const schema = object().shape({
	email: string()
		.required("Please provide an email")
		.email("Please provide a valid email"),
	password: string().required("Please provide a password"),
});

export default schema;
