const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
        console.log(user);

        if (user) {
            bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });
};


// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// module.exports = (req, res) => {
//     const { email, password } = req.body;

//     User.findOne({ email: email }).then((user) => {
//         console.log(user);

//         if (user) {
//             bcrypt.compare(password, user.password).then((match) => {
//                 if (match) {
//                     req.session.userId = user._id;
//                     res.redirect('/');
//                 } else {
//                     res.render('login', { error: 'Invalid email or password' });
//                 }
//             });
//         } else {
//             res.render('login', { error: 'Invalid email or password' });
//         }
//     }).catch(error => {
//         console.error(error);
//         res.render('login', { error: 'An unexpected error occurred' });
//     });
// };
