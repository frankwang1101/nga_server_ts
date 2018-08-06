// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Cors from '../../../app/middleware/cors';
import Err from '../../../app/middleware/err';

declare module 'egg' {
  interface IMiddleware {
    cors: typeof Cors;
    err: typeof Err;
  }
}
