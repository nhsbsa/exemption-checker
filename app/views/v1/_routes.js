// External dependencies
const express = require('express');
const router = express.Router();


router.post(/configure-prototype/, function (req, res) {
    const destination = 'start';
    res.redirect( destination );
});

router.post(/date-of-birth/, function (req, res) {
    const destination = 'name';
    res.redirect( destination );
});

router.post(/name/, function (req, res) {
    const destination = 'postcode';
    res.redirect( destination );
});

router.post(/postcode/, function (req, res) {
    const destination = req.session.data.type;
    res.redirect( destination );
});


module.exports = router;