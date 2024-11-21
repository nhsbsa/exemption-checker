// External dependencies
const express = require('express');
const router = express.Router();

//
// INDEX
//
router.get( /index/, function (req, res) {
    res.redirect('start');
});

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

    const nextPage = ( req.session.data.userRecordFound === 'true' || req.session.data.userRecordFound === true ) ? 'record-found' : 'no-record-found';

    res.redirect(nextPage);
    
});

module.exports = router;
