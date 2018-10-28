import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // router.get('/post', controller.home.postsInfo);
  // router.post('/')
  router.resources('user', '/api/v1/user', controller.user);
  router.resources('post', '/api/v1/post', controller.post);
  router.resources('reply', '/api/v1/reply', controller.reply);
};
