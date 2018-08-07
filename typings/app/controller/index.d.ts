// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Home from '../../../app/controller/home';
import User from '../../../app/controller/user';
import Post from '../../../app/controller/post';
import Column from '../../../app/controller/column';

declare module 'egg' {
  interface IController {
    home: Home;
    user: User;
    post: Post;
    column: Column;
  }
}
