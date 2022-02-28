const { Thoughts, User } = require('../models');

const thoughtController = {

    createThought({ params, body}, res) {
        console.log(body);
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: { thoughts: body._id } },
                    { new: true }
                )
            })
            
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'no thoughts found with this id' });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch(err => res.json(err));
    },
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true}
         )
         .then(dbThoughtData => {
             if (!dbThoughtData) {
               res.status(404).json({ message: 'No Thought found with this id!' });
               return;
             }
             res.json(dbThoughtData);
           })
           .catch(err => res.json(err));
    }, getAllThoughts(req, res){
        Thoughts.find({}).populate({path:'reactions', select:'-__v'})
        .select('-__v')
        .sort({_id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
    },
    removeReaction({ params }, res ) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { _id: params.reactionId} } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    removeThought({ params, body }, res ) {
        Thoughts.findOneAndDelete({ _id: params.thoughtId})
        .then(deletedReaction => {
            if (!deletedReaction) {
              return res.status(404).json({ message: 'No Reaction with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $pull: { reactions: params.thoughtId } },
                { new: true }
            );
    }).then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
    }

}

module.exports = thoughtController