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
  `uid` int(14) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL DEFAULT '',
  `content` blob NOT NULL,
  `author_id` int(11) NOT NULL,
  `up` int(8) DEFAULT '0',
  `down` int(8) DEFAULT '0',
  `type` int(8) DEFAULT '0',
  `status` int(1) NOT NULL,
  `tag` varchar(10) NOT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_author_user` (`author_id`),
  CONSTRAINT `fk_author_user` FOREIGN KEY (`author_id`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `column` (
  `uid` int(14) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL DEFAULT '',
  `desc` varchar(40) NOT NULL default '',
  `master` varchar(1000) DEFAULT '0',
  `type` int(8) DEFAULT '0',
  `order` int(1) NOT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

