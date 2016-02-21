<?php
	if (isset($_POST['submit'])){
		require_once("../config.php");
		if (!empty($_POST['login']) && !empty($_POST['password']) && !empty($_POST['password2'])){
			if (!validUsername($_POST['login'])) exit(json_encode(array("state" => 2)));
			if (!validPassword($_POST['password'])) exit(json_encode(array("state" => 3)));
			if ($_POST['password'] != $_POST['password2']) exit(json_encode(array("state" => 4)));
			$stmt = $db->prepare('SELECT `Id` FROM `users` WHERE `Username` = ?');
			$stmt->execute(array($_POST['login']));
			if ($stmt->rowCount() > 0) exit(json_encode(array("state" => 5)));
			
			$pass = hash('SHA256', (SALT . $_POST['password']));
			$stmt = $db->prepare('INSERT INTO `users`(`Username`,`Password`) VALUES (?,?)');
			$stmt->execute(array($_POST['login'], $pass));
			exit(json_encode(array("state" => 0)));
		} else {
			exit(json_encode(array("state" => 1)));
		}
	}
?>