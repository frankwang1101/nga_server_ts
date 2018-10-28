import { Service } from 'egg';
import { UserStatus } from '../utils/enum';
// import * as dayjs from dayjs;

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
export default class User extends Service {
  /**
   * add new user
   * @param name - your name
   */
  public async create(user: IUser) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.beginTransactionScope(async (conn) => {
        // don't commit or rollback by yourself
        user.createTime = app.mysql.literals.now;
        user.status = UserStatus.启用;
        const r = await conn.insert('user', user);
        return {
          success: true,
          data: {
            ...user,
            uid: r.insertId,
          },
        };
      }, ctx); //
      if (result.success) {
        return suc(result.data);
      } else {
        throw new Error('新增出错了');
      }
    } catch (e) {
      return err(e.message);
    }
  }

  public async show(uid: number) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', {
        uid,
      });
      if (result) {
        return suc(result);
      } else {
        throw new Error('获取出错了');
      }
    } catch (e) {
      return err(e.message);
    }
  }

  public async destory(uid: number) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('user', {
        uid,
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
