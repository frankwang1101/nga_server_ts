import { Service } from 'egg';
import { uuid } from '../utils/util';
import { ReplyType, ReplyState } from '../utils/enum';

const err = (msg) =>
  JSON.stringify({
    code: -1,
    msg,
  });

const suc = (data) =>
  JSON.stringify({
    code: 0,
    data,
  });

/**
 * User Service
 */
export default class Reply extends Service {
  /**
   * add new reply
   * @param name - your name
   */
  public async create(reply: IReply) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.beginTransactionScope(async (conn) => {
        // don't commit or rollback by yourself
        reply.id = uuid();
        reply.rtype = reply.rtype || ReplyType.来自帖子;
        reply.rstate = ReplyState.有效;
        reply.createTime = app.mysql.literals.now;
        await conn.insert('reply', reply);
        return { success: true };
      }, ctx); //
      if (result.success) {
        return suc(reply);
      } else {
        throw new Error('出错了');
      }
    } catch (e) {
      return err(e.message);
    }
  }

  public async show(id: string) {
    const { app } = this;
    try {
      const result = await app.mysql.get('reply', {
        id,
      });
      if (result) {
        return suc(result);
      } else {
        throw new Error('出错了');
      }
    } catch (e) {
      return err(e.message);
    }
  }

  public async destory(id: number) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('reply', {
        id,
      });
      if (result) {
        return suc(result);
      } else {
        throw new Error('出错了');
      }
    } catch (e) {
      return err(e.message);
    }
  }
}
