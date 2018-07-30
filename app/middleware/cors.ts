module.exports = () => {
  return async function cors(ctx, next) {
    await next();
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
  }
}