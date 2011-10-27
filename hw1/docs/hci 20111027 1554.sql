-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.55-community


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema hci_hw1
--

CREATE DATABASE IF NOT EXISTS hci_hw1;
USE hci_hw1;

--
-- Definition of table `class`
--

DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `tid` int(11) NOT NULL COMMENT '老师id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `class`
--

/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` (`id`,`name`,`tid`) VALUES 
 (1,'人机交互的软件工程方法',1),
 (2,'个性化二维码设计及编解码研究',2),
 (3,'软件构造',2),
 (4,' 手写文档识别研究',1);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;


--
-- Definition of table `record`
--

DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `type` smallint(6) NOT NULL COMMENT '类型：\n1：点名\n2：抽查',
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `record`
--

/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` (`id`,`date`,`type`,`cid`) VALUES 
 (1,'2011-10-18 14:11:00',1,1),
 (2,'2011-10-18 14:11:00',2,1),
 (3,'2011-10-25 00:00:00',1,4),
 (4,'2011-10-25 00:00:00',1,1),
 (5,'2011-10-27 00:00:00',1,1),
 (6,'2011-10-27 00:00:00',1,4);
/*!40000 ALTER TABLE `record` ENABLE KEYS */;


--
-- Definition of table `stu_rec`
--

DROP TABLE IF EXISTS `stu_rec`;
CREATE TABLE `stu_rec` (
  `rid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL COMMENT '备注\n\n解释这个学生这次未到记录的原因，如生病请假'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stu_rec`
--

/*!40000 ALTER TABLE `stu_rec` DISABLE KEYS */;
INSERT INTO `stu_rec` (`rid`,`sid`,`comment`) VALUES 
 (3,9,NULL),
 (3,15,NULL),
 (3,14,NULL),
 (3,5,NULL),
 (3,10,NULL),
 (3,7,NULL),
 (3,8,NULL),
 (4,18,NULL),
 (4,19,NULL),
 (4,2,NULL),
 (4,7,NULL),
 (4,12,NULL),
 (4,16,NULL),
 (4,10,NULL),
 (4,8,NULL),
 (4,6,NULL),
 (5,7,NULL),
 (5,19,NULL),
 (5,17,NULL),
 (6,1,NULL),
 (6,3,NULL),
 (6,5,NULL),
 (6,9,NULL);
/*!40000 ALTER TABLE `stu_rec` ENABLE KEYS */;


--
-- Definition of table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(45) NOT NULL COMMENT '学号',
  `name` varchar(45) NOT NULL COMMENT '姓名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`id`,`num`,`name`) VALUES 
 (1,'081251041','葛羽航'),
 (2,'081251037','高运'),
 (3,'081251041','葛馨阳'),
 (4,'081251042','龚晨'),
 (5,'081251001','某某一'),
 (6,'081251002','某某二'),
 (7,'081251003','某某三'),
 (8,'081251004','某某四'),
 (9,'081251005','某某五'),
 (10,'081251006','某某六'),
 (11,'081251007','某某七'),
 (12,'081251008','某某八'),
 (13,'081251009','某某九'),
 (14,'081251010','某某十'),
 (15,'081251011','某某甲'),
 (16,'081251012','某某乙'),
 (17,'081251013','某某丙'),
 (18,'081251014','某某丁'),
 (19,'081251015','某某卯');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;


--
-- Definition of table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teacher`
--

/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` (`id`,`name`,`email`,`password`) VALUES 
 (1,'冯桂焕','fgh@xxx.com','123456'),
 (2,'郑涛','zt@xxx.com','123456');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
