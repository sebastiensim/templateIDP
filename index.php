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
	<title>Template</title>
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
				<h3>Template</h3>
				<div id="search_container">
					<div class="form_container">
						<form autocomplete="off">
							<div class="input-group">
								<input type="text" class="form-control" name="q" placeholder="Search for...">
								<span class="input-group-btn">
									<button class="btn btn-primary" name="send" type="submit"><span class="glyphicon glyphicon-search"></span></button>
								</span>
							</div>
							<select class="form-control" name="c">
								<option value="0">All</option>
								<option value="1">Packages</option>
								<option value="2">Slides</option>
								<option value="3">Icons</option>
							</select>
						</form>
						<div class="last_searches"></div>
					</div>
					<div class="search_placeholder"></div>
					<div class="alerts text-center"></div>
					<div class="item_list"></div>
				</div>
			</div>
		</div>
	</header>
	
	<section class="random_items">
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#recent" aria-controls="recent" role="tab" data-toggle="tab">Recent</a></li>
			<li role="presentation"><a href="#popular" aria-controls="popular" role="tab" data-toggle="tab">Popular</a></li>
		</ul>
		<div class="container text-center">
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane fade in active" id="recent" data-content="recent">
					<div class="item_list"></div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="popular" data-content="popular">
					<div class="item_list"></div>
				</div>
			</div>
		</div>
	</section>
	<footer>
		<div class="container">
			Done by G2T5 :)
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