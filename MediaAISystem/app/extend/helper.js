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
  
    alioss.endpoint = 'oss-cn-shanghai.aliyuncs.com';
    alioss.PolicyFile = 'policy/all_policy.txt';
    alioss.RoleArn = 'acs:ram::1455326322404332:role/cidic-oss-role';
    alioss.TokenExpireTime = '3600';
    alioss.bucket = 'media-ai-system';

    return alioss;
  },

  imageehanPath: 'imageehan/',
  imagesegPath: 'imageseg/',
  recognizePath: 'recognize/',
  othersPath: 'others',

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

  getStyleKeyName : (str)=>{
    let styleMap = new Map();
    styleMap.set('chinese','中国风').set('watercolor','水彩').set('cartoon','卡通');
    styleMap.set('real','实景').set('standard','标准').set('simple','简洁');
    styleMap.set('lively','活泼').set('colourful','多彩').set('luxury','豪华');
    styleMap.set('technology','科技').set('morbidezza','柔美').set('strong','硬朗');
    styleMap.set('simpleelegant','素雅').set('coolcold','高冷').set('promotion','促销');
    styleMap.set('protrude','突出');
    if(styleMap.has(str)){
      return styleMap.get(str);
    }
    else{
      return str;
    }
  },

  getElementKeyName : (str) => {
    let elementMap = new Map();
    elementMap.set('untype','未定义类型').set('alltype','所有类型').set('roottype','根类型').set('synthesis','组合元素图');
    elementMap.set('embedded','所有嵌套类型').set('format','元素格式').set('majorobject','主体').set('character','标识');
    elementMap.set('background','背景').set('decoration','修饰').set('majorhuman','人物模特').set('majorauction','商品');
    elementMap.set('majorthing','物体').set('majorother','其他主体').set('charMain','主文案').set('charSub','副文案');
    elementMap.set('charaction','行动点文案').set('charcontent','内容文案').set('charnumber','数字文案').set('charother','其他文案');
    elementMap.set('identlogo','logo标识').set('identlight','高亮标识').set('identcode','码标识').set('identother','其他标识');
    elementMap.set('backbitmap','位图背景').set('backvector','矢量图背景').set('backother','其他背景').set('decotile','平铺修饰');
    elementMap.set('decoregion','区域修饰').set('decopieces','碎片修饰').set('decoedge','贴边修饰').set('decoline','线性修饰');
    elementMap.set('decobox','框型修饰').set('decochar','行动点文案修饰').set('decoother','其他修饰').set('synthmajor','主体组团');
    elementMap.set('synthchar','文案组团').set('synthident','标识组团').set('synthback','背景组团').set('synthdeco','修饰组团');
    elementMap.set('synthother','其他组团').set('embedsvg','svg嵌套格式').set('embedjson','json嵌套格式').set('embedhtml','html嵌套格式');
    if(elementMap.has(str)){
      return elementMap.get(str);
    }
    else{
      return str;
    }
  }
};
