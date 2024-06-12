const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const express = require("express");
const { cors } = require("./middlewares/app");
const authRouter = require("./routes/auth.router");
const routes = require("./routes/routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

if (!process.env.JWT_SECRET) {
  console.error(
    "Please set JWT_SECRET as an environment variable in .env file"
  );
  process.exit(1);
}

app.use("/api/auth", authRouter);
app.use("/api/", routes);

app.listen(3000, () => {
  console.log("Server udah jalan! di port 3000");
});
