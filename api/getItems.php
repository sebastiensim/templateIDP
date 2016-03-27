<?php
	require_once("../config.php");
	$rows = array();
	$stmt = $db->prepare("SELECT * FROM `items` ORDER BY `Id` DESC LIMIT 12");
	$stmt->execute();
	$rows['recent'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$stmt = $db->prepare("SELECT * FROM `items` ORDER BY `Purhases` DESC, `Id` DESC LIMIT 12");
	$stmt->execute();
	$rows['popular'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($rows);
?>