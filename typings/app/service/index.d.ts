// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Post from '../../../app/service/Post';
import Reply from '../../../app/service/Reply';
import Test from '../../../app/service/Test';
import User from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    post: Post;
    reply: Reply;
    test: Test;
    user: User;
  }
}
