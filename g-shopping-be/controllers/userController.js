import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		throw new Error("Please fill all the inputs");
	}

	const userExists = await User.findOne({ email });
	if (userExists) res.status.send("User already exists");
	const newUser = new User({ username, email, password });
});

export { createUser };
