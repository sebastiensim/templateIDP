<?php
	require_once("../config.php");
	if (isset($_POST['q']) && $_POST['q'] != ''){
		$tags = explode(' ', $_POST['q']);
		for($i = 0; $i < count($tags); $i++){
			$tags[$i] = '+' . $tags[$i];
		}
		$tags = implode(' ', $tags);
		$stmt = $db->prepare("SELECT * FROM `items` WHERE MATCH (`Tags`) AGAINST (? IN BOOLEAN MODE) OR `Title` LIKE ?");
		$stmt->execute(array($tags, ('%' . $_POST['q'] . '%')));
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($rows);
	}
?>
