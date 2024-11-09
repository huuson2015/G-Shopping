import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connect success");
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
		console.error(error.stack);
		process.exit(1);
	}
};

export default connectDB;
