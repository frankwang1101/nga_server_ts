-- 用户表
CREATE TABLE `user` (
  `uid` int(14) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL DEFAULT '',
  `nickname` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(40) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

alter table user AUTO_INCREMENT=10001;
-- 帖子表
CREATE TABLE `post` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `authorid` int(14) unsigned NOT NULL,
  `title` varchar(128) NOT NULL DEFAULT '',
  `content` blob NOT NULL,
  `pstate` int(1) NOT NULL DEFAULT '0',
  `voteUp` int(10) NOT NULL DEFAULT '0',
  `voteDown` int(10) NOT NULL DEFAULT '0',
  `createTime` datetime NOT NULL,
  `updateTIme` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`authorid`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`authorid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- 回复表
CREATE TABLE `reply` (
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
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`authorid`) REFERENCES `user` (`uid`),
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;