const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/react_tut3")
  .then(() => {
    console.log("Connected to databse react_tut3");
  })
  .catch(() => {
    console.log("Connection to the database failed!");
  });
  
