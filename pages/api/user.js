import nextConnect from "next-connect";
import middleware from "../../middlewares";
import extractUser from "../../lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	const user = extractUser(req);

	res.json({ user });
});

export default handler;
