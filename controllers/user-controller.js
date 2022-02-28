const { User } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({}).select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData)).catch(err=>{
            console.log(err);
            res.status(400).json(err)
        })
    },
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
        
        .then(dbUserData => res.json(dbUserData)).catch(
            err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id }, body, { new: true }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found by this id' });
                return;
            } res.json(dbUserData);
        }).catch(err => res.status(400).json(err))
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id }).then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id'})
            } res.json(dbUserData)
        }).catch(err => {
            console.log(err)
            res.sendStatus(400).json(err)
        })
    },

    createUser({ body }, res) {
        User.create(body).then(dbUserData => {
            if(!dbUserData){
                console.log('no data found')
            } res.json(dbUserData)
        }).catch(err => res.json(err))
    }
}

module.exports = userController;