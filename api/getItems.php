<?php
	require_once("../config.php");
	$query = '';
	for ($i=1; $i<=3; $i++){
		$query .= "SELECT * FROM `items` WHERE `Category` = " . $i . " LIMIT 10 UNION ";
	}
	$query = rtrim($query, "UNION ");
	$stmt = $db->prepare($query);
	$stmt->execute();
	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($rows);
?>