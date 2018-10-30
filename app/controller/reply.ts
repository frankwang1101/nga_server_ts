import { Controller } from 'egg';
import { entitySolve } from '../utils/util';

export default class ReplyController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IReply = ctx.request.body;
    ctx.body = await ctx.service.reply.create(body);
  }
  public async showList() {
    const { ctx } = this;
    const data = {
      page: ctx.query.page || 1,
      rows: ctx.query.rows || 10,
    };
    const replyList: IReply[] & Error = await ctx.service.reply.showList(data);
    ctx.body = entitySolve(replyList);
  }
  public async searchList() {
    const { ctx } = this;
    const data = {
      page: ctx.query.page || 1,
      rows: ctx.query.rows || 10,
      key: ctx.query.key,
      userid: ctx.query.uid,
      postid: ctx.query.postid
    };
    const replyList: IReply[] & Error = await ctx.service.reply.showList(data);
    ctx.body = entitySolve(replyList);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.reply.destory(ctx.params.id);
  }
}
