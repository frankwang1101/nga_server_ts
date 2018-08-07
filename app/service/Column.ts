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
 * Column Service
 */
export default class Column extends Service {
  /**
   * add new column
   * @param column - column
   */
  public async create(column: IColumn) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.beginTransactionScope(async (conn) => {
        // don't commit or rollback by yourself
        await conn.insert('column', column);
        return { success: true };
      }, ctx); //
      if (result.success) {
        return suc(column);
      } else {
        console.log(result);
        throw new Error('出错了');
      }
    } catch (e) {
      console.log(e);
      return err(e.message);
    }
  }

  public async show(uid: string) {
    const {app} = this;
    try {
      const result = await app.mysql.get('column', {
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

  public async destory(uid: number) {
    const {app} = this;
    try {
      const result = await app.mysql.delete('column', {
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
