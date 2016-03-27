<?php
	require_once("../config.php");
	if (isset($_POST['id']) && LOGGED_IN){
		$id = intval($_POST['id']);
		if ($id > 0){
			$stmt = $db->prepare("UPDATE `items` SET `Purhases` = `Purhases` + 1 WHERE `Id` = ? LIMIT 1");
			$stmt->execute(array($id));
			if ($stmt->rowCount() > 0){
				echo json_encode(array("state" => 0));
			}
			else {
				echo json_encode(array("state" => 1));
			}
		}
		else {
			echo json_encode(array("state" => 1));
		}
	}
?>