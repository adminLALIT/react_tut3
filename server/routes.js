const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
require("./config");
const { User, UserInfo } = require("./model");
const { UserImage } = require("./model");
const { Counter } = require("./model");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

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

// Register and Login
router.post("/create", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let seqId = await addCounter("users");
      if (seqId) {
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
          const data = { ...result._doc };
          delete data.password;
          const accessToken = generateAccessToken(data);
          const refreshToken = generateRefreshToken(data);
          refreshTokens.push(refreshToken);
          data.accessToken = accessToken;
          data.refreshToken = refreshToken;
          console.log("Date inserted in the user collection successfully.");
          res
            .status(201)
            .json({ success: true, msg: "New User Created", data: data });
        } else {
          console.log("Date insertion failed!");
        }
      } else {
        res.status(500).send("Error updating Counter");
      }
    } else {
      res.status(409).json({ success: false });
    }
  } catch (err) {
    res.status(409).json(err);
  }
});

// Upload Profile Image
router.post("/uploadImage", upload, async (req, res) => {
  try {
    let file = req.body.file;
    let user = req.body.user;
    let userExist = await UserImage.findOne({ userId: user.id });
    if (userExist) {
      const result = await UserImage.updateOne(
        { id: userExist.id },
        {
          $set: {
            filename: file.filename,
            filetype: file.type,
            filepath: file.filepath,
          },
        }
      );

      if (result) {
        console.log("Image Updated Successfully");
        res
          .status(200)
          .json({ msg: "Image Updated Successfully", status: "success" });
      } else {
        console.log("Date insertion failed!");
        res.status(409).json({ msg: "Date insertion failed!", status: "fail" });
      }
    } else {
      let seqId = await addCounter("userimages");
      if (seqId) {
        let image = new UserImage({
          id: seqId,
          userId: user.id,
          filename: file.filename,
          filetype: file.type,
          filepath: file.filepath,
        });
        const result = await image.save();
        if (result) {
          console.log("Image Uploaded Successfully");
          res
            .status(200)
            .json({ msg: "Image Uploaded Successfully", status: "success" });
        } else {
          console.log("Date insertion failed!");
          res
            .status(409)
            .json({ msg: "Date insertion failed!", status: "fail" });
        }
      } else {
        res.status(500).send("Error updating Counter");
      }
    }
  } catch (err) {
    res.status(409).json(err);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ id: userId });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        console.log("Password Verified");
        res.status(200).json({ status: "success", msg: "Password Verified" });
      } else {
        console.log("Password not correct");
        res.status(401).json({ status: "fail", msg: "Password not correct" });
      }
    } else {
      console.log("User not found!");
      res.status(404).send("User not found!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Info
router.post("/updateinfo", async (req, res) => {
  try {
    let userId = req.body.userId;
    const userExist = await UserInfo.findOne({ userId: userId });
    if (userExist) {
      const result = await UserInfo.updateOne(
        { userId: userId },
        {
          $set: req.body,
        }
      );

      if (result) {
        console.log(
          `Userinfo for userid ${userId} has been successfully updated`
        );
        res.status(200).json({
          status: "success",
          msg: `Userinfo for userid ${userId} has been successfully updated`,
        });
      } else {
        console.log("Userinfo could not be updated!");
        res
          .status(409)
          .json({ msg: "Userinfo could not be updated!", status: "fail" });
      }
    } else {
      let seqId = await addCounter("userinfo");
      if (seqId) {
        const userInfo = await UserInfo({
          id: seqId,
          userId: userId,
          profession: req.body.profession,
          bio: req.body.bio,
        });
        const result = userInfo.save();
        if (result) {
          console.log(
            `Userinfo for userid ${userId} has been successfully updated`
          );
          res.status(200).json({
            msg: `Userinfo for userid ${userId} has been successfully updated`,
            status: "success",
          });
        } else {
          console.log("Date insertion failed!");
          res
            .status(409)
            .json({ msg: "Date insertion failed!", status: "fail" });
        }
      } else {
        res.status(500).send("Error updating Counter");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

// Get User Info
router.get("/getinfo/:id", async (req, res) => {
  try{
    const userId = req.params.id;
    const result = await UserInfo.findOne({userId});
    if(result){
      res.status(200).json({ status: "success", userinfo: result });
    } else{
      console.log("Record Not Found!");
      res.status(404).json({ status: "fail" });
    }
  } catch(err){
    console.log(err);
    res.status(500).send("Server Error!");
  }
})

// Get User Image
router.get("/getimage", async (req, res) => {
  try {
    let userId = req.query.id;
    const result = await UserImage.findOne({ userId: userId });
    if (result) {
      res.status(200).json({ status: "success", data: result });
    } else {
      console.log("Record Not Found!");
      res.status(404).json({ status: "fail" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error!");
  }
});

// Check if email already exists
router.post("/checkemail", async (req, res) => {
  try {
    const { userId, email } = req.body;
    const result = await User.findOne(
      { id: { $ne: userId }, email },
      { _id: 0 }
    );
    if (result) {
      console.log("Email Id already exists!");
      res
        .status(200)
        .json({ status: "success", msg: "Email Id already exists!" });
    } else {
      res.status(200).json({ status: "fail" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error!");
  }
});

// Update User Profile Data
router.post("/update", async (req, res) => {
  try {
    const { userId, name, phone, email, password } = req.body;
    const hashPass = bcrypt.hash(password, 10);
    const result = await User.updateOne(
      { id: userId },
      { $set: { name, email, phone, hashPass } }
    );
    if (result) {
      console.log("User Updated Successfully");
      res
        .status(201)
        .json({ status: "success", msg: "User Updated Successfully" });
    } else {
      console.log("User could not be update. Please Send the request again!");
      res
        .status(205)
        .json({
          status: "fail",
          msg: "User could not be update. Please Send the request again!",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error!");
  }
});

// Creating Auto Incrementing with Counters
async function addCounter(collection) {
  try {
    const cd = await Counter.findOneAndUpdate(
      { id: collection },
      { $inc: { seq: 1 } },
      { new: true }
    );
    let seqId;
    if (cd == null) {
      const newval = new Counter({ id: collection, seq: 1 });
      await newval.save();
      seqId = 1;
    } else {
      seqId = cd.seq;
    }
    return seqId;
  } catch (err) {
    console.log("Error updating Counter: ", err);
    return err;
  }
}

// Refresh Tokens
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
    expiresIn: "1d",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

// Login and send tokens
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (bcrypt.compare(password, user.password)) {
      // Generate jwt access token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.cookie("token", accessToken);

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        suspended: user.suspended,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400).send("Username or password incorrect");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

const verify = (req, res, next) => {
  const authHeader = req.body.headers.authorization;
  // console.log(req.body.headers.authorization);
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

//Logout
router.post("/logout", verify, (req, res) => {
  // const refreshToken = req.body.token;
  // refreshTokens = refreshTokens.filter((token) => {
  //   token !== refreshToken;
  // });
  res.status(200).send("You logged out successfully");
});

// Email Configuration
router.post("/email", (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "lalit.yatharthriti@gmail.com",
        pass: "cmbmtzedbxxqtbjc",
      },
    });

    const mailOptions = {
      from: email,
      to: "lalit.yatharthriti@gmail.com",
      subject: `New mail from ${name}`,
      text: `Sender's mail : ${email} \n${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Mail Error", err);
        res.status(500).json({ msg: "Error in sending mail!", status: true });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ msg: "Email sent successfully", status: false });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in sending mail!", status: true });
  }
});

module.exports = router;
