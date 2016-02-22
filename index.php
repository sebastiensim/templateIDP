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
					<a id="loginOpen" href="#loginModal" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Sign In</a>
					<a id="registerOpen" href="#registerModal" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> Sign Up</a>
				</div>
				<h3>Sebsim</h3>
				<div id="search_container">
					<form autocomplete="off">
						<div class="input-group">
							<input type="text" class="form-control" name="q" placeholder="Search for...">
							<span class="input-group-btn">
								<button class="btn btn-primary" name="send" type="button"><span class="glyphicon glyphicon-search"></span></button>
							</span>
						</div>
					</form>
					<div class="search_placeholder"></div>
					<div class="alerts text-center"></div>
					<div class="item_list"></div>
				</div>
			</div>
		</div>
	</header>
	
	<section class="random_items">
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#packages" aria-controls="packages" role="tab" data-toggle="tab">Packages</a></li>
			<li role="presentation"><a href="#slides" aria-controls="slides" role="tab" data-toggle="tab">Slides</a></li>
			<li role="presentation"><a href="#icons" aria-controls="icons" role="tab" data-toggle="tab">Icons</a></li>
		</ul>
		<div class="container text-center">
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane fade in active" id="packages" data-cid="1">
					<div class="item_list"></div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="slides" data-cid="2">
					<div class="item_list"></div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="icons" data-cid="3">
					<div class="item_list"></div>
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
	<div id="loginModal" class="modal">
		<div class="text-center"> 
			<img class="close-loginModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container text-center">
				<div class="alerts"></div>
				<form autocomplete="off">
					<div class="form-group">
						<input type="text" class="form-control" name="login" placeholder="Username" required>
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="password" placeholder="Password" required>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-primary" name="submit"><span class="glyphicon glyphicon-ok"></span> Sign In</button>
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
			<div class="container text-center">
				<div class="alerts"></div>
				<form autocomplete="off">
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
						<button type="submit" class="btn btn-primary" name="submit"><span class="glyphicon glyphicon-pencil"></span> Sign Up</button>
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