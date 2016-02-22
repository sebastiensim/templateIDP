<?php
	require_once("../config.php");
	if (isset($_POST['id']) && ($id = intval($_POST['id'])) > 0 && LOGGED_IN){
		$stmt = $db->prepare("DELETE FROM `requests` WHERE `Id` = ? AND `Uid` = ?");
		$stmt->execute(array($id, $user->Id));
	}
?>
