const extractCategory = (req) => {
	if (!req.user) return null;

	const { _id, nameCategory } = req.user;

	return {
		_id,
		nameCategory,
	};
};

export default extractCategory;
