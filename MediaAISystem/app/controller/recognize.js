'use strict';

const BaseController = require('./BaseController');
const ImagerecogClient = require('@alicloud/imagerecog-2019-09-30');

class RecognizeController extends BaseController {

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

    let result = await client.recognizeImageStyle({
        "Url": ctx.query.imageUrl,
    }, {timeout: 10000}).then(function (data) {
      return data;
    }, function (err) {
      return err;
    });

    if(result.Data.Styles){
      if(result.Data.Styles.length > 0){
        let stylesCnName = [];
        result.Data.Styles.forEach((enName)=>{
          stylesCnName.push(ctx.helper.getStyleKeyName(enName));
        });
        super.success(stylesCnName);
      }
      else{
        super.failure('无风格信息');
      }
    }
    else{
      super.failure('识别出错');
    }
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

    let result = await client.taggingImage({
        "ImageURL": ctx.query.imageUrl
    }, {timeout: 10000}).then(function (data) {
        return data;
    }, function (err) {
        return err;
    });
    if(result.Data.Tags){
      if(result.Data.Tags.length > 0){
        super.success(result.Data.Tags);
      }
      else{
        super.failure('无标签信息');
      }
    }
    else{
      super.failure('识别出错');
    }

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

    let result = await client.recognizeScene({
        "ImageURL": ctx.query.imageUrl
    }, {timeout: 10000}).then(function (data) {
        return data;
    }, function (err) {
        return err;
    });
    if(result.Data.Tags){
      if(result.Data.Tags.length > 0){
        super.success(result.Data.Tags);
      }
      else{
        super.failure('无标签信息');
      }
    }
    else{
      super.failure('识别出错');
    }
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

    let result = await client.recognizeImageColor({
        "Url": ctx.query.imageUrl
    }, {timeout: 10000}).then(function (data) {
        return data;
    }, function (err) {
        return err;
    });

    if(result.Data.ColorTemplateList){
      if(result.Data.ColorTemplateList.length > 0){
        result.Data.ColorTemplateList.forEach((colorObj)=>{
          colorObj.Color = '#' + colorObj.Color;
        });
        super.success(result.Data.ColorTemplateList);
      }
      else{
        super.failure('无标签信息');
      }
    }
    else{
      super.failure('识别出错');
    }
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

    let result = await client.detectImageElements({
        "Url": ctx.query.imageUrl
    }, {timeout: 10000}).then(function (data) {
        return data;
    }, function (err) {
        return err;
    });
    if(result.Data.Elements){
      if(result.Data.Elements.length > 0){
        let resultElements = result.Data.Elements;
        resultElements.forEach((element) => {
          element.Type = ctx.helper.getElementKeyName(element.Type);
        });
        super.success(resultElements);
      }
      else{
        super.failure('无标签信息');
      }
    }
    else{
      super.failure('识别出错');
    }
  }
}

module.exports = RecognizeController;
