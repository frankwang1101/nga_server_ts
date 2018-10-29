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

export const sqlGenerator = (table, params, page, rows) => {
  let sql = `select * from ${table} t `;
  const order = ' order by createtime desc ';
  const whereCls: string[] = [];
  const vals: string[] = [];
  const keys = Object.keys(params);
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
  sql += order;
  sql += `limit ${(page - 1) * rows},${rows}`;
  return [sql, vals];
};
