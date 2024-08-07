import jwt from 'jsonwebtoken';
import config from 'config';
import apiKey from '../config/apiKey.js';

export default function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied ' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export const authApiKey = (req, res, next) => {
  // Get token from header
  const headerKey = req.header('x-auth-api-key');

  // Check if not token
  if (!headerKey) {
    return res.status(401).json({ msg: 'No api key' });
  }


  if(headerKey===apiKey){
    next();
  }else{
    res.status(401).json({ msg: 'Api key is not valid' });
  }

};
