import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import User from "models/users";
import signupSchema from "lib/schemas/signup";
import middleware from "../../middlewares";
import extractUser from "../../lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
	const { password, ...values } = req.body;

	values.email = normalizeEmail(values.email);

	if (!isEmail(values.email)) {
		res.status(400).send("The email you entered is invalid.");
		return;
	}

	try {
		await signupSchema.validate({ ...values, password });
	} catch (e) {
		console.log(e);
		res.status(400).send("Missing field(s)");
		return;
	}

	if (
		(await User.countDocuments({
			$or: [{ email: values.email }, { phone: values.phone }],
		})) > 0
	) {
		res.status(403).send("The email or phone have already been used.");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		...values,
		password: hashedPassword,
	});

	req.logIn(user, (err) => {
		if (err) throw err;

		res.status(201).json({
			user: extractUser(req),
		});
	});
});

export default handler;
