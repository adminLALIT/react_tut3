const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
require("./config");
const { User } = require("./model");
const { UserImage } = require("./model");
const { Counter } = require("./model");
const bcrypt = require("bcryptjs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("file");

router.get("/getdata", (req, res) => {
  res.send({ msg: "This is home page" });
});

router.post("/create", async (req, res) => {
  let seqId;

  try {
    const cd = await Counter.findOneAndUpdate(
      { id: "users" },
      { $inc: { seq: 1 } },
      { new: true }
    );
    if (cd == null) {
      const newval = new Counter({ id: "users", seq: 1 });
      await newval.save();
      seqId = 1;
    } else {
      seqId = cd.seq;
    }
  } catch (err) {
    console.log("Error updating Counter: ", err);
    res.status(500).send("Error updating Counter");
  }

  let password = req.body.password;
  password = await bcrypt.hash(password, 10);

  let user_info = new User({
    id: seqId,
    name: req.body.name,
    email: req.body.email,
    password: password,
    phone: req.body.phone,
  });

  const result = await user_info.save();
  if (result) {
    console.log("Date inserted in the user collection successfully.");
  } else {
    console.log("Date insertion failed!");
  }

  res.send("Data sent to Server");
});

router.post("/uploadImage", upload, async (req, res) => {
  let file = req.file;
  let image = new UserImage({
    image: file.filename,
  });
  const result = await image.save();
  if (result) {
    console.log("Date inserted successfully");
    console.log(result);
    res.json(result);
  } else {
    console.log("Date insertion failed!");
  }
});
router.post("/update", async (req, res) => {
  console.log(req.body);
  res.send("Data sent to Server");
});

router.post("/post", async (req, res) => {
  try {
    const cd = await Counter.findOneAndUpdate(
      { id: "users" },
      { $inc: { seq: 1 } },
      { new: true }
    );
    let seqId;
    if (cd == null) {
      const newval = new Counter({ id: "users", seq: 1 });
      await newval.save();
      seqId = 1;
    } else {
      seqId = cd.seq;
    }
    res.send("Posted");
  } catch (err) {
    console.log("Error updating Counter: ", err);
    res.status(500).send("Error updating Counter");
  }
});

const users = [
  {
    id: 1,
    username: "John",
    password: "John@123",
    isAdmin: true,
  },
  {
    id: 2,
    username: "Sara",
    password: "Sara@123",
    isAdmin: false,
  },
];

let refreshTokens = [];

router.post("/refresh", (req, res) => {
  //Take the refresh token from user
  const refreshToken = req.body.token;

  // Send error if there is no token or if it's invalid
  if (!refreshToken) return res.status(401).send("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("Refresh Token is not valid!");
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.error(err);
    refreshTokens = refreshTokens.filter((token) => {
      token !== refreshToken;
    });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  // If everything is ok, create new access token, refresh token and send it to user
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "15m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    // Generate jwt access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).send("Username or password incorrect");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).send("Invalid Token!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("You are not authenticated");
  }
};

router.delete("/delete/users/:userId", verify, (req, res) => {
  if (req.user.id == req.params.userId || req.user.isAdmin) {
    res.status(200).send("User deleted Successfully");
  } else {
    res.status(403).send("You are not authorized to delete this user");
  }
});

router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => {
    token !== refreshToken;
  });
  res.status(200).send("You logged out successfully");
});

module.exports = router;
