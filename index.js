const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const expHbs = require("express-handlebars");
const connectDB = require("./src/utils/db");
const jwtvalidate = require("./src/middleware/authMiddleware");
const session = require("./src/middleware/sessionMiddleware");
const seatRoute = require("./src/routes/eventBookingRouter");
const userRoute = require("./src/routes/loginRouter");
const eventRoute = require("./src/routes/eventRouter");
const { sendNotificationToClient } = require("./src/utils/nofity");
const getToken  = require("./src/utils/gettoken");

// const messaging=require('./src/utils/firebaseInit');
// const { tokenman } = require("./src/utils/gettoken");
const PORT = process.env.PORT;
 console.log(sendNotificationToClient);
 console.log(getToken)
//  console.log(messaging);
//  console.log(tokenman)
mongoose.set("strictQuery", true);

connectDB();

app.use("/static", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", expHbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(cors());
app.use(session);

app.use("/", userRoute);
app.use("/", seatRoute);
app.use("/event", eventRoute);

app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`Server is run on ${PORT}`);
});
