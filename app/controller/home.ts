import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  public async postsInfo() {
    this.ctx.body = await this.ctx.service.test.getPosts()
  }
}
