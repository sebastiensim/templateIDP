<?php
	if (isset($_POST['q']) && $_POST['q'] != ''){
		require_once("../config.php");
		$stmt = $db->prepare("SELECT * FROM `items` WHERE `Title` LIKE :title");
		$stmt->execute(array("title" => ('%' . $_POST['q'] . '%')));
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($rows);
	}
	else if (isset($_POST['c']) && (($cat = intval($_POST['c'])) > 0) && isset($_POST['id']) && (($cat = intval($_POST['id'])) > 0)){
		echo json_encode(array(1));
	}
?>