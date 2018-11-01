import { Controller } from 'egg';
import { entitySolve } from '../utils/util';
import * as md5 from 'blueimp-md5';
import { MD5SALTVAL } from '../utils/constant';

export default class LoginController extends Controller {
  public async login() {
    const { ctx } = this;
    const body: {
      username: string;
      pwd: string;
    } = ctx.query;
    body.pwd = md5(body.pwd, MD5SALTVAL, false);
    const user = await ctx.service.user.check(body);
    ctx.body = entitySolve(user)
  }
}
