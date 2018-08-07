import { Controller } from 'egg';

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IUser = ctx.request.body;
    ctx.body = await ctx.service.user.create(body);
  }
  public async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.show(ctx.params.id);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.destory(ctx.params.id);
  }
}
