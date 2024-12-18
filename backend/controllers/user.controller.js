import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let userExists = await User.findOne({ email });
    if (userExists) {
      let err = new Error(`User with email ${email} already exists!`);
      err.status = 400; // bad request
      throw err;
    } else {
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      let user = await User.create({ ...req.body, password: hashedPassword });
      res.send({
        message: "User registered successfully!",
        user: {
          name: user.name,
          email: user.email,
          age: user.age,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      let err = new Error(`${email} not registered!`);
      err.status = 400;
      throw err;
    }
    let matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      let err = new Error(`Invalid password!`);
      err.status = 400;
      throw err;
    } else {
      res.send({ message: "Login Success!" });
    }
  } catch (err) {
    next(err);
  }
};

export { registerUser, userLogin };
