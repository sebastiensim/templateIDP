SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `items` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Author` varchar(15) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Cost` float unsigned NOT NULL DEFAULT '1',
  `Category` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(15) NOT NULL,
  `Password` char(64) NOT NULL,
  `Rank` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `User` (`Username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
