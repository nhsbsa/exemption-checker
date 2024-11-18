// External dependencies
const express = require('express');

const router = express.Router();

//
// DATE OF BIRTH
//
router.post(/date-of-birth/, function (req, res) {
    res.redirect('name');
});

//
// NAME
//
router.post(/name/, function (req, res) {
    res.redirect('postcode');
});

//
// POSTCODE
//
router.post(/postcode/, function (req, res) {

    const choice = Math.round(Math.random()); // Either 0 or 1...
    const nextPage = ( choice === 0 ) ? 'record-found' : 'no-record-found';

    res.redirect(nextPage);
    
});

module.exports = router;
