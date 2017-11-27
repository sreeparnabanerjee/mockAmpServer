var jstoxml = require('jstoxml');
var moment = require('moment');

var headers = function() {
  var headers = {};
  headers.maxQuota = '',
  headers.remQuota = '',
  headers.resetQuota = '';
  return headers;
}

exports.sendPossitive = function(req, res, next, bucket) {

  var dateFormat = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';
  var resultDate = new Date();
  var reset = moment(resultDate).add(1, 'minute').format(dateFormat);

  headers.maxQuota = 10;
  headers.remQuota = bucket.tokens;
  headers.resetQuota = reset;
  
  var action = req.body.Action;
  if(action === "GetFeedSubmissionList")
     getFeedSubmissionList(req, res, next, bucket);
     else
     getFeedSubmissionList(req, res, next, bucket);
    //  res.status(200).send('OK!');
  };

  var getFeedSubmissionList = function(req, res, next, bucket) {
    
    res.set("x-mws-quota-max", headers.maxQuota);
    res.set("x-mws-quota-remaining", headers.remQuota);
    res.set("x-mws-quota-resetsOn", headers.resetQuota); 
      res.setHeader('Content-Type', 'text/xml');
      res.send(jstoxml.toXML({
        GetFeedSubmissionListResponse: {
          _attrs: {
            xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
          },          
          GetFeedSubmissionListResult: {
            HasNext: 'false',
            FeedSubmissionInfo: {
              FeedProcessingStatus: '_DONE_',
              FeedType: '_POST_PRODUCT_DATA_',
              FeedSubmissionId: 50050017479,
              StartedProcessingDate: () => new Date(),
              SubmittedDate: () => new Date(),
              CompletedProcessingDate: () => new Date()
            }
          },
          ResponseMetadata: {
            RequestId: 'f40278ea-6f6d-431a-bf74-259a22bdd38f'
          }
        }
      }, 
     {header: true}
  ));
    };

    exports.sendInvalidParameterValue = function(req, res) {
      res.setHeader('Content-Type', 'text/xml');
      res.status(400).send(jstoxml.toXML({
        ErrorResponse: {
          _attrs: {
            xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
          },   
          Error: {
            Type: 'Sender',
            Code: 'InvalidParameterValue',
            Message: 'Invalid seller id'
           },
           RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
            }
          }, {header: true}));
      };

      exports.sendInputStreamDisconnected = function(req, res) {
        res.setHeader('Content-Type', 'text/xml');
        res.status(400).send(jstoxml.toXML({
          ErrorResponse: {
            _attrs: {
              xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
            },   
            Error: {
              Type: 'Sender',
              Code: 'InputStreamDisconnected',
              Message: 'There was an error reading the input stream.'
             },
             RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
              }
            }, {header: true}));
        };

        exports.sendAccessDenied = function(req, res) {
          res.setHeader('Content-Type', 'text/xml');
          res.status(401).send(jstoxml.toXML({
            ErrorResponse: {
              _attrs: {
                xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
              },   
              Error: {
                Type: 'Sender',
                Code: 'AccessDenied',
                Message: 'Access was denied.'
               },
               RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
                }
              }, {header: true}));
          };

          exports.sendInvalidAccessKeyId = function(req, res) {
            res.setHeader('Content-Type', 'text/xml');
            res.status(403).send(jstoxml.toXML({
              ErrorResponse: {
                _attrs: {
                  xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
                },   
                Error: {
                  Type: 'Sender',
                  Code: 'InvalidAccessKeyId',
                  Message: 'An invalid AWSAccessKeyId value was used.'
                 },
                 RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
                  }
                }, {header: true}));
            };

            exports.sendSignatureDoesNotMatch = function(req, res) {
              res.setHeader('Content-Type', 'text/xml');
              res.status(403).send(jstoxml.toXML({
                ErrorResponse: {
                  _attrs: {
                    xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
                  },   
                  Error: {
                    Type: 'Sender',
                    Code: 'SignatureDoesNotMatch',
                    Message: 'The signature used does not match the servers calculated signature value.'
                   },
                   RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
                    }
                  }, {header: true}));
              };

              exports.sendInvalidAddress = function(req, res) {
                res.setHeader('Content-Type', 'text/xml');
                res.status(404).send(jstoxml.toXML({
                  ErrorResponse: {
                    _attrs: {
                      xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
                    },   
                    Error: {
                      Type: 'Sender',
                      Code: 'InvalidAddress',
                      Message: 'An invalid API section or operation value was used, or an invalid path was used.'
                     },
                     RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
                      }
                    }, {header: true}));
                };

                exports.sendInternalError = function(req, res) {
                  res.setHeader('Content-Type', 'text/xml');
                  res.status(500).send(jstoxml.toXML({
                    ErrorResponse: {
                      _attrs: {
                        xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
                      },   
                      Error: {
                        Type: 'Receiver',
                        Code: 'InternalError',
                        Message: 'There was an internal service failure.'
                       },
                       RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
                        }
                      }, {header: true}));
                  };

                  exports.sendQuotaExceeded = function(req, res) {
                    res.setHeader('Content-Type', 'text/xml');
                    res.status(503).send(jstoxml.toXML({
                      ErrorResponse: {
                        _attrs: {
                          xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
                        },   
                        Error: {
                          Type: 'Receiver',
                          Code: 'QuotaExceeded',
                          Message: 'The total number of requests in an hour was exceeded.'
                         },
                         RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
                          }
                        }, {header: true}));
                    };

                    exports.sendRequestThrottled = function(req, res, next, bucket) {
                      headers.remQuota = bucket.tokens;
                      res.set("x-mws-quota-max", headers.maxQuota);
                      res.set("x-mws-quota-remaining", headers.remQuota);
                      res.set("x-mws-quota-resetsOn", headers.resetQuota);
                      res.setHeader('Content-Type', 'text/xml');
                      res.status(503).send(jstoxml.toXML({
                        ErrorResponse: {
                          _attrs: {
                            xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
                          },   
                          Error: {
                            Type: 'Receiver',
                            Code: 'RequestThrottled',
                            Message: 'The frequency of requests was greater than allowed.'
                           },
                           RequestID: 'df21ffda-1bd3-4a8f-9dce-be9eb76794b9'
                            }
                          }, {header: true}));
                      };