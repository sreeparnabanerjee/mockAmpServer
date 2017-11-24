var Error = require('./Error');
module.exports = function() {
    var ErrorResponse = {};
    Error.detail = Detail.any;
    Error.type = '';
    Error.code = '';
    Error.message = '';
    return Error;
}
    