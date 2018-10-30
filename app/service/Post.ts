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
        await conn.insert('n_post', post);
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
    const { app, ctx } = this;
    try {
      const result = await app.mysql.get('n_post', {
        id
      });
      const author = await ctx.service.user.show(result.authorid);
      const column = await ctx.service.column.show(result.colid);
      if (result) {
        return {
          ...result,
          author,
          column
        };
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
      const params: any = {};
      if (uid) {
        params.uid = uid;
      }
      if (key) {
        params.title = {
          operator: '%',
          text: key
        };
      }
      const [sql, vals] = sqlGenerator(
        'n_post',
        params,
        page,
        rows,
        [],
        [
          {
            table: 'n_column',
            type: 'join',
            cols: ['id', 'title', 'desc', 'ctype', 'createtime', 'order'],
            whereCls: {
              left: {
                table: 'n_post',
                col: 'colid'
              },
              right: {
                table: 'n_column',
                col: 'id'
              }
            }
          },
          {
            table: 'n_user',
            type: 'join',
            cols: ['uid', 'username', 'nickname', 'status', 'createtime'],
            whereCls: {
              left: {
                table: 'n_post',
                col: 'authorid'
              },
              right: {
                table: 'n_user',
                col: 'uid'
              }
            }
          }
        ]
      );
      const rawResult = await app.mysql.query(sql, vals);
      const result = rawResult.map((row) => {
        const author = {};
        const column = {};
        const res: any = {};
        Object.keys(row).forEach((key) => {
          if (key === 'content') {
            res.content = Buffer.from(row.content).toString();
          } else if (/^_n_column__(.+)$/.test(key)) {
            const realKey: string[] | null = /^_n_column__(.+)$/.exec(key);
            if (realKey) {
              column[realKey[1]] = row[key];
            }
          } else if (/^_n_user__(.+)$/.test(key)) {
            const realKey: string[] | null = /^_n_user__(.+)$/.exec(key);
            if (realKey) {
              author[realKey[1]] = row[key];
            }
          } else {
            res[key] = row[key];
          }
        });
        res.author = author || {};
        res.column = column || {};
        return res;
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

  public async destory(id: string) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('n_post', {
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
