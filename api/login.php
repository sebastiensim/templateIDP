<?php
	require_once("../config.php");
	if (isset($_POST['submit']) && !LOGGED_IN){
		if (!empty($_POST['login']) && !empty($_POST['password'])){
			$stmt = $db->prepare('SELECT `Id`, `Password` FROM `users` WHERE `Username` = ? AND `Password` = ?');
			$stmt->execute(array($_POST['login'], hash('SHA256', (SALT . $_POST['password']))));
			if ($stmt->rowCount() > 0){
				$user = $stmt->fetch(PDO::FETCH_OBJ);
				$_SESSION['uid'] = $user->Id;
				$_SESSION['hash'] = hash('SHA512', (SALT . $user->Id . $_SERVER['REMOTE_ADDR']));
				exit(json_encode(array("state" => 0)));
			} else {
				exit(json_encode(array("state" => 2)));
			}			
		} else {
			exit(json_encode(array("state" => 1)));
		}
	}
?>