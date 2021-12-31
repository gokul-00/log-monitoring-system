const app = require("./app");
const db = require("./db");
const port = process.env.PORT || 3001;

db.connect().then(() => {
	console.log("Connected to MongoDB: " + db.url);

	app.listen(port, () => console.log(`Server started on port ${port}...`));
});
