-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 22, 2016 at 07:37 AM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `template`
--
CREATE DATABASE IF NOT EXISTS `template` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `template`;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `Id` int(10) unsigned NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Author` varchar(15) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Cost` float unsigned NOT NULL DEFAULT '1',
  `Category` tinyint(3) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(10) unsigned NOT NULL,
  `Username` varchar(15) NOT NULL,
  `Password` char(64) NOT NULL,
  `Rank` tinyint(3) unsigned DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `User` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `Id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;