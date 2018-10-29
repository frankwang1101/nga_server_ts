import { Controller } from 'egg';
import { entitySolve } from '../utils/util';

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
  public async searchList() {
    const { ctx } = this;
    const data = {
      key: ctx.query.key,
    };
    const colList: IColumn[] & Error = await ctx.service.column.showList(data);
    ctx.body = entitySolve(colList);
  }
  public async destroy() {
    const { ctx } = this;
    ctx.body = await ctx.service.column.destory(ctx.params.id);
  }
}
