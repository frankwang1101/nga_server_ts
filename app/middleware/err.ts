module.exports = () => {
  return async function cors(ctx, next) {
    try {
      await next();
    } catch (e) {
      ctx.app.emit('error', e, ctx);
      ctx.status = e.status || 500;
      ctx.body = JSON.stringify({
        code: -1,
        msg: e.message,
      });
    }
  };
};
