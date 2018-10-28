// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Column from '../../../app/service/Column';
import Post from '../../../app/service/Post';
import Reply from '../../../app/service/Reply';
import User from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    column: Column;
    post: Post;
    reply: Reply;
    user: User;
  }
}
