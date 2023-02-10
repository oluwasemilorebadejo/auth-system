const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" }); // set before importing app cos app needs access to env variables

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const app = require("./app");

const port = process.env.PORT || 8000;

server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
