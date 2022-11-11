const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
connectDB();
const mainRouter=require('./routes/mainrouter')
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
connectDB();

app.use("/", mainRouter);


app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Connection Established!! http://localhost:${port}`);
});
