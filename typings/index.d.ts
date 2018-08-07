declare module 'egg' {
  export interface Application {
    mysql: any;
  }
}

enum UserStatus {
  '启用', '禁用', '禁言'
}

enum PostType {
  '帖子', '回复'
}

enum PostStatus {
  '删除', '过期', '封禁'
}

enum PostType {
  '官方', '个人'
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
  uid: string;
  title: string;
  content: string;
  author: IUser;
  createTime: Date;
  updateTime?: Date;
  up: number;
  down: number;
  type: PostType;
  status: PostStatus;
  tag?: string;
}

interface IColumn {
  uid: string;
  title: string;
  desc: string;
  master?: Array<IUser>;
  createTime: Date;
  updateTime?: Date;
  order: number;
  type: ColType;
}
