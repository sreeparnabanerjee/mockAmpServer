var jstoxml = require('jstoxml');
var moment = require('moment');
var uuid = require('uuid/v4');
var crypto = require('crypto');
var fs = require('fs');

  exports.getFeedSubmissionList = function(req, res, next, bucket) {

    var dateFormat = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';
    var resultDate = new Date();
    var reset = moment(resultDate).add(1, 'minute').format(dateFormat);
    
    res.set("x-mws-quota-max", 10);
    res.set("x-mws-quota-remaining", bucket.tokens);
    res.set("x-mws-quota-resetsOn", reset); 
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
              FeedSubmissionId: uuid(),
              StartedProcessingDate: () => new Date(),
              SubmittedDate: () => new Date(),
              CompletedProcessingDate: () => new Date()
            }
          },
          ResponseMetadata: {
            RequestId: uuid()
          }
        }
      }, 
     {header: true}
  ));
    };

  exports.submitFeed = function(req, res, next, bucket) {
      
          var dateFormat = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';
          var resultDate = new Date();
          var reset = moment(resultDate).add(1, 'minute').format(dateFormat);
          
          res.set("x-mws-quota-max", 10);
          res.set("x-mws-quota-remaining", bucket.tokens);
          res.set("x-mws-quota-resetsOn", reset); 
            res.setHeader('Content-Type', 'text/xml');
            res.send(jstoxml.toXML({
              SubmitFeedResponse: {
                _attrs: {
                  xmlns: 'http://mws.amazonaws.com/doc/2009-01-01/'
                },          
                SubmitFeedResult: {
                  FeedSubmissionInfo: {
                    FeedProcessingStatus: '_SUBMITTED_',
                    FeedType: '_POST_PRODUCT_DATA_',
                    FeedSubmissionId: uuid(),
                    StartedProcessingDate: () => new Date(),
                    SubmittedDate: () => new Date(),
                    CompletedProcessingDate: () => new Date()
                  }
                },
                ResponseMetadata: {
                  RequestId: uuid()
                }
              }
            }, 
           {header: true}
        ));
          };

          exports.getFeedSubmissionResult = function(req, res, next, bucket) {
            
                var dateFormat = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';
                var resultDate = new Date();
                var reset = moment(resultDate).add(1, 'minute').format(dateFormat);
                var dataToBeHashed = fs.readFileSync(__dirname+'/../assets/feedSubmissionResult.xml');
                var hash = crypto.createHash('md5').update(dataToBeHashed).digest("base64");
                
                
                res.set("x-mws-quota-max", 10);
                res.set("x-mws-quota-remaining", bucket.tokens);
                res.set("x-mws-quota-resetsOn", reset); 
                res.set("x-amz-request-id", uuid());
                res.set("Content-MD5", hash);
                res.setHeader('Content-Type', 'text/xml');
                res.status(200).send(dataToBeHashed);
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
           RequestID: uuid()
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
             RequestID: uuid()
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
               RequestID: uuid()
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
                 RequestID: uuid()
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
                   RequestID: uuid()
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
                     RequestID: uuid()
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
                       RequestID: uuid()
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
                         RequestID: uuid()
                          }
                        }, {header: true}));
                    };

                    exports.sendRequestThrottled = function(req, res, next, bucket) {
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
                           RequestID: uuid()
                            }
                          }, {header: true}));
                      };