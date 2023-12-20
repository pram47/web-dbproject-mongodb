const User = require('../models/User');

module.exports = async (req, res, next) => {
    console.log('Received request params:', req.params.id);
    console.log('Received request body:', req.body);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username: req.body.username },
            { new: true }
        ).exec();

        if (!updatedUser) {
            console.log('User not found');
            return res.redirect('/');
        }

        console.log('User updated successfully!');
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating user:', error);
        next(error);
    }
};
