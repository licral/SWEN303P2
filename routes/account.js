var express = require('express');
var router = express.Router();

// This method doesn't display a page, rather it tries to log in a member
// and sends a reply back to the client
router.post('/validate', function(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username == "admin" && password == "123") {
        res.cookie('isLoggedIn', username, {overwrite: true, httpOnly: false});
        res.send("true");
    } else {
        res.send("false");
    }
});

router.post('/logout', function(req, res) {
    res.clearCookie('isLoggedIn');
    res.send("done");
});

module.exports = router;
