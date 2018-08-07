import { Controller } from 'egg';

export default class ColumnController extends Controller {
  public async create() {
    const { ctx } = this;
    const body: IColumn = ctx.request.body;
    ctx.body = await ctx.service.column.create(body);
  }
  public async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.column.show(ctx.params.id);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.column.destory(ctx.params.id);
  }
}
