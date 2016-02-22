<?php
	session_start();
	require_once("func.php");
	
	$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

	$conf['dbhost'] = 'us-cdbr-iron-east-03.cleardb.net';
	$conf['dbname'] = 'heroku_8454500b6fe7b6a';
	$conf['dbuser'] = 'bc2011e822a0fa';
	$conf['dbpass'] = 'ee3e2601';
	define('SALT', 'ZML%@#KASOBCX#');
	define('CUR_DIR', realpath(dirname(__FILE__)));

	try {
		$db = new PDO('mysql:host=us-cdbr-iron-east-03.cleardb.net;dbname=heroku_8454500b6fe7b6a', $conf['dbuser'], $conf['dbpass']);
	} catch (PDOException $e){
		echo "Error connecting to database:" . $e;
	};
	
	$user = checkLogin();
?>