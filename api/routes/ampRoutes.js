'use strict';
var throttle = require("express-throttle");
module.exports = function(app) {

    var amp = require('../controllers/ampController');

    app.post('/', amp.sendAccessDenied);

    app.post('/getFeedSubmissionList', throttle({"burst": 10, "rate": "1/1min", "on_allowed": amp.getFeedSubmissionList,"on_throttled": amp.sendRequestThrottled}));

    app.post('/submitFeed', throttle({"burst": 10, "rate": "1/1min", "on_allowed": amp.submitFeed, "on_throttled": amp.sendRequestThrottled}));

    app.post('/getFeedSubmissionResult', throttle({"burst": 10, "rate": "1/1min", "on_allowed": amp.getFeedSubmissionResult, "on_throttled": amp.sendRequestThrottled}));
    
    app.post('/sendRequestThrottled', amp.sendRequestThrottled);

    app.post('/sendQuotaExceeded', amp.sendQuotaExceeded);

    app.post('/sendAccessDenied', amp.sendAccessDenied);

    app.post('/sendInputStreamDisconnected', amp.sendInputStreamDisconnected);

    app.post('/sendInternalError', amp.sendInternalError);

    app.post('/sendInvalidAccessKeyId', amp.sendInvalidAccessKeyId);

    app.post('/sendInvalidAddress', amp.sendInvalidAddress);

    app.post('/sendInvalidParameterValue', amp.sendInvalidParameterValue);

    app.post('/sendSignatureDoesNotMatch', amp.sendSignatureDoesNotMatch);
}
