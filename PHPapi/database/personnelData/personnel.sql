-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2022-03-01 17:15:00
-- 服务器版本： 5.7.31
-- PHP 版本： 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `personalinfo`
--

-- --------------------------------------------------------

--
-- 表的结构 `personnel`
--

DROP TABLE IF EXISTS `personnel`;
CREATE TABLE IF NOT EXISTS `personnel` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `员工编号` int(255) DEFAULT NULL,
  `姓名` varchar(255) DEFAULT NULL,
  `性别` varchar(255) DEFAULT NULL,
  `年龄` int(255) DEFAULT NULL,
  `部门` varchar(255) DEFAULT NULL,
  `地址` varchar(255) DEFAULT NULL,
  `联系方式` varchar(255) DEFAULT NULL,
  `在职状态` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `personnel`
--

INSERT INTO `personnel` (`id`, `员工编号`, `姓名`, `性别`, `年龄`, `部门`, `地址`, `联系方式`, `在职状态`) VALUES
(1, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(2, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(3, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(4, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(5, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(6, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(7, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(8, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(9, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(10, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(11, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(12, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(13, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(14, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(15, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(16, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(17, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(18, 3, '黄蓝风', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(19, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(20, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(21, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(22, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(23, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(24, 4, '张津广', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(25, 5, '郭山彤', '女', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(26, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(27, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(28, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(29, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(30, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(31, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(32, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(33, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(34, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(35, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(36, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(37, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(38, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(39, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(40, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(41, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(42, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(43, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(44, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(45, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(46, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(47, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(48, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(49, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(50, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(51, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(52, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(53, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(54, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(55, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(56, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(57, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(58, 3, '黄蓝风', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(59, 4, '刘九', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(60, 5, '张十', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(61, 1, '张三', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(62, 2, '李四', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(63, 3, '张八', '男', 20, '开发部', '广东省广州市', '15145151447', '在职'),
(64, 4, '张津广', '男', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(65, 5, '郭山彤', '女', 21, '营销部', '广东省深圳市', '15145151448', '离职'),
(73, 1, '1', '女', 1, '开发部', '1', '1', '在职'),
(72, 1, '1', '1', 1, '1', '1', '1', '1'),
(71, 1, '2', '3', 4, '5', '6', '7', '8'),
(74, 123, '123', '男', 123, '开发部', '213', '123', '在职'),
(75, 1, '1', '男', 1, '开发部', '1', '1', '辞职'),
(76, 123, '123', '男', 123, '开发部', '123', '123', '在职'),
(77, 1, '1', '男', 1, '开发部', '1', '1', '在职'),
(78, 1312321, '123123', '男', 123123, '开发部', '123123', '12312312', '在职'),
(79, 1213, '是', '男', 21, '开发部', '是', '是', '在职'),
(80, 12312321, '牛逼', '男', 12, '管理部', '阿打算多', '21312312', '待入职');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
