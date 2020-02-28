'use strict';

const Controller = require('egg').Controller;
const ImagerecogClient = require('@alicloud/imagerecog-2019-09-30');

class RecognizeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  /*
  中国风：chinese
  水彩：watercolor
  卡通：cartoon
  实景：real
  标准：standard
  简洁：simple
  活泼：lively
  多彩：colourful
  豪华：luxury
  科技：technology
  柔美：morbidezza
  硬朗：strong
  素雅：simpleelegant
  高冷：coolcold
  促销：promotion
  突出：protrude
  */

  async recognizeImageStyle(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImagerecogClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imagerecog.cn-shanghai.aliyuncs.com'
    });

    await client.recognizeImageStyle({
        "Url": "https://media-ai-system.oss-cn-shanghai.aliyuncs.com/20200228110752.png?Expires=1582859594&OSSAccessKeyId=TMP.hhbiTs7PEvPrzAhqpr76ieQvSeqM9iGQNNJGoer6pMaH8F9pVtSWpbvZkDAdtid6H4cXPGxsJSaUxyb9tMc7w4oBsF5hvDYpKdzrDpao8BRA7aQvSuv2q2tx3hfyB5.tmp&Signature=jo38AOu1eCpbWSccBZ5xj9yMZiA%3D"
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;

    });
  }

  /*
  {
    "Data":{
        "Tags":[
            {
                "Confidence":40,
                "Value":"画"
            },
            {
                "Confidence":19,
                "Value":"湖"
            },
            {
                "Confidence":15,
                "Value":"温泉"
            },
            {
                "Confidence":15,
                "Value":"雪山"
            },
            {
                "Confidence":12,
                "Value":"岩石"
            }
        ]
    },
    "RequestId":"D8B87B0C-A31D-42AC-B3CB-4226643DE24E"
}
  */

  async taggingImage(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImagerecogClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imagerecog.cn-shanghai.aliyuncs.com'
    });

    await client.taggingImage({
        "ImageURL": "https://media-ai-system.oss-cn-shanghai.aliyuncs.com/20200228110752.png?Expires=1582859976&OSSAccessKeyId=TMP.hhbiTs7PEvPrzAhqpr76ieQvSeqM9iGQNNJGoer6pMaH8F9pVtSWpbvZkDAdtid6H4cXPGxsJSaUxyb9tMc7w4oBsF5hvDYpKdzrDpao8BRA7aQvSuv2q2tx3hfyB5.tmp&Signature=4t6MbHaG%2B5YFUDDT5aHkhqMLK3Y%3D"
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;

    });
  }

  /*
  {
    "Data":{
        "Tags":[
            {
                "Confidence":95,
                "Value":"小河"
            },
            {
                "Confidence":13,
                "Value":"湖"
            },
            {
                "Confidence":13,
                "Value":"室外"
            },
            {
                "Confidence":12,
                "Value":"树林"
            },
            {
                "Confidence":11,
                "Value":"旅行"
            }
        ]
    },
    "RequestId":"B7D068A7-FFCE-4B1E-B501-84628AB36BF9"
}
  */
  async recognizeScene(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImagerecogClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imagerecog.cn-shanghai.aliyuncs.com'
    });

    await client.recognizeScene({
        "ImageURL": "https://media-ai-system.oss-cn-shanghai.aliyuncs.com/20200228110752.png?Expires=1582859976&OSSAccessKeyId=TMP.hhbiTs7PEvPrzAhqpr76ieQvSeqM9iGQNNJGoer6pMaH8F9pVtSWpbvZkDAdtid6H4cXPGxsJSaUxyb9tMc7w4oBsF5hvDYpKdzrDpao8BRA7aQvSuv2q2tx3hfyB5.tmp&Signature=4t6MbHaG%2B5YFUDDT5aHkhqMLK3Y%3D"
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;

    });
  }

  /*
    {
    "Data":{
        "ColorTemplateList":[
            {
                "Percentage":"0.509608",
                "Label":"gray",
                "Color":"C9CAC7"
            },
            {
                "Percentage":"0.324623",
                "Label":"yellow",
                "Color":"A2956B"
            },
            {
                "Percentage":"0.165769",
                "Label":"yellow",
                "Color":"585033"
            }
        ]
    },
    "RequestId":"A260F2F7-2309-4F61-9564-BD636799A932"
  }
  */

  async recognizeImageColor(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImagerecogClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imagerecog.cn-shanghai.aliyuncs.com'
    });

    await client.recognizeImageColor({
        "Url": "https://media-ai-system.oss-cn-shanghai.aliyuncs.com/20200228110752.png?Expires=1582859594&OSSAccessKeyId=TMP.hhbiTs7PEvPrzAhqpr76ieQvSeqM9iGQNNJGoer6pMaH8F9pVtSWpbvZkDAdtid6H4cXPGxsJSaUxyb9tMc7w4oBsF5hvDYpKdzrDpao8BRA7aQvSuv2q2tx3hfyB5.tmp&Signature=jo38AOu1eCpbWSccBZ5xj9yMZiA%3D"
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;

    });
  }

  /*

  */
  async detectImageElements(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImagerecogClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imagerecog.cn-shanghai.aliyuncs.com'
    });

    await client.detectImageElements({
        "Url": "https://media-ai-system.oss-cn-shanghai.aliyuncs.com/12394550740.jpg?Expires=1582861102&OSSAccessKeyId=TMP.hhbiTs7PEvPrzAhqpr76ieQvSeqM9iGQNNJGoer6pMaH8F9pVtSWpbvZkDAdtid6H4cXPGxsJSaUxyb9tMc7w4oBsF5hvDYpKdzrDpao8BRA7aQvSuv2q2tx3hfyB5.tmp&Signature=a0oVw3Vq1%2F0zYKeEaho%2BIKPJMNY%3D"
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;

    });
  }
}

module.exports = RecognizeController;
