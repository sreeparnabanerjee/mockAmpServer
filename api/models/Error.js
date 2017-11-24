var Detail = require('./Detail');
module.exports = function() {
    var Error = {};
    Error.detail = Detail.any;
    Error.type = '';
    Error.code = '';
    Error.message = '';
    return Error;
}
    