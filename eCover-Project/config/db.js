import mongoose  from 'mongoose'
import config    from 'config'
import MockupData from '../models/MockupData.js';
import UserData from '../models/User.js';
import Mockups from './mockups.js';
import Users from './users.js';

const db = config.get('mongoURI')

const connectDB = async () => {

  try {

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('MongoDB connected')

    await MockupData.deleteMany({});
    await MockupData.create(Mockups);
    await UserData.deleteMany({});
    await UserData.create(Users);
  
  } catch (err) {

    console.error(err.message)
    process.exit(1)
  }
}

// module.exports = connectDB

export default connectDB