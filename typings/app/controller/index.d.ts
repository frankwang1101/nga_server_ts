// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Column from '../../../app/controller/column';
import Home from '../../../app/controller/home';
import Post from '../../../app/controller/post';
import Reply from '../../../app/controller/reply';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    column: Column;
    home: Home;
    post: Post;
    reply: Reply;
    user: User;
  }
}
