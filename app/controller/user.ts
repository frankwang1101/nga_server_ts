import { Controller } from 'egg';
import { entitySolve } from '../utils/util';
import md5 from 'blueimp-md5';
import { MD5SALTVAL } from '../utils/constant';

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IUser = ctx.request.body;
    body.pwd = md5(body.pwd, MD5SALTVAL, false);
    ctx.body = await ctx.service.user.create(body);
  }
  public async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.show(ctx.params.id);
  }
  public async searchList() {
    const { ctx } = this;
    const data = {
      page: ctx.query.page || 1,
      rows: ctx.query.rows || 10,
      username: ctx.query.username,
      nickname: ctx.query.nickname
    };
    const userList: IUser[] & Error = await ctx.service.user.showList(data);
    ctx.body = entitySolve(userList);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.destory(ctx.params.id);
  }
}
