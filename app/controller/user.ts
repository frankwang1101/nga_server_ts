import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IUser = ctx.request.body;
    ctx.body = await ctx.service.user.create(body);
  }
  public async show() {
    const { ctx } = this;
    this.ctx.body = await this.ctx.service.user.show(ctx.params.id);
  }
}
