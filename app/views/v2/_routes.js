// External dependencies
const express = require('express');
const router = express.Router();
const {DateTime} = require('luxon');

router.get(/start/,function(req, res){

    console.log( '*** DATA RESET ***' );

    const debug = req.session.data.debug || 'false';
    const journey = req.session.data.journey || 'confirmation--exemption-found-prescriptions-dental';
    const type = req.session.data.type || 'default';

    req.session.data = {};
    req.session.data.debug = debug;
    req.session.data.journey = journey;
    req.session.data.type = type;

    res.render( req.originalUrl.split('?')[0].substring(1) );

});


router.post(/configure-prototype/, function (req, res) {
    const destination = 'start';
    res.redirect( destination );
});

router.post(/date-of-birth/, function (req, res) {
    
    let destination = 'name';

    let day = req.session.data.dateOfBirth.day;
    let month = req.session.data.dateOfBirth.month;
    let year = req.session.data.dateOfBirth.year;


    if( day && !Number.isNaN(day) && month && !Number.isNaN(month) && year && !Number.isNaN(year) ){

        day = ( day.length === 1 ) ? '0'+day : day;
        month = ( month.length === 1 ) ? '0'+month : month;

        let date = year + '-' + month + '-' + day;

        const birthDate = DateTime.fromISO( date ); // YYYY-MM-DD
        const currentDate = DateTime.now();

        let age = currentDate.year - birthDate.year;

        if ( currentDate.month < birthDate.month || (currentDate.month === birthDate.month && currentDate.day < birthDate.day)) {
            age--;
        }

        if( age > 59 ){
            destination = 'confirmation--60-or-over';
        } else if( age < 16 ){
            destination = 'confirmation--under-16';
        }

    } else {
        if( req.session.data.type === 'confirmation--60-or-over' || req.session.data.type === 'confirmation--under-16' ){
            destination = req.session.data.type;
        }
    }

    

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

router.post(/verification-method/, function (req, res) {
    const destination = 'verification-code';
    if( req.session.data.verficationMethod !== 'text-message' ){
        req.session.data.verficationMethod = 'email-address';
    }
    res.redirect( destination );
});

router.post(/verification-code/, function (req, res) {

    let destination;
    switch( req.session.data.journey ){
        case 'extraValidationMATEX':
            destination = 'exemption--matex';
            break;
        case 'extraValidationPPC':
            destination = 'exemption--ppc';
            break;
        case 'extraValidationHRTPPC':
            destination = 'exemption--hrt-ppc';
            break;
        
    }
    res.redirect( destination );
    
});


module.exports = router;