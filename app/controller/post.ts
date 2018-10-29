import { Controller } from 'egg';
import { entitySolve } from '../utils/util';

export default class PostController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IPost = ctx.request.body;
    ctx.body = await ctx.service.post.create(body);
  }
  public async show() {
    const { ctx } = this;
    const post: IPost = await ctx.service.post.show(ctx.params.id);
    ctx.body = entitySolve(post);
  }
  public async showList() {
    const { ctx } = this;
    const data = {
      page: ctx.params.page || 1,
      rows: ctx.params.rows || 10,
    };
    const postList: IPost[] & Error = await ctx.service.post.showList(data);
    ctx.body = entitySolve(postList);
  }
  public async searchList() {
    const { ctx } = this;
    const data = {
      page: ctx.params.page || 1,
      rows: ctx.params.rows || 10,
      key: ctx.params.key,
      userid: ctx.params.uid,
    };
    const postList: IPost[] & Error = await ctx.service.post.showList(data);
    ctx.body = entitySolve(postList);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.post.destory(ctx.params.id);
  }
}
