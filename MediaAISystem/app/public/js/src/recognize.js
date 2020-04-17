var OSS = OSS.Wrapper;

new Vue({
  el: '#app',
  delimiters: ['${', '}'],
  data: {
    imgUrl : '',
    fileName : '',
    progressPercent: 0,
    imagetagCount: [],
    detectCount: [],
    sceneCount : [],
    colorCount : [],
    styleCount : [],
  },
  methods: {
    menuClick(name) {
      if (name == '1-1') {
        window.location.href = '/manageUndergraduate';
      } else if (name == '1-2') {
        window.location.href = '/managePostgraduate';
      } else if (name == 2) {
        window.location.href = '/importInfo';
      } else if (name == '3-1') {
        window.location.href = '/statistics';
      } else if (name == '3-2') {
        window.location.href = '/searchStatistics';
      } else if (name == 4) {
        window.location.href = '/manageLogout';
      }
    },
    uploadImages(files) {
      let that = this;
      let file = files.target.files[0];
      if (file.size / 1048576 <= 3) {
        let fileName = config.randomString(files.target.files[0].name,16);
        this.$Notice.success({
          title: '上传中···'
        });
        this.$Loading.start();
        $.ajax({
          url: config.ajaxUrls.getSTSSignature + config.fileType.recognize,
          type: 'GET',
          success: function(res) {
            if (res.res.status == 200) {
              let client = new OSS({
                region: config.alioss.region,
                accessKeyId: res.credentials.AccessKeyId,
                accessKeySecret: res.credentials.AccessKeySecret,
                stsToken: res.credentials.SecurityToken,
                bucket: config.alioss.bucket
              });
              client.multipartUpload(config.path.recognize + fileName, file, {
                progress: function (p) {
                	return function (done) {
                		that.progressPercent = p * 100;
                		done();
                	}
                }
              }).then(function(res) {
                let objectPath = config.path.recognize + fileName;
                $.ajax({
                  url: config.ajaxUrls.getUrlSignature,
                  type: 'GET',
                  data: {
                    objectPath: objectPath
                  },
                  success: function(res) {
                    let img = new Image();
                    img.src = res;
                    img.onload = function() {
                      that.$Notice.success({
                        title: '上传成功！'
                      });
                      that.$Loading.finish();
                      that.imgUrl = res;
                      that.fileName = fileName;

                    }
                  }
                })
              });
            } else {
              that.$Loading.error();
              that.$Notice.error({
                title: "上传出现异常，请刷新界面重试！"
              })
            }
          }
        })
      } else {
        this.$Notice.error({
          title: "图片大小超过3M，请重新上传..."
        })
      }

    },

    recognizeImageStyle(){
      let that = this;
      this.$Loading.start();
      $.ajax({
        url: config.ajaxUrls.recognizeImageStyle,
        type: 'GET',
        data: {
          imageUrl: that.imgUrl
        },
        success: function(res) {
          if (res.status == 200) {
            let styles = res.data;
            for (let i = 0; i < styles.length; i++){
              that.styleCount.push(styles[i]);
            }
          }
          else{

          }
          that.$Loading.finish();
        },
        error: function(){
          that.$Loading.error();
        }
      })
    },

    taggingImage(){
      let that = this;
      this.$Loading.start();
      $.ajax({
        url: config.ajaxUrls.taggingImage,
        type: 'GET',
        data: {
          imageUrl: that.imgUrl
        },
        success: function(res) {
          if (res.status == 200) {
            let tags = res.data;
            for (let i = 0; i < tags.length; i++){
              that.imagetagCount.push(tags[i].Value);
            }
          }
          else{

          }
          that.$Loading.finish();
        },
        error: function(){
          that.$Loading.error();
        }
      })
    },

    recognizeScene(){
      let that = this;
      this.$Loading.start();
      $.ajax({
        url: config.ajaxUrls.recognizeScene,
        type: 'GET',
        data: {
          imageUrl: that.imgUrl
        },
        success: function(res) {
          if (res.status == 200) {
            let tags = res.data;
            for (let i = 0; i < tags.length; i++){
              that.sceneCount.push(tags[i].Value);
            }
          }
          else{

          }
          that.$Loading.finish();
        },
        error: function(){
          that.$Loading.error();
        }
      })
    },

    recognizeImageColor(){
      let that = this;
      this.$Loading.start();
      $.ajax({
        url: config.ajaxUrls.recognizeImageColor,
        type: 'GET',
        data: {
          imageUrl: that.imgUrl
        },
        success: function(res) {
          if (res.status == 200) {
            let colors = res.data;
            for (let i = 0; i < colors.length; i++){
              that.colorCount.push(colors[i]);
            }
          }
          else{

          }
          that.$Loading.finish();
        },
        error: function(){
          that.$Loading.error();
        }
      })
    },

    detectImageElements(){
      let that = this;
      this.$Loading.start();
      $.ajax({
        url: config.ajaxUrls.detectImageElements,
        type: 'GET',
        data: {
          imageUrl: that.imgUrl
        },
        success: function(res) {
          if (res.status == 200) {
            let elements = res.data;
            console.log(elements);
            for (let i = 0; i < elements.length; i++){
              that.detectCount.push(elements[i].Type);
            }
          }
          else{

          }
          that.$Loading.finish();
        },
        error: function(){
          that.$Loading.error();
        }
      })
    }
  }
})
