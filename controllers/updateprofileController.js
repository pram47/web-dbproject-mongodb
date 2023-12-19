const User = require('../models/User');

module.exports = (req, res) => {
    console.log('Received request params:', req.params.id);
    console.log('Received request body:', req.body);

    const userId = req.params.id;

    if (!userId) {
        console.log('User ID not provided');
        return res.redirect('/'); // Handle the case where ID is not present
    }

    User.findByIdAndUpdate(userId, { username: req.body.username }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                console.log('User not found');
                return res.redirect('/');
            }

            console.log("User updated successfully!");
            res.redirect('/');
        })
        .catch(error => {
            console.error('Error updating user:', error);
            res.redirect('/');
        });
};
