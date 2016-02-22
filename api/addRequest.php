<?php
	require_once("../config.php");
	if (!empty($_POST['request']) && LOGGED_IN){
		$stmt = $db->prepare("INSERT INTO `requests` VALUES (NULL, ?, ?, 0)");
		$stmt->execute(array($user->Id, $_POST['request']));
		if ($stmt->rowCount() > 0){
			exit(json_encode(array("state" => 0)));
		} else {
			exit(json_encode(array("state" => -1)));
		}
	}
?>
