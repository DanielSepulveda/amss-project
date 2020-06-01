import nextConnect from "next-connect";
import middleware from "../../middlewares";
import passport from "../../middlewares/passport";
import extractUser from "../../lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate("local"), (req, res) => {
	res.json({ user: extractUser(req.user) });
});

handler.delete((req, res) => {
	req.logOut();
	res.status(204).end();
});

export default handler;
