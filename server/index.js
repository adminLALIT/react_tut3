const express = require("express");
const cors = require("cors");
const route = require("./routes");
const cookieParser = require("cookie-parser");
require("./config");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/api", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));
