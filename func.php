<?php
	function validUsername($username){
		if (strlen($username) < 3 || strlen($username) > 15)
			return false;
		if (!preg_match("/^[_a-zA-Z0-9]+$/", $username))
			return false;
		return true;
	}
	
	function validPassword($password){
		if (strlen($password) < 6)
			return false;
		return true;
	}

	function checkLogin(){
		global $db;
		$user = 0;
		if (isset($_SESSION['uid']) && isset($_SESSION['hash'])){
			$hash = hash('SHA512', (SALT . $_SESSION['uid']));
			if ($_SESSION['hash'] == $hash){
				$stmt = $db->prepare('SELECT * FROM `users` WHERE `id`=?');
				$stmt->execute(array($_SESSION['uid']));
				$user = $stmt->fetchObject();
				define('LOGGED_IN', true);
			}
			else {
				if (isset($_SESSION['uid']))
					unset($_SESSION['uid']);
				if (isset($_SESSION['hash']))
					unset($_SESSION['hash']);
				define('LOGGED_IN', false);
			}
		}
		else {
			define('LOGGED_IN', false);			
		}
		return $user;
	}
	
	function checkAdmin($user){
		if (LOGGED_IN == true && $user->Rank > 0){
			return true;
		}
		else{
			return false;
		}
	}
	
	function userRedirect(){
		global $user;
		$current = basename($_SERVER["REQUEST_URI"]);
		if (LOGGED_IN){
			if (checkAdmin($user)){
				if ($current != 'admin.php'){
					header("Location: admin.php");
					exit;
				}
			}
			else {
				if ($current != 'user.php'){
					header("Location: user.php");
					exit;
				}
			}
		} else {
			if ($current != 'index.php'){
				header("Location: index.php");
				exit;
			}
		}
	}
?>