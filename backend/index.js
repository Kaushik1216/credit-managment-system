const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const session=require('express-session')
dotenv.config({ path: "./config/config.env" });
connectDB();
const mainRouter=require('./routes/mainrouter')
const MongoStore = require("connect-mongo");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
connectDB();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: false, secure: true},
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_DATABASE_URI }),
})
)
app.use("/", mainRouter);


app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Connection Established!! http://localhost:${port}`);
});
