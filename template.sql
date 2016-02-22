CREATE TABLE IF NOT EXISTS `items` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Author` varchar(15) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Cost` float unsigned NOT NULL DEFAULT '1',
  `Category` tinyint(3) unsigned NOT NULL,
  `Tags` text NOT NULL,
  PRIMARY KEY (`Id`),
  FULLTEXT KEY `Tags` (`Tags`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `requests`
--

CREATE TABLE IF NOT EXISTS `requests` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Uid` int(10) unsigned NOT NULL,
  `Request` text NOT NULL,
  `State` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(15) NOT NULL,
  `Password` char(64) NOT NULL,
  `Rank` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `User` (`Username`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;
