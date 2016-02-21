<?php
	if (isset($_POST['submit'])){
		require_once("../../config.php");
		
		if (!empty($_POST['title']) && !empty($_POST['author']) && !empty($_POST['description']) && isset($_POST['cost']) && isset($_POST['category'])){
			$cost = intval($_POST['cost']);
			if ($cost >= 0 && $cost <= 999.99){
				$cat = intval($_POST['category']);
				if ($cat >= 1 && $cat <= 3){
					$stmt = $db->prepare("INSERT INTO `items` VALUES (NULL,?,?,?,'min-1.jpg',?,?)");
					$stmt->execute(array($_POST['title'], $_POST['description'], $_POST['author'], $cost, $cat));
					if ($stmt->rowCount() > 0){
						exit(json_encode(array("state" => 0)));
					}
					else{
						exit(json_encode(array("state" => 4)));
					}
				} else {
					exit(json_encode(array("state" => 3)));
				}
			} else {
				exit(json_encode(array("state" => 2)));
			}
		}
		else{
			exit(json_encode(array("state" => 1)));
		}
	}
?>