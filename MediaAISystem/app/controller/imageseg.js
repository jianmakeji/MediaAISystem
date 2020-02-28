'use strict';

const Controller = require('egg').Controller;
const ImagesegClient = require('@alicloud/imageseg-2019-12-30');

class ImagesegController extends Controller {

  /*
  {
    "Data":{
        "ImageURL":"http://luban-vgd-invi.oss-cn-hangzhou.aliyuncs.com/upload/result_parser/2020-2-28/invi_parser_015828675197531065637_vqKYCe.png?Expires=1583126719&OSSAccessKeyId=LTAI4Fc5SVvzUQ19K1Cz3Ew9&Signature=pgbU%2FpHjL1xBdXrj%2FuZ4IXNtv78%3D"
    },
    "RequestId":"90301A48-6926-4043-B6A6-C97E48DB32C9"
}
  */
  //图片分割
  async segmentCommonImage(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImagesegClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imageseg.cn-shanghai.aliyuncs.com'
    });

    await client.segmentCommonImage({
        "ImageURL": "https://media-ai-system.oss-cn-shanghai.aliyuncs.com/20200228115933.png"
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;
    });
  }

}

module.exports = ImagesegController;
