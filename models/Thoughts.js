const { Schema, model, Types } = require('mongoose');

const thoughtsSchema = new Schema (
    {

    }
)
const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts