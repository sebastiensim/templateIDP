<?php
	require_once("../config.php");
	if (LOGGED_IN){
		if (isset($_POST['lastId'])){
			$lastid = intval($_POST['lastId']);
		} else {
			$lastid = 0;
		}
		$stmt = $db->prepare("SELECT * FROM `requests` WHERE `Uid` = ? AND (`State` = -1 OR `State` = 1) AND `Id` > ?");
		$stmt->execute(array($user->Id, $lastid));
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($rows);
	}
?>