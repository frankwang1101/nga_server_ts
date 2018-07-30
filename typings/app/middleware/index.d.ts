// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Cors from '../../../app/middleware/cors';

declare module 'egg' {
  interface IMiddleware {
    cors: typeof Cors;
  }
}
