<?php
	require_once("../config.php");
	if (LOGGED_IN){
		if (isset($_POST['details']) && !empty($_POST['budget']) && !empty($_POST['deadline'])){
			if (($budget = floatval($_POST['budget'])) > 10) {
				$date = strtotime($_POST['deadline']);
				if ($date >= strtotime("00:00:00")){
					$date = strftime('%Y-%m-%d', $date);
					$stmt = $db->prepare("INSERT INTO `requests` VALUES (NULL, ?, ?, ?, ?, 0)");
					$stmt->execute(array($user->Id, $_POST['details'], $budget, $date));
					if ($stmt->rowCount() > 0){
						exit(json_encode(array("state" => 0)));
					} else {
						exit(json_encode(array("state" => -4)));
					}
				} else {
					exit(json_encode(array("state" => -3)));
				}
			} else {
				exit(json_encode(array("state" => -2)));
			}
		} else {
			exit(json_encode(array("state" => -1)));
		}
	}
?>
