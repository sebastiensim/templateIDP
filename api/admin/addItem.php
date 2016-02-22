<?php
	require_once("../../config.php");
	if (isset($_POST['submit']) && LOGGED_IN && checkAdmin($user)){
		if (!empty($_POST['title']) && !empty($_POST['author']) && !empty($_POST['description']) && isset($_POST['cost']) && isset($_POST['category']) && !empty($_POST['tags'])){
			$cost = intval($_POST['cost']);
			if ($cost >= 0 && $cost <= 999.99){
				$cat = intval($_POST['category']);
				if ($cat >= 1 && $cat <= 3){
					$file_name = uploadFile($_FILES['min']);
					$stmt = $db->prepare("INSERT INTO `items` VALUES (NULL,?,?,?,?,?,?,?)");
					$stmt->execute(array($_POST['title'], $_POST['description'], $_POST['author'], $file_name, $cost, $cat, $_POST['tags']));
					$id = $db->lastInsertId();
					if ($stmt->rowCount() > 0){
						exit(json_encode(array("state" => $id, "filename" => $file_name)));
					}
					else{
						exit(json_encode(array("state" => -8)));
					}
				} else {
					exit(json_encode(array("state" => -3)));
				}
			} else {
				exit(json_encode(array("state" => -2)));
			}
		}
		else{
			exit(json_encode(array("state" => -1)));
		}
	}
	
	function uploadFile($file){
		$c['ext_list'] = array('gif', 'jpeg', 'jpg', 'png');
		$c['mime_list'] = array('image/gif', 'image/jpg', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png');
		$c['max_size'] = 1048576;
		if (!empty($file) && $file['error'] == 0){
			$ext = explode('.', $file['name']);
			$type = getimagesize($file['tmp_name']);
			if (in_array($type['mime'], $c['mime_list']) || in_array(strtolower(end($ext)), $c['ext_list'])){
				if ($file['size'] <= $c['max_size']){
					$dest = '';
					$name = '';
					do {
						$tmp = randStr(2);
						$name = dechex(time()) . $tmp . '.' . end($ext);
						$dest = CUR_DIR . '/uploaded/' . $name;				
					} while (file_exists($dest));
					if (move_uploaded_file($file['tmp_name'], $dest)){
						return $name;
					}
					else {
						exit(json_encode(array("state" => -7)));
					}
				} else {
					exit(json_encode(array("state" => -6)));
				}
			} else {
				exit(json_encode(array("state" => -5)));
			}
		} else {
			exit(json_encode(array("state" => -4)));
		}
	}
	
	function randStr($len){
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$random = '';
		for ($i = 0; $i < $len; $i++) {
			$random .= $characters[rand(0, strlen($characters) - 1)];
		}
		return $random;
	}
?>