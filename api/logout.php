<?php
	require_once("../config.php");
	unset($_SESSION['uid']);
	unset($_SESSION['hash']);
	session_unset();
	session_destroy();
	header("Location: ../index.php");
	exit;
?>