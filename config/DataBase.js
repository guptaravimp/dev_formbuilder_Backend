
const mongoose = require("mongoose");

require("dotenv").config();

exports.DBConnection = () => {
	mongoose
		.connect(process.env.DATABASE_URL)
		.then(() => console.log("Database connection successfull"))
		.catch((err) => {
			console.log(`DB CONNECTION ISSUES`);
			console.error(err.message);
			process.exit(1);
		});
};
