const { Schema, model } = require('mongoose');
const Thoughts = require('./Thoughts')
const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: {
            type: Schema.Types.ObjectId
        }
    },
    {
        toJSON: {},
        id: false
    }
)

const User = model('User', UserSchema)

module.exports = User;