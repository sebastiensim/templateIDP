<?php
	require_once("config.php");
	userRedirect();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Sebsim :)</title>
	<link rel="stylesheet" type="text/css" href="css/includes.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header class="text-center">
		<div class="jumbotron">
			<div class="container">
				<div class="top_right">
					<a id="loginOpen" href="#loginModal" class="btn btn-primary">Sign In</a>
					<a id="registerOpen" href="#registerModal" class="btn btn-primary">Sign Up</a>
				</div>
				<h3>Sebsim</h3>
				<div class="user_content">
					<h2>Explore templates</h2>
					<a id="searchOpen" href="#searchModal" class="btn-group search_imit" role="group" aria-label="...">
						<div class="placeholder">Search for... </div>
						<span class="btn btn-primary" name="send"><span class="glyphicon glyphicon-search"></span></span>
					</a>
					<p><small>Check out our large collection of themes.</small></p>
				</div>
			</div>
		</div>
	</header>
	
	<section class="items_list">
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#packages" aria-controls="packages" role="tab" data-toggle="tab">Packages</a></li>
			<li role="presentation"><a href="#slides" aria-controls="slides" role="tab" data-toggle="tab">Slides</a></li>
			<li role="presentation"><a href="#icons" aria-controls="icons" role="tab" data-toggle="tab">Icons</a></li>
		</ul>
		<div class="container-fluid text-center">
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane fade in active" id="packages" data-cid="1">
					<div class="item_list"></div>
					<button class="btn btn-primary"><span class="glyphicon glyphicon-refresh"></span> Load more</button>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="slides" data-cid="2">
					<div class="item_list"></div>
					<button class="btn btn-primary"><span class="glyphicon glyphicon-refresh"></span> Load more</button>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="icons" data-cid="3">
					<div class="item_list"></div>
					<button class="btn btn-primary"><span class="glyphicon glyphicon-refresh"></span> Load more</button>
				</div>
			</div>
		</div>
	</section>
	<footer>
		<div class="container">
			Done by sebastien :)
		</div>
	</footer>
	
	<!-- Modals -->
	<div id="searchModal" class="modal">
		<div class="text-center"> 
			<img class="close-searchModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container-fluid">
				<form class="search_form" autocomplete="off">
					<div class="input-group">
						<input type="text" class="form-control" name="q" placeholder="Search for...">
						<span class="input-group-btn">
							<button class="btn btn-primary" name="send" type="button"><span class="glyphicon glyphicon-search"></span></button>
						</span>
					</div>
				</form>
				<div class="alerts text-center"></div>
				<div class="item_list"></div>
			</div>
		</div>
	</div>
	<div id="loginModal" class="modal">
		<div class="text-center"> 
			<img class="close-loginModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container-fluid text-center">
				<div class="alerts"></div>
				<form class="login_form" autocomplete="off">
					<div class="form-group">
						<input type="text" class="form-control" name="login" placeholder="Username" required>
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="password" placeholder="Password" required>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-primary" name="submit">Sign In</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div id="registerModal" class="modal">
		<div class="text-center"> 
			<img class="close-registerModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container-fluid text-center">
				<div class="alerts"></div>
				<form class="register_form" autocomplete="off">
					<div class="form-group">
						<input type="text" class="form-control" name="login" placeholder="Username" required>
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="password" placeholder="Password" required>
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="password2" placeholder="Repeat Password" required>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-primary" name="submit">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<script src="js/libs.js"></script>
	<script src="js/templates.js"></script>
	<script src="js/loggedout.js"></script>
</body>
</html>