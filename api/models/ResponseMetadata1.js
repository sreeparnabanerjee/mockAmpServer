var jstoxml = require('jstoxml');
  console.log(jstoxml.toXML({
    GetFeedSubmissionListResponse: {
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
  }));
  