<?php
	session_start();
	require_once("func.php");
	
	$conf['dbhost'] = 'localhost';
	$conf['dbname'] = 'sebastien';
	$conf['dbuser'] = 'root';
	$conf['dbpass'] = '';
	define('SALT', 'ZML%@#KASOBCX#');

	try {
		$db = new PDO('mysql:host=' . $conf['dbhost'] . ';dbname=' . $conf['dbname'], $conf['dbuser'], $conf['dbpass']);
	} catch (PDOException $e){
		echo "Error connecting to database:" . $e;
	};
	
	$user = checkLogin();
?>