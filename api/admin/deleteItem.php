<?php
	require_once("../../config.php");
	if (isset($_POST['id']) && LOGGED_IN && checkAdmin($user)){
		$id = intval($_POST['id']);
		if ($id > 0){
			$stmt = $db->prepare("SELECT `Image` FROM `items` WHERE `Id` = ? LIMIT 1");
			$stmt->execute(array($id));
			$filename = $stmt->fetch(PDO::FETCH_ASSOC);
			unlink(CUR_DIR . '/uploaded/' . $filename['Image']);
			$stmt = $db->prepare("DELETE FROM `items` WHERE `Id` = ? LIMIT 1");
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