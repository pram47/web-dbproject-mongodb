// module.exports = (req, res) => {
//     res.render('edit')
// }


const User = require('../models/User')

module.exports = async (req, res) => {

    let UserData = await User.findById(req.session.userId)

    res.render('edit',{
        UserData
    })

}