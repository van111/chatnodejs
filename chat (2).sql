-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2015 at 10:47 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

CREATE TABLE IF NOT EXISTS `connections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `peer1` varchar(255) NOT NULL,
  `peer2` varchar(255) NOT NULL,
  `status` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `hashchats`
--

CREATE TABLE IF NOT EXISTS `hashchats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rand` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=382 ;

--
-- Dumping data for table `hashchats`
--

INSERT INTO `hashchats` (`id`, `rand`, `createdAt`, `updatedAt`) VALUES
(379, 'AUMlm', '2015-12-04 09:39:39', '2015-12-04 09:39:39'),
(380, 'Fbx7f', '2015-12-04 09:46:13', '2015-12-04 09:46:13'),
(381, 'CD85X', '2015-12-04 09:46:20', '2015-12-04 09:46:20');

-- --------------------------------------------------------

--
-- Table structure for table `newsfeeds`
--

CREATE TABLE IF NOT EXISTS `newsfeeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=121 ;

--
-- Dumping data for table `newsfeeds`
--

INSERT INTO `newsfeeds` (`id`, `message`, `createdAt`, `updatedAt`, `username`) VALUES
(1, 'woooohoo', '2015-11-23 10:11:37', '2015-11-23 10:11:37', 'admin'),
(2, 'willdoooo sire', '2015-11-23 10:11:44', '2015-11-23 10:11:44', 'admin'),
(3, 'hello from the other side', '2015-11-23 10:11:56', '2015-11-23 10:11:56', 'admin'),
(4, 'to tell you im sorry for everything that ive done ', '2015-11-23 10:12:33', '2015-11-23 10:12:33', 'userA'),
(5, 'hello', '2015-11-23 10:13:12', '2015-11-23 10:13:12', 'admin'),
(6, 'wuut', '2015-11-23 10:13:16', '2015-11-23 10:13:16', 'userA'),
(7, 'hiiiii', '2015-11-23 10:16:04', '2015-11-23 10:16:04', 'admin'),
(8, 'asdfasdf', '2015-11-23 10:16:36', '2015-11-23 10:16:36', 'admin'),
(9, 'awo\n', '2015-11-23 10:17:42', '2015-11-23 10:17:42', 'admin'),
(10, 'asdfasf', '2015-11-23 10:17:46', '2015-11-23 10:17:46', 'userA'),
(11, 'hahaha', '2015-11-23 10:18:09', '2015-11-23 10:18:09', 'admin'),
(12, 'joker', '2015-11-23 10:18:50', '2015-11-23 10:18:50', 'admin'),
(13, 'asdfasdf', '2015-11-23 10:18:53', '2015-11-23 10:18:53', 'userA'),
(14, 'asdfasdf', '2015-11-23 10:19:13', '2015-11-23 10:19:13', 'admin'),
(15, 'asdfasdf', '2015-11-23 10:19:41', '2015-11-23 10:19:41', 'admin'),
(16, 'ssss', '2015-11-23 10:19:49', '2015-11-23 10:19:49', 'admin'),
(17, 'fff', '2015-11-23 10:22:22', '2015-11-23 10:22:22', 'admin'),
(18, 'asdfasdf', '2015-11-23 10:22:30', '2015-11-23 10:22:30', 'userA'),
(19, 'zzz', '2015-11-23 10:22:32', '2015-11-23 10:22:32', 'admin'),
(20, 'ddd', '2015-11-23 10:22:36', '2015-11-23 10:22:36', 'userA'),
(21, 'fff', '2015-11-23 10:22:40', '2015-11-23 10:22:40', 'admin'),
(22, 'YOZZZ', '2015-11-23 10:22:54', '2015-11-23 10:22:54', 'admin'),
(23, 'yolo', '2015-11-23 10:23:06', '2015-11-23 10:23:06', 'userA'),
(24, 'wuuut', '2015-11-23 10:23:13', '2015-11-23 10:23:13', 'admin'),
(25, 'say', '2015-11-23 10:24:12', '2015-11-23 10:24:12', 'admin'),
(26, 'lol', '2015-11-23 10:24:19', '2015-11-23 10:24:19', 'userA'),
(27, 'asdfasdfasdf', '2015-11-23 10:24:52', '2015-11-23 10:24:52', 'userA'),
(28, 'nopeeee', '2015-11-23 10:25:00', '2015-11-23 10:25:00', 'admin'),
(29, 'aaaa', '2015-11-24 02:17:35', '2015-11-24 02:17:35', 'admin'),
(30, 'www', '2015-11-24 02:18:59', '2015-11-24 02:18:59', 'userA'),
(31, 'aa', '2015-11-24 02:20:19', '2015-11-24 02:20:19', 'admin'),
(32, 'aa', '2015-11-24 02:21:06', '2015-11-24 02:21:06', 'admin'),
(33, 'ff', '2015-11-24 02:21:13', '2015-11-24 02:21:13', 'admin'),
(34, 'awoo', '2015-11-24 02:22:35', '2015-11-24 02:22:35', 'admin'),
(35, 'ff', '2015-11-24 02:22:43', '2015-11-24 02:22:43', 'admin'),
(36, 'awww', '2015-11-24 02:23:16', '2015-11-24 02:23:16', 'admin'),
(37, 'ff', '2015-11-24 02:38:08', '2015-11-24 02:38:08', 'admin'),
(38, 'amawa', '2015-11-24 02:39:54', '2015-11-24 02:39:54', 'admin'),
(39, 'suuuusss', '2015-11-24 02:40:01', '2015-11-24 02:40:01', 'userA'),
(40, 'my life is movie', '2015-11-24 02:41:00', '2015-11-24 02:41:00', 'admin'),
(41, 'aa', '2015-11-24 05:26:18', '2015-11-24 05:26:18', 'admin'),
(42, 'aa', '2015-11-24 05:27:27', '2015-11-24 05:27:27', 'admin'),
(43, '', '2015-11-24 05:27:28', '2015-11-24 05:27:28', 'admin'),
(44, '', '2015-11-24 05:27:28', '2015-11-24 05:27:28', 'admin'),
(45, 'dd', '2015-11-24 05:31:51', '2015-11-24 05:31:51', 'admin'),
(46, 'a', '2015-11-24 05:36:10', '2015-11-24 05:36:10', 'admin'),
(47, 'd', '2015-11-24 05:38:50', '2015-11-24 05:38:50', 'admin'),
(48, 'f', '2015-11-24 05:38:54', '2015-11-24 05:38:54', 'userA'),
(49, 'r', '2015-11-24 05:39:12', '2015-11-24 05:39:12', 'admin'),
(50, 'hh', '2015-11-24 05:39:40', '2015-11-24 05:39:40', 'admin'),
(51, 'gg', '2015-11-24 05:39:49', '2015-11-24 05:39:49', 'admin'),
(52, 'h', '2015-11-24 05:39:51', '2015-11-24 05:39:51', 'admin'),
(53, 'nn', '2015-11-24 05:40:02', '2015-11-24 05:40:02', 'admin'),
(54, 'yuiyui', '2015-11-24 05:40:08', '2015-11-24 05:40:08', 'admin'),
(55, 'hh', '2015-11-24 05:40:29', '2015-11-24 05:40:29', 'admin'),
(56, 'gh', '2015-11-24 05:40:33', '2015-11-24 05:40:33', 'userA'),
(57, 'bnnbnb', '2015-11-24 05:40:40', '2015-11-24 05:40:40', 'userA'),
(58, 'bnnb', '2015-11-24 05:40:43', '2015-11-24 05:40:43', 'admin'),
(59, 'ff', '2015-11-24 05:41:08', '2015-11-24 05:41:08', 'userA'),
(60, 'ff', '2015-11-24 05:41:10', '2015-11-24 05:41:10', 'admin'),
(61, 'aa', '2015-11-24 05:44:17', '2015-11-24 05:44:17', 'admin'),
(62, 'asdfasdf', '2015-11-24 05:44:24', '2015-11-24 05:44:24', 'admin'),
(63, 'asdf', '2015-11-24 05:44:30', '2015-11-24 05:44:30', 'userA'),
(64, 'sdfsdf', '2015-11-24 05:44:41', '2015-11-24 05:44:41', 'userA'),
(65, 'f', '2015-11-24 05:54:01', '2015-11-24 05:54:01', 'admin'),
(66, 'lol kaaaa', '2015-11-24 05:54:12', '2015-11-24 05:54:12', 'admin'),
(67, 'why now?', '2015-11-24 05:54:34', '2015-11-24 05:54:34', 'admin'),
(68, 'lol\n', '2015-11-24 05:59:34', '2015-11-24 05:59:34', 'admin'),
(69, 'f', '2015-11-24 06:00:26', '2015-11-24 06:00:26', 'admin'),
(70, 'a', '2015-11-24 06:00:56', '2015-11-24 06:00:56', 'userA'),
(71, 'wut', '2015-11-24 06:01:09', '2015-11-24 06:01:09', 'admin'),
(72, 'lol', '2015-11-24 06:01:31', '2015-11-24 06:01:31', 'admin'),
(73, 'awwoo\n', '2015-11-24 06:01:42', '2015-11-24 06:01:42', 'admin'),
(74, 'aaa', '2015-11-24 06:01:48', '2015-11-24 06:01:48', 'userA'),
(75, 'aaa', '2015-11-24 06:03:07', '2015-11-24 06:03:07', 'userA'),
(76, 'lol', '2015-11-24 06:03:30', '2015-11-24 06:03:30', 'userA'),
(77, 'ha', '2015-11-24 06:06:37', '2015-11-24 06:06:37', 'userA'),
(78, '', '2015-11-24 06:06:52', '2015-11-24 06:06:52', 'userA'),
(79, 'yow dog\n', '2015-11-24 06:06:57', '2015-11-24 06:06:57', 'userA'),
(80, 'aw', '2015-11-24 06:07:04', '2015-11-24 06:07:04', 'admin'),
(81, 'a', '2015-11-24 06:09:32', '2015-11-24 06:09:32', 'admin'),
(82, 'lol', '2015-11-24 06:11:14', '2015-11-24 06:11:14', 'admin'),
(83, '', '2015-11-24 06:11:17', '2015-11-24 06:11:17', 'admin'),
(84, 'lol', '2015-11-24 06:11:36', '2015-11-24 06:11:36', 'admin'),
(85, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '2015-11-24 06:11:51', '2015-11-24 06:11:51', 'admin'),
(86, 'xxx', '2015-11-24 06:11:55', '2015-11-24 06:11:55', 'userA'),
(87, 'xx', '2015-11-24 06:12:03', '2015-11-24 06:12:03', 'admin'),
(88, 'xx', '2015-11-24 06:12:06', '2015-11-24 06:12:06', 'userA'),
(89, 'yow guys', '2015-11-24 06:13:56', '2015-11-24 06:13:56', 'admin'),
(90, 'wut?', '2015-11-24 06:14:02', '2015-11-24 06:14:02', 'userA'),
(91, 'stop', '2015-11-24 06:14:14', '2015-11-24 06:14:14', 'userA'),
(92, 'reallyyy btch?', '2015-11-24 06:14:26', '2015-11-24 06:14:26', 'admin'),
(93, 'a', '2015-11-24 06:16:17', '2015-11-24 06:16:17', 'userA'),
(94, 'aaa', '2015-11-24 06:16:24', '2015-11-24 06:16:24', 'admin'),
(95, 'wut', '2015-11-24 06:16:29', '2015-11-24 06:16:29', 'userA'),
(96, 'jooo', '2015-11-24 06:16:35', '2015-11-24 06:16:35', 'userA'),
(97, 'a', '2015-11-24 06:16:39', '2015-11-24 06:16:39', 'userA'),
(98, 'dont care', '2015-11-24 06:16:52', '2015-11-24 06:16:52', 'admin'),
(99, 'aw', '2015-11-24 06:26:27', '2015-11-24 06:26:27', 'admin'),
(100, 'ff', '2015-11-24 06:29:13', '2015-11-24 06:29:13', 'admin'),
(101, 's', '2015-11-24 06:31:13', '2015-11-24 06:31:13', 'admin'),
(102, 'w', '2015-11-24 06:32:32', '2015-11-24 06:32:32', 'userA'),
(103, 'f', '2015-11-24 06:32:36', '2015-11-24 06:32:36', 'admin'),
(104, 'aa', '2015-11-24 06:32:40', '2015-11-24 06:32:40', 'admin'),
(105, 'aaaw', '2015-11-24 06:33:38', '2015-11-24 06:33:38', 'admin'),
(106, 'lol ka', '2015-11-24 06:33:43', '2015-11-24 06:33:43', 'userA'),
(107, 'aw', '2015-11-24 06:34:18', '2015-11-24 06:34:18', 'admin'),
(108, 'aa', '2015-11-24 06:34:21', '2015-11-24 06:34:21', 'userA'),
(109, 'a', '2015-11-24 06:35:01', '2015-11-24 06:35:01', 'admin'),
(110, 'aa', '2015-11-24 06:35:04', '2015-11-24 06:35:04', 'userA'),
(111, 'ff', '2015-11-24 06:35:09', '2015-11-24 06:35:09', 'userA'),
(112, 'yow sup dog', '2015-11-24 06:35:15', '2015-11-24 06:35:15', 'userA'),
(113, 'wooooo', '2015-11-24 06:35:21', '2015-11-24 06:35:21', 'admin'),
(114, 'key', '2015-11-24 06:37:16', '2015-11-24 06:37:16', 'userA'),
(115, 'ff', '2015-12-01 06:25:52', '2015-12-01 06:25:52', 'admin'),
(116, 'fff', '2015-12-02 05:49:34', '2015-12-02 05:49:34', 'userA'),
(117, 'gg', '2015-12-02 05:49:51', '2015-12-02 05:49:51', 'admin'),
(118, 'dd', '2015-12-02 05:49:57', '2015-12-02 05:49:57', 'userA'),
(119, 'gg', '2015-12-02 09:55:07', '2015-12-02 09:55:07', 'admin'),
(120, 'fff', '2015-12-03 11:40:54', '2015-12-03 11:40:54', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `pmessages`
--

CREATE TABLE IF NOT EXISTS `pmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(250) NOT NULL,
  `toid` varchar(250) NOT NULL,
  `message` text NOT NULL,
  `chatrand` varchar(255) NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=130 ;

-- --------------------------------------------------------

--
-- Table structure for table `tblchats`
--

CREATE TABLE IF NOT EXISTS `tblchats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `username` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=91 ;

--
-- Dumping data for table `tblchats`
--

INSERT INTO `tblchats` (`id`, `text`, `username`) VALUES
(35, 'Hello!', 'Jenny'),
(36, 'Hi jen!', 'Ted'),
(37, 'Hello girl', 'Johanna'),
(38, 'sss', 'sss'),
(39, 'Hey!', 'Juliet'),
(40, 'Juls', 'Romeo'),
(41, 'Okay', 'Tanya'),
(42, 'jingle bells', 'admin'),
(43, 'hi guys!!!', 'userA'),
(44, 'heyyyy', 'admin'),
(45, 'joke ra', 'admin'),
(46, 'sure???', 'userA'),
(47, 'yah', 'admin'),
(48, 'hahahha', 'userA'),
(49, 'yah', 'admin'),
(50, 'ff', 'admin'),
(51, 'testing', 'admin'),
(52, 'ddd', 'admin'),
(53, 'www', 'admin'),
(54, 'sss', 'admin'),
(55, 'ddd', 'admin'),
(56, 'ddd', 'admin'),
(57, 'dd', 'admin'),
(58, 'dd', 'admin'),
(59, 'dd', 'admin'),
(60, 'f', 'admin'),
(61, 'dd', 'admin'),
(62, 'ddd', 'admin'),
(63, 'dd', 'admin'),
(64, 'd', 'admin'),
(65, 'test', 'admin'),
(66, 'ddd', 'admin'),
(67, 'test', 'admin'),
(68, 'test', 'admin'),
(69, 'test', 'admin'),
(70, 'tes', 'admin'),
(71, 'ddd', 'admin'),
(72, 'ffff', 'admin'),
(73, '', 'admin'),
(74, 'ddd', 'admin'),
(75, 'ss', 'admin'),
(76, 'ff', 'admin'),
(77, 'eee', 'admin'),
(78, 'sss', 'admin'),
(79, 'sss', 'admin'),
(80, 'asdf', 'admin'),
(81, 'asdfwerwer', 'admin'),
(82, 'asdfwerwer', 'admin'),
(83, 'asdfwerwer', 'admin'),
(84, 'asdfwerwer', 'admin'),
(85, 'asdfwerwer', 'admin'),
(86, 'asdfwerwer', 'admin'),
(87, 'aa', 'admin'),
(88, 'www', 'userA'),
(89, 'suuuuuus', 'userB'),
(90, 'mga emewww', 'userA');

-- --------------------------------------------------------

--
-- Table structure for table `timechats`
--

CREATE TABLE IF NOT EXISTS `timechats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `peer` varchar(25) NOT NULL,
  `room` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `peer`, `room`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin', 'g4sp4i60jlbu766r', 'room1', 0, '0000-00-00', '2015-12-04'),
(2, 'userA', '1234', 'pyjwln70vdmo0f6r', 'room1', 0, '0000-00-00', '2015-12-04'),
(3, 'userB', '7777', '', '', 0, '0000-00-00', '2015-12-03'),
(4, 'userC', '8888', '', '', 0, '0000-00-00', '2015-12-02'),
(5, 'hello', '1111', '', '', 0, '2015-12-02', '2015-12-03'),
(6, 'test', 'test', '', '', 0, '2015-12-02', '2015-12-02'),
(7, 'test1', 'test1', '', '', 0, '2015-12-02', '2015-12-02'),
(8, 'user1', '12345', '', '', 0, '2015-12-03', '2015-12-03'),
(9, 'user2', '12345', '', '', 0, '2015-12-03', '2015-12-03');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
