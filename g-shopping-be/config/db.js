import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connect success");
	} catch (error) {
		console.log(`ERROR: ${error.massage}`);
		process.exit(1);
	}
};

export default connectDB;
