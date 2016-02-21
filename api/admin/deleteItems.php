<?php
	require_once("../../config.php");
	if (isset($_POST['id'])){
		$id = intval($_POST['id']);
		if ($id > 0){
			$stmt = $db->prepare("DELETE FROM `items` WHERE `Id` = ? LIMIT 1");
			$stmt->execute(array($id));
			if ($stmt->rowCount() > 0){
				echo json_encode(0);
			}
			else {
				echo json_encode(1);
			}
		}
		else {
			echo json_encode(1);
		}
	}
?>