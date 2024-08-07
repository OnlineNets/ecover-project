import express from'express';
const router = express.Router();
import gravatar from'gravatar';
import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';
import config from'config';
import auth from '../../middleware/auth.js';
import {authApiKey} from '../../middleware/auth.js';

import { check, validationResult } from'express-validator';

import User from'../../models/User.js';

//  @route  Get api/users/all-users
//  @desc   get all users
//  @access Public
router.get('/all-users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');

    if (!users) {
      return res.status(400).json({ msg: 'There is no user.' });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  POST api/users
//  @desc   Register user
//  @access Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    authApiKey,
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // See if user exists

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists ' }] });
      }

      // Get users gravatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          // res.json({ token });
          res.json({msg: "Registered successfully!"});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//  @route  POST api/users/change-pass
//  @desc   change password
//  @access Public

router.post(
  '/change-pass',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    authApiKey,
  ],

  async (req, res) => {
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
          .json({ errors: [{ msg: 'Cannot find user' }] });
      }


      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json({msg: "Changed password successfully!"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//  @route  POST api/users/change-name
//  @desc   change name
//  @access Public

router.post(
  '/change-name',
  [
    check('email', 'Please include a valid email').isEmail(),
    authApiKey,
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name } = req.body;

    // See if user exists

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Cannot find user' }] });
      }

      user.name = name;

      await user.save();

      res.json({msg: "Changed name successfully!"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//  @route  POST api/users/change-name-pass
//  @desc   change password and name
//  @access Public

router.post(
  '/change-infor',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    authApiKey,
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    // See if user exists

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Cannot find user' }] });
      }


      // Encrypt password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.name = name;

      await user.save();

      res.json({msg: "Changed password successfully!"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//  @route  Delete api/users
//  @desc   delete user
//  @access Public

router.delete(
  '/:email',
  authApiKey,
  async (req, res) => {
    try {
      console.log(req.params.email)
      let user = await User.findOne({ email: req.params.email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Cannot find user' }] });
      }

      await user.remove();

      res.json({msg: "Deleted user successfully!"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post('/del-images', auth, async (req, res) => {

    const { id } = req.body;

    // See if user exists

    try {
      let user = await User.findById( id );

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Cannot find User.' }] });
      }

      user.images = [];

      await user.save();

      res.json({message: "Deleted successfully."})

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post('/del-covers', auth, async (req, res) => {

  const { id } = req.body;

  // See if user exists

  try {
    let user = await User.findById( id );

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Cannot find User.' }] });
    }

    user.covers = [];

    await user.save();

    res.json({message: "Deleted successfully."})

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);

// module.exports = router;
export default router;

