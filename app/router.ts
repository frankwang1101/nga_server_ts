import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/post', controller.home.postsInfo);
  router.resources('user', '/api/v1/user', controller.user);
  router.put('/api/v1/user', controller.user.create);
  router.resources('post', '', controller.post);
  router.resources('column', '', controller.column);
};
