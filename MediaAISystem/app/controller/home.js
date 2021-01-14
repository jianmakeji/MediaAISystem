'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html');
  }

  async recognize() {
    const { ctx } = this;
    await ctx.render('recognize.html');
  }

  async htmlPdf(){
    const {ctx} = this;
    await ctx.render('pdf-template.html');
  }
}

module.exports = HomeController;
