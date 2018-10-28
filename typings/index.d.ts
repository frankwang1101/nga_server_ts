declare module 'egg' {
  export interface Application {
    mysql: any;
  }
}

interface IUser {
  uid: number;
  username: string;
  nickname: string;
  mobile?: number;
  email?: string;
  pwd?: string;
  status: UserStatus;
  createTime?: Date;
  updateTime?: Date;
}

interface IPost {
  id: string;
  authorid: number;
  title: string;
  content: string;
  pstate: PostState;
  voteUp: number;
  voteDown: number;
  createTime?: Date;
  updateTime?: Date;
}

interface IReply {
  id: string;
  authorid: number;
  postid: string;
  content: string;
  rtype: ReplyType;
  rstate: ReplyState;
  voteUp: number;
  voteDown: number;
  createTime?: Date;
  updateTime?: Date;
}
