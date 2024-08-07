import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    images: [
        {
            url: String
        }
    ],
    covers: [
        {
            renderedImage: String,
            designState: String,
            mockup: String
        }
    ]
});

//module.exports = User = mongoose.model('user', UserSchema);
export default mongoose.model('User', UserSchema);
