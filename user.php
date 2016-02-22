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
	<title>TemPlate</title>
	<link rel="stylesheet" type="text/css" href="css/includes.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header class="text-center">
		<div class="jumbotron">
			<div class="container">
				<div class="top_right">
					<a href="api/logout.php" class="btn btn-warning" data-act="logout"><span class="glyphicon glyphicon-remove"></span> Logout</a>
				</div>
				<h3>TemPlate</h3>
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
					<a id="requestOpen" href="#requestModal">Not found what you are looking for? Request it!</a>
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
			Done by G2T5 :)
		</div>
	</footer>
	
	<!-- Modals -->
	<div id="requestModal" class="modal">
		<div class="text-center"> 
			<img class="close-requestModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container text-center">
				<div class="alerts"></div>
				<form autocomplete="off">
					<div class="form-group">
						<textarea name="request" class="form-control" placeholder="Specify your request here..." required></textarea>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-info" name="submit"><span class="glyphicon glyphicon-ok"></span> Submit</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<script src="js/libs.js"></script>
	<script src="js/templates.js"></script>
	<script src="js/loggedin.js"></script>
</body>
</html>