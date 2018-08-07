import { Service } from 'egg';

const err = (msg) => JSON.stringify({
  code: -1,
  msg,
});

const suc = (data) => JSON.stringify({
  code: 0,
  data,
});

/**
 * Post Service
 */
export default class Post extends Service {
  /**
   * add new Post
   * @param name - your name
   */
  public async create(post: IPost) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.beginTransactionScope(async (conn) => {
        // don't commit or rollback by yourself
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

  public async show(uid: string) {
    const {app} = this;
    try {
      const result = await app.mysql.get('post', {
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

  public async destory(uid: string) {
    const {app} = this;
    try {
      const result = await app.mysql.delete('post', {
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
