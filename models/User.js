const { Schema, model } = require('mongoose');

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
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        },
        friends: {
            type: Schema.Types.ObjectId
        }
    }
)

const User = model('User', UserSchema)

module.exports = User;