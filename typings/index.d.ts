declare module 'egg' {
  export interface Application {
    mysql: any;
  }
}

enum UserStatus {
  '启用', '禁用', '禁言'
}

interface IUser {
  uid?: number;
  username: string;
  nickname: string;
  mobile?: number;
  email?: string;
  pwd?: string;
  status: UserStatus;
  createTime: Date;
  updateTime?: Date;
}

interface IPost {
  id: string;
}
