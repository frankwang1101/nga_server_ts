import { Controller } from 'egg';

export default class PostController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IPost = ctx.request.body;
    ctx.body = await ctx.service.post.create(body);
  }
  public async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.post.show(ctx.params.id);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.post.destory(ctx.params.id);
  }
}
