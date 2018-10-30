import { Service } from 'egg';
import { UserStatus } from '../utils/enum';
import { err, suc, sqlGenerator } from '../utils/util';

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
        const r = await conn.insert('n_user', user);
        return {
          success: true,
          data: {
            ...user,
            uid: r.insertId
          }
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
      const result = await app.mysql.get('n_user', {
        uid
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

  public async showList({ page, rows, username = '', nickname = '' }) {
    const { app } = this;
    try {
      const params: any = {};
      if (username) {
        params.username = {
          operator: '%',
          text: username
        };
      }
      if (nickname) {
        params.nickname = {
          operator: '%',
          text: nickname
        };
      }
      // 生成sql
      const [sql, vals] = sqlGenerator('n_user', params, page, rows);
      const result = await app.mysql.query(sql, vals);
      if (result) {
        return result.map((r) => ({
          ...r
        }));
      } else {
        throw new Error('出错了');
      }
    } catch (e) {
      return e;
    }
  }

  public async destory(uid: number) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('n_user', {
        uid
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
