'use strict';

let OSS = require('ali-oss');
const crypto = require('crypto');
const path = require('path');

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  aliConfig: () => {
    const alioss = exports = {};

    alioss.region = 'oss-cn-shanghai';
    alioss.AccessKeyId = 'LTAIsvXXw2cmRUG2';
    alioss.AccessKeySecret = 'fs0sVuCJm0AeQi2XduYwdF0EqzL5Rc';
    alioss.endpoint = 'oss-cn-shanghai.aliyuncs.com';
    alioss.PolicyFile = 'policy/all_policy.txt';
    alioss.RoleArn = 'acs:ram::1455326322404332:role/cidic-oss-role';
    alioss.TokenExpireTime = '3600';
    alioss.bucket = 'media-ai-system';

    return alioss;
  },


  signatureUrl(objectPath,thumbName){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    if (typeof(thumbName) == "undefined"){
      return client.signatureUrl(objectPath, {expires: 3600});
    }
    else{
      return client.signatureUrl(objectPath, {expires: 3600,process : 'style/'+thumbName});
    }

  },

  async deleteOssObject(objectPath){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    return client.delete(objectPath);
  },

  async deleteOssMultiObject(objectArrayPath){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    return client.deleteMulti(objectArrayPath);
  },

  async putOssObject(objectName,stream){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    try {
      let result = await client.putStream(objectName, stream);
      console.log(result);
    } catch (e) {
      console.log(e)
    }
  },

  cryptoPwd:(password)=>{
    const prefix = '13ervbh#$61';
    var sha1 = crypto.createHash('sha1');
    sha1.update(prefix + password);
    var pwd = sha1.digest('hex');
    return pwd;
  },

  randomString: (len)=> {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTVUWXYZLIabcdefhijkmnpgqvurstwxyz123456789';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  },

};
