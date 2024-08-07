import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import auth from '../../middleware/auth.js';
import jwt from 'jsonwebtoken';
import config from 'config';

import { check, validationResult } from 'express-validator';
import User from '../../models/User.js';

//  @route GET api/auth
//  @desc Test route
//  @access Public

router.get('/', auth, async (req, res) => {
  try {
    console.log('Auth---')
    let user = await User.findById(req.user.id).select('-password');
    user.images = [];
    user.covers = [];
    res.json(user);

    // const payload = {
    //   "api-auth": "admin-only-access"
    // };

    // jwt.sign(
    //   payload,
    //   "api-access-key-only-jacinto",
    //   (err, token) => {
    //     if (err) throw err;
    //     console.log(token);
    //   }
    // );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  POST api/auth
//  @desc   Authenticate user and get token
//  @access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],

  async (req, res) => {
    //console.log('asdf')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // See if user exists

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//module.exports = router;
export default router;
