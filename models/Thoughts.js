const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String, 
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
    
)

const thoughtsSchema = new Schema (
    {
        thoughtText:{
            type: String,
            required: true,
            min: 1,
            max: 280,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON:{
            getters: true,
            virtuals: true
        }, id: false
    }
);

thoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts