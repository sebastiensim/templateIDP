<?php
require 'vendor/autoload.php';
use MemCachier\MemcacheSASL;
// // create a new persistent client
// $m = new Memcached("memcached_pool");
// $m->setOption(Memcached::OPT_BINARY_PROTOCOL, TRUE);

// // some nicer default options
// $m->setOption(Memcached::OPT_NO_BLOCK, TRUE);
// $m->setOption(Memcached::OPT_AUTO_EJECT_HOSTS, TRUE);
// $m->setOption(Memcached::OPT_CONNECT_TIMEOUT, 2000);
// $m->setOption(Memcached::OPT_POLL_TIMEOUT, 2000);
// $m->setOption(Memcached::OPT_RETRY_TIMEOUT, 2);

// // setup authentication
// $m->setSaslAuthData( getenv("MEMCACHIER_USERNAME")
//                    , getenv("MEMCACHIER_PASSWORD") );

// // We use a consistent connection to memcached, so only add in the
// // servers first time through otherwise we end up duplicating our
// // connections to the server.
// if (!$m->getServerList()) {
//     // parse server config
//     $servers = explode(",", getenv("MEMCACHIER_SERVERS"));
//     foreach ($servers as $s) {
//         $parts = explode(":", $s);
//         $m->addServer($parts[0], $parts[1]);
//     }
// }
// Create client
// $m = new MemcacheSASL();
// $servers = explode(",", getenv("MEMCACHIER_SERVERS"));
// foreach ($servers as $s) {
//     $parts = explode(":", $s);
//     $m->addServer($parts[0], $parts[1]);
// }

// // Setup authentication
// $m->setSaslAuthData( getenv("MEMCACHIER_USERNAME")
//                    , getenv("MEMCACHIER_PASSWORD") );

// // Test client
// $m->add("foo", "bar");
// echo $m->get("foo");

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
			$hash = hash('SHA512', (SALT . $_SESSION['uid'] . $_SERVER['REMOTE_ADDR']));
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