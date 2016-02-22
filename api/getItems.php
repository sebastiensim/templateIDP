<?php
	require_once("../config.php");
	$rows = array();
	for ($i=1; $i<=3; $i++){
		$stmt = $db->prepare("SELECT * FROM `items` WHERE `Category` = ? ORDER BY RAND() LIMIT 12");
		$stmt->execute(array($i));
		$rows = array_merge($rows, $stmt->fetchAll(PDO::FETCH_ASSOC));
	}
	echo json_encode($rows);
?>