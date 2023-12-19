// module.exports = (req, res) => {
//     res.render('login')
// }

module.exports = (req, res) => {
    res.render('login', { error: 'Invalid email or password' });
}

