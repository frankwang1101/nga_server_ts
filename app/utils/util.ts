const random = (bit: number = 8) => {
  return Math.random()
    .toString(32)
    .substr(2, bit);
};

export const uuid = () => {
  return `${random(4)}-${random()}-${random()}-${Date.now()}`;
};

export const err = (msg) =>
  JSON.stringify({
    code: -1,
    msg
  });

export const entitySolve = (target) => {
  if (getType(target) === 'error') {
    return err(target.message);
  }
  return suc(target);
};

export const suc = (data) =>
  data.code
    ? data
    : JSON.stringify({
        code: 0,
        data
      });

export const getType = (t) => {
  if (!t) {
    return 'error';
  }
  const word = Object.prototype.toString.call(t);
  const match = /^\[object\s(.+)\]$/.exec(word);
  if (!match || !match[1]) {
    return 'error';
  }
  return match[1].toLowerCase();
};

export const sqlGenerator = (
  table,
  params,
  page?,
  rows?,
  cols: string[] = [],
  joins: Array<{
    table: string;
    type: string;
    cols: string[];
    whereCls?: {
      left: {
        table: string,
        col: string
      };
      right:{
        table: string,
        col: string
      };
    };
  }> = []
) => {
  let tableCount: number = 0;
  const joinText: string[] = [];
  const joinConditions: any[] = [];
  const colName: string[] = cols.length ? cols : ['t.*'];
  const tableMap = {
    [table]: 't'
  };
  // 联合查询匹配
  if (joins.length) {
    joins.forEach((join) => {
      if (join.cols.length) {
        colName.push(join.cols.map((col) => `t${tableCount}.${col} as _${join.table}__${col}`).join(','));
      } else {
        colName.push(`t${tableCount}.*`);
      }
      joinText.push(`${join.type} ${join.table} t${tableCount}`);
      joinConditions.push(join.whereCls);
      tableMap[join.table] = `t${tableCount}`;
      tableCount++;
    });
  }
  let sql = `select ${colName.join(',')} from ${table} t ${joinText.join(
    ' '
  )} `;
  // 排序
  const order = ' order by createtime desc ';
  const whereCls: string[] = [];
  const vals: string[] = [];
  const keys = Object.keys(params);
  // 条件匹配
  keys.forEach((key: string) => {
    const val = params[key];
    let wildcard = val;
    whereCls.push(whereCls.length === 0 ? 'where' : 'and');
    if (getType(val) !== 'object') {
      whereCls.push(`t.${key}=?`);
    } else {
      const operator = val.operator;
      switch (operator) {
        case '%':
          whereCls.push(`t.${key} like ?`);

          wildcard = `%${val.text}%`;
          break;
        case '>':
        case '>=':
        case '<':
        case '<=':
          whereCls.push(`t.${key} ${operator} ?`);
          wildcard = `${val.text}`;
          break;
        case 'in':
          whereCls.push(`t.${key} ${operator} ?`);
          wildcard = `${val.text}`;
          break;
        default:
          break;
      }
    }
    vals.push(wildcard);
  });
  sql += whereCls.join(' ');
  // 联合查询表条件匹配
  joinConditions.map((condition, idx) => {
    const text = `${tableMap[condition.left.table]}.${condition.left.col}=${
      tableMap[condition.right.table]
    }.${condition.right.col}`;
    if (!whereCls.length && !idx) {
      return `where ${text}`;
    }
    return `and ${text}`;
  });
  sql += order;
  // 分页
  if (page && rows) {
    sql += `limit ${(page - 1) * rows},${rows}`;
  }
  return [sql, vals];
};
