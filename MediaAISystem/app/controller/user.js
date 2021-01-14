'use strict';

const Controller = require('egg').Controller;
var fs = require('fs');
var pdf = require('html-pdf');
var path = require('path');

class UserController extends Controller {
  async createUser() {
    const { ctx } = this;

    ctx.body = await ctx.model.User.create({'userName':'liling','password':'111111'});
  }

  async htmlToPdf(){
    const ctx = this.ctx;
    console.log(path.resolve('./'));

    console.log('========================');
    var html = fs.readFileSync(path.join(path.resolve('./'),'app','/public/template/pdf-template.html'), 'utf8');
    html = html.replace(/{{name}}/g,'王兴');
    var options = {
      format: 'Legal',
      border: {
        top: "0.8in",
        right: "1in",
        bottom: "0.8in",
        left: "1in"
      },
    };


    //ctx.body = 'hello world!';
    let data = pdf.create(html, options);

    let result = '';
    await data.toFile('pdf-template.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res);
      result = res; // { filename: '/app/businesscard.pdf' }
      console.log(result);
    });
    //for(var t = Date.now();Date.now() - t <= 5000;);
    console.log('*********:'+result);
  }
}

module.exports = UserController;
