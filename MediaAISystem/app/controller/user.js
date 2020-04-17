'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async createUser() {
    const { ctx } = this;

    ctx.body = await ctx.model.User.create({'userName':'liling','password':'111111'});
  }

}

module.exports = UserController;
