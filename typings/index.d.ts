declare module 'egg' {
  export interface Application {
    mysql: any;
  }
}

interface IUser {
  uid?: number;
  username: string;
  nickname: string;
  mobile?: number;
  email?: string;
  pwd?: string;
  createTime: Date;
  updateTime?: Date;
}
