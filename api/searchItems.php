<?php
	require_once("../config.php");
	if (isset($_POST['q']) && $_POST['q'] != ''){
		$tags = explode(' ', $_POST['q']);
		for($i = 0; $i < count($tags); $i++){
			$tags[$i] = '+' . $tags[$i];
		}
		$tags = implode(' ', $tags);
		$c = 0;
		if (isset($_POST['c'])){
			$c = intval($_POST['c']);
		}
		if ($c >= 1 && $c <= 3){
			$stmt = $db->prepare("SELECT * FROM `items` WHERE (MATCH (`Tags`) AGAINST (? IN BOOLEAN MODE) OR `Title` LIKE ?) AND `Category` = ?");
			$stmt->execute(array($tags, ('%' . $_POST['q'] . '%'), $c));
		} else {
			$stmt = $db->prepare("SELECT * FROM `items` WHERE MATCH (`Tags`) AGAINST (? IN BOOLEAN MODE) OR `Title` LIKE ?");
			$stmt->execute(array($tags, ('%' . $_POST['q'] . '%')));
		}
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if (empty($rows)){
			if ($c >= 1 && $c <= 3){
				$stmt = $db->prepare("SELECT * FROM `items` ORDER BY Rand() LIMIT 2");
				$stmt->execute();
			} else {
				$stmt = $db->prepare("SELECT * FROM `items` ORDER BY Rand() LIMIT 2");
				$stmt->execute();
			}
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode(array("s" => 0, "r" => $rows));
		} else {
			echo json_encode(array("s" => 1, "r" => $rows));
		}
	}
?>
