<?php
	require_once("../../config.php");
	if (LOGGED_IN && checkAdmin($user)){
		if (isset($_POST['id']) && ($id = intval($_POST['id'])) && isset($_POST['act']) && ($_POST['act'] == 'accept' || $_POST['act'] == 'decline')){
			if ($_POST['act'] == 'accept'){
				$state = 1;
			}
			else if ($_POST['act'] == 'decline'){
				$state = -1;
			}
			$stmt = $db->prepare("UPDATE `requests` SET `State` = ? WHERE `Id` = ?");
			$stmt->execute(array($state, $id));
			if ($stmt->rowCount() > 0){
				exit(json_encode(array("state" => 0)));
			} else {
				exit(json_encode(array("state" => -1)));
			}
		}
	}
?>