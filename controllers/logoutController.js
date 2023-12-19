// module.exports = (req, res) => {
//     req.session.destroy(() => {
//         res.redirect('/')
//     })
// }

module.exports = (req, res) => {
    req.session.destroy(() => {
        global.loggedIn = null; // Update the global variable to null
        setTimeout(() => {
            res.send('<script>window.location.href = "/";</script>'); // Refresh the page after 1 second
        }, 100);
    });
};
