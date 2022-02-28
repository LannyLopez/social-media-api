const { Thoughts, User } = require('../models');

const thoughtController = {

    createThought({ params, body}, res) {
        console.log(body);
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .select('-__v')
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
    },
    removeReaction({ params }, res ) {
        Thoughts.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reactions: { reactionId: params.reactionId} } },
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
            return Thoughts.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: params.reactionId } },
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