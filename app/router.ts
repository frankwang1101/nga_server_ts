import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/login', controller.login.login);
  router.get('/api/v1/user/search', controller.user.searchList);
  router.resources('user', '/api/v1/user', controller.user);
  router.get('/api/v1/post/search', controller.post.searchList);
  router.resources('post', '/api/v1/post', controller.post);
  router.get('/api/v1/reply/search', controller.reply.searchList);
  router.resources('reply', '/api/v1/reply', controller.reply);
  router.get('/api/v1/column/search', controller.column.searchList);
  router.resources('column', '/api/v1/column', controller.column);
};
