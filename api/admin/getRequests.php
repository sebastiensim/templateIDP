<?php
	require_once("../../config.php");
	if (LOGGED_IN && checkAdmin($user)){
		$stmt = $db->prepare("SELECT r.*, u.`Username` FROM `requests` r LEFT JOIN `users` u ON (r.`Uid` = u.`Id`) WHERE `State` = 0");
		$stmt->execute();
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($rows);
	}
?>