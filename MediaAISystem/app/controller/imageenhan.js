'use strict';

const Controller = require('egg').Controller;
const ImageenhanClient = require('@alicloud/imageenhan-2019-09-30');

class ImageehanController extends Controller {

  //超分辨率
  async makeSuperResolutionImage(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImageenhanClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imageenhan.cn-shanghai.aliyuncs.com'
    });

    await client.makeSuperResolutionImage({
        "Url": ""
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;
    });
  }

  //尺寸变换
  async changeImageSize(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImageenhanClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imageenhan.cn-shanghai.aliyuncs.com'
    });

    await client.changeImageSize({
        "Url": ""
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;
    });
  }

  //风格迁移
  async extendImageStyle(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImageenhanClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imageenhan.cn-shanghai.aliyuncs.com'
    });

    await client.extendImageStyle({
        "Url": ""
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;
    });
  }

  //色彩迁移
  async recolorImage(){
    const ctx = this.ctx;
    const aliConfigObj = ctx.helper.aliConfig();

    const client = new ImageenhanClient({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret,
      securityToken: '',
      endpoint: 'https://imageenhan.cn-shanghai.aliyuncs.com'
    });

    await client.recolorImage({
        "Url": ""
    }, {timeout: 10000}).then(function (data) {
      console.log('Result:' + JSON.stringify(data));
      ctx.body = JSON.stringify(data);
    }, function (err) {
      console.log('Error:' + err);
      ctx.body = err;
    });
  }


}

module.exports = ImageehanController;
