const express = require("express");
const app = express();

require("dotenv").config();
require("./connection/conn");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path=require("path");
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://taskify.vercel.app"  // Vercel frontend
    ],
    credentials: true,
  })
);


const usersApi = require("./controllers/user");
const tasksApi = require("./controllers/task");

app.use(express.json());
app.use("/api/v1", usersApi);
app.use("/api/v1", tasksApi);


// app.get("/", (req, res) => {
//   app.use(express.static (path.resolve(__dirname, "client", "dist"))); 
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });
app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});
// if(require.main ===module){
//  app.listen(process.env.PORT, () => {
//    console.log(`Server Started : ${process.env.PORT}`);
//  });
// }
module.exports=app;
