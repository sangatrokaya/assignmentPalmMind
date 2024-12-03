import User from "../models/user.model.js";

const registerUser = async (req, res, next) => {
  let { name, email, password, age } = req.body;
  let userExists = await User.findOne({ email });
  if (userExists) {
    let err = new Error(`User with email ${email} already exists!`);
    err.status = 400; // bad request
    throw err;
  } else {
    let user = await User.create({
      name,
      email,
      password,
      age,
    });
    res.send({
      message: "User registered successfully!",
      user: {
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  }
};

export { registerUser };
