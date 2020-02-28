'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  
  router.get('/imageehan/makeSuperResolutionImage', controller.imageenhan.makeSuperResolutionImage);
  router.get('/imageehan/changeImageSize', controller.imageenhan.changeImageSize);
  router.get('/imageehan/extendImageStyle', controller.imageenhan.extendImageStyle);
  router.get('/imageehan/recolorImage', controller.imageenhan.recolorImage);

  router.get('/recognize/recognizeImageStyle', controller.recognize.recognizeImageStyle);
  router.get('/recognize/detectImageElements', controller.recognize.detectImageElements);
  router.get('/recognize/recognizeImageColor', controller.recognize.recognizeImageColor);
  router.get('/recognize/recognizeScene', controller.recognize.recognizeScene);
  router.get('/recognize/taggingImage', controller.recognize.taggingImage);

  router.get('/imageseg/segmentCommonImage', controller.imageseg.segmentCommonImage);

};
