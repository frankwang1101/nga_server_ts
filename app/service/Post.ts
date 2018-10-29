import { Service } from 'egg';
import { PostState } from '../utils/enum';
import { uuid, err, suc, sqlGenerator } from '../utils/util';

/**
 * User Service
 */
export default class Post extends Service {
  /**
   * add new post
   * @param name - your name
   */
  public async create(post: IPost) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.beginTransactionScope(async (conn) => {
        // don't commit or rollback by yourself
        post.id = uuid();
        post.pstate = PostState.有效;
        post.createTime = app.mysql.literals.now;
        await conn.insert('post', post);
        return { success: true };
      }, ctx); //
      if (result.success) {
        return suc(post);
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
      const result = await app.mysql.get('post', {
        id
      });
      if (result) {
        return result;
      } else {
        throw new Error('出错了');
      }
    } catch (e) {
      return e;
    }
  }

  public async showList({ page, rows, uid = '', key = '' }) {
    const { app } = this;
    try {
      const params: any = {}
      if (uid) {
        params.uid = uid
      }
      if (key) {
        params.title = {
          operator: '%',
          text: key
        }
      }
      const [sql, vals] = sqlGenerator('post', params, page, rows)
      const result = await app.mysql.query(sql, vals);
      if (result) {
        return result;
      } else {
        throw new Error('出错了');
      }
    } catch (e) {
      return e;
    }
  }

  public async destory(id: string) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('post', {
        id
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
