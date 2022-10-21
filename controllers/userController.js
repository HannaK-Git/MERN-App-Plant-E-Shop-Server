const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Basket = require("../models/Basket");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async reqistration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("email or password was not specified"));
    }
    const candidate = await User.findOne({ email }).exec();
    if (candidate) {
      return next(ApiError.badRequest("user with this email already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = new User({
      email,
      role: role || "USER",
      password: hashPassword,
    });
    await user.save();
   
    const basket = await Basket.create({ user_id: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return next(ApiError.internal("user with this email was not found"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("password is incorrect"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    res.json({ token });
  }
}

module.exports = new UserController();
