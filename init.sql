-- 用户表
CREATE TABLE `n_user` (
  `uid` int(14) unsigned NOT NULL AUTO_INCREMENT,
  `pwd` varchar(32) not null,
  `username` varchar(40) NOT NULL DEFAULT '',
  `nickname` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(40) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL,
  `role` int(1) not Null default 0,
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

alter table n_user AUTO_INCREMENT=10001;

insert into `n_user`(uid, username, nickname, status, createtime, pwd, `role`) values(10001, 'testuser1', '测试用户', 0, now(), 'a449233e9fa9df76d2a76d1a25066879', 5);

-- 栏目表
CREATE TABLE `n_column` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `title` varchar(40) NOT NULL DEFAULT '',
  `desc` varchar(40) NOT NULL DEFAULT '',
  `ctype` int(1) DEFAULT '0',
  `order` int(1) NOT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into `n_column`(id, title, `desc`, `order`, createtime) values('testcolid1', '测试栏目1', 'tetttt', 1, now());

-- 帖子表
CREATE TABLE `n_post` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `authorid` int(14) unsigned NOT NULL,
  `colid` varchar(36) not null,
  `title` varchar(128) NOT NULL DEFAULT '',
  `content` blob NOT NULL,
  `pstate` int(1) NOT NULL DEFAULT '0',
  `voteUp` int(10) NOT NULL DEFAULT '0',
  `voteDown` int(10) NOT NULL DEFAULT '0',
  `createTime` datetime NOT NULL,
  `updateTIme` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`authorid`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`authorid`) REFERENCES `n_user` (`uid`),
  CONSTRAINT `post_colfk_1` FOREIGN KEY (`colid`) REFERENCES `n_column` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into `n_post`(id, authorid, colid, title, content, pstate, createtime) values('testpost1', 10001, 'testcolid1', '测试帖子标题', '测试帖子内容', 0, now());

-- 回复表
CREATE TABLE `n_reply` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `authorid` int(14) unsigned NOT NULL,
  `postid` varchar(32) NOT NULL DEFAULT '',
  `content` blob NOT NULL,
  `rtype` int(1) NOT NULL DEFAULT '0',
  `rstate` int(1) NOT NULL DEFAULT '0',
  `voteUp` int(10) NOT NULL DEFAULT '0',
  `voteDown` int(10) NOT NULL DEFAULT '0',
  `createTime` datetime NOT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `authorid` (`authorid`),
  KEY `postid` (`postid`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`authorid`) REFERENCES `n_user` (`uid`),
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `n_post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;