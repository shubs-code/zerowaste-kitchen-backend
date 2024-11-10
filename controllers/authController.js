const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const { JWT_SECRET } = require("../constants/constants");

const generateToken = (data) => {
  return jwt.sign({ data }, JWT_SECRET, { expiresIn: "4h" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, location, isOrganization, mobileNumber } =
      req.body;

    console.log(req.body);

    if (!name || !email || !password || !location || !mobileNumber) {
      return res.status(200).json({
        statusText: "incorrect-data-sent",
      });
    }

    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(200).json({
        statusText: "user-already-exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userId = uuid.v4();

    const user = await User.create({
      name,
      location,
      password: hash,
      userId: userId,
      email,
      username: email,
      mobileNumber,
      isOrganization,
    });

    if (!user) {
      return res.status(200).json({
        statusText: "failed",
        user: null,
      });
    }
    return res.status(200).json({
      statusText: "success",
      user: userId,
    });
  } catch (error) {
    console.log("Error from authController's register", error);
    return res.status(500).json({
      statusText: "failed",
      user: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { query, password } = req.body;

    if (!query || !password) {
      return res.status(400).json({
        statusText: "invalid-data",
        user: null,
        token: null,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: query }, { username: query }],
    });

    if (!existingUser) {
      return res.status(404).json({
        statusText: "invalid-credentials",
        user: null,
        token: null,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        statusText: "invalid-credentials",
        user: null,
        token: null,
      });
    }

    existingUser.password = "";

    return res.status(200).json({
      statusText: "success",
      user: existingUser,
      token: generateToken(existingUser._id),
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      statusText: "internal-server-error",
      user: null,
      token: null,
    });
  }
};

const getNgo=async(req, res)=>{
  try{
    const ngos=await User.find({isOrganization: true});
    if(ngos){
      res.status(200).json(ngos);
    }
  }
  catch(error){
    console.log(error);
    res.status(400).send("Error occured ");
  }
}

module.exports = {
  login,
  registerUser,
  getNgo
};
