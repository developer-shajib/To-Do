import validator from 'validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

/**
 * @DESC Register a User
 * @ROUTE /api/v1/auth/register
 * @method POST
 * @access public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   <!-- User validation -->
  if (!name) {
    return res.status(400).json({ error: 'Provide your name' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Provide your email' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Provide a valid email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Provide your password' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password length should be minimum 6 character' });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: 'Email already exist' });
  }

  // make password to hash
  const hashPass = await bcrypt.hash(password, 10);

  //   <!-- Create User -->
  const createUser = await User.create({
    name,
    email,
    password: hashPass
  });

  //   <!-- create Token -->
  const token = jwt.sign({ id: createUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN });
  res.status(201).json({ user: createUser, message: 'Account created success', token });
});

/**
 * @DESC Login a User
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async (req, res) => {
  // Data validations

  if (!req.body.email || !req.body?.password) {
    return res.status(400).json({ error: 'Provide your email & password' });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: 'Provide a valid email' });
  }

  const user = await User.findOne({ email: req.body?.email });

  if (!user) {
    return res.status(400).json({ error: 'You have no account' });
  }

  // check password
  const passCheck = await bcrypt.compare(req.body?.password, user?.password);

  if (!passCheck) {
    return res.status(400).json({ error: 'Wrong password. Try again!' });
  }

  //   <!-- create Token -->
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN });

  res.status(200).json({ user, message: 'Login Success', token });
});

/**
 * @DESC logout a User
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res.status(200).clearCookie('accessToken').json({ message: 'Logout success.' });
});

/**
 * @DESC me a User
 * @ROUTE /api/v1/auth/me
 * @method GET
 * @access public
 */
export const me = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.me, message: 'Logged In user' });
});
