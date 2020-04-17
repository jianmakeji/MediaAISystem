var config = (function($) {
  $.ajaxUrls = {
    getSTSSignature: '/getSTSSignature/',
    getUrlSignature: '/getUrlSignature',
    recognizeImageStyle:'/recognize/recognizeImageStyle',
    detectImageElements:'/recognize/detectImageElements',
    recognizeImageColor:'/recognize/recognizeImageColor',
    recognizeScene:'/recognize/recognizeScene',
    taggingImage:'/recognize/taggingImage',
  };

  $.path = {
    recognize: 'recognize/',
    imageseg: 'imageseg/',
    imageehan: 'imageehan/',
    others: 'others/'
  };

  $.fileType = {
    imageehan: 1,
    imageseg: 2,
    recognize: 3,
    others: 4,
  };

  $.alioss = {
    region: 'oss-cn-shanghai',
    bucket: 'media-ai-system',
  };

  $.randomString = function(file,len){
    const fileName = file.lastIndexOf('.');
    const fileNameLen = file.length;
    const fileType = file.substring(fileName, fileNameLen);

    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTVUWXYZLIabcdefhijkmnpgqvurstwxyz123456789';
    var maxPos = $chars.length;
    var str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str + fileType;
  };

  return $;
})(window.config || {});
