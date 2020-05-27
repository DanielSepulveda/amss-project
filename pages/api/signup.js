import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import User from "models/users";
import middleware from "../../middlewares";
import extractUser from "../../lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
	const { name, lastname, password } = req.body;
	const email = normalizeEmail(req.body.email);

	if (!isEmail(email)) {
		res.status(400).send("The email you entered is invalid.");
		return;
	}

	if (!password || !name) {
		res.status(400).send("Missing field(s)");
		return;
	}

	if ((await User.countDocuments({ email })) > 0) {
		res.status(403).send("The email has already been used.");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		email,
		password: hashedPassword,
		name,
		lastname,
	});

	req.logIn(user, (err) => {
		if (err) throw err;

		res.status(201).json({
			user: extractUser(req),
		});
	});
});

export default handler;
