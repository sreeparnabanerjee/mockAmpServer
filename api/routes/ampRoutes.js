'use strict';
var throttle = require("express-throttle");
module.exports = function(app) {

    var amp = require('../controllers/ampController');

    var options = {
      "burst": 10,
      "rate": "1/4s",
      "on_allowed": amp.sendPossitive,
      "on_throttled": amp.sendRequestThrottled
    }
    
    // amp Routes
    app.route('/').post(throttle(options));

    app.route('/sendRequestThrottled').post(amp.sendRequestThrottled);

    app.route('/sendQuotaExceeded').post(amp.sendQuotaExceeded);

    app.route('/sendAccessDenied').post(amp.sendAccessDenied);

    app.route('/sendInputStreamDisconnected').post(amp.sendInputStreamDisconnected);

    app.route('/sendInternalError').post(amp.sendInternalError);

    app.route('/sendInvalidAccessKeyId').post(amp.sendInvalidAccessKeyId);

    app.route('/sendInvalidAddress').post(amp.sendInvalidAddress);

    app.route('/sendInvalidParameterValue').post(amp.sendInvalidParameterValue);

    app.route('/sendSignatureDoesNotMatch').post(amp.sendSignatureDoesNotMatch);
}
