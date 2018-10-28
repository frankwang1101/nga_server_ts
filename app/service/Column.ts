import { Service } from 'egg';
import { ColumnType } from '../utils/enum';
import { uuid } from '../utils/util';

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
        column.id = uuid();
        column.ctype = column.ctype || ColumnType.官方;
        column.createTime = app.mysql.literals.now;
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

  public async show(id: string) {
    const { app } = this;
    try {
      const result = await app.mysql.get('column', {
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
      const result = await app.mysql.delete('column', {
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
