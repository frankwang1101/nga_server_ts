import { Controller } from 'egg';

export default class PostController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IReply = ctx.request.body;
    ctx.body = await ctx.service.reply.create(body);
  }
  public async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.reply.show(ctx.params.id);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.reply.destory(ctx.params.id);
  }
}
