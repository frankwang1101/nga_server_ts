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

insert into user(uid, username, nickname, createtime,status) values(100001, 'test1', 'test1', Date('2018-08-05 11:22:33'), 0);

CREATE TABLE `post` (
  `uid` varchar(14) NOT NULL,
  `title` varchar(40) NOT NULL DEFAULT '',
  `content` blob NOT NULL,
  `author_id` int(11) NOT NULL,
  `up` int(8) DEFAULT '0',
  `down` int(8) DEFAULT '0',
  `type` int(8) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  `tag` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_author_user` (`author_id`),
  CONSTRAINT `fk_author_user` FOREIGN KEY (`author_id`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `column` (
  `uid` varchar(14) NOT NULL,
  `title` varchar(40) NOT NULL DEFAULT '',
  `desc` varchar(40) NOT NULL DEFAULT '',
  `master` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `type` int(8) DEFAULT '0',
  `order` int(1) NOT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
