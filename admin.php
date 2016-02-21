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
					<a id="addItemOpen" href="#addItemModal" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> Add item</a>
					<a href="api/logout.php" class="btn btn-warning" data-act="logout"><span class="glyphicon glyphicon-remove"></span> Logout</a>
				</div>
				<h3>Sebsim</h3>
				<div class="user_content">
					<h2>Welcome to admin panel</h2>
					<a id="searchOpen" href="#searchModal" class="btn-group search_imit" role="group">
						<div class="placeholder">Search for... </div>
						<span class="btn btn-primary" name="send"><span class="glyphicon glyphicon-search"></span></span>
					</a>
					<p><small>Search for product or pick one from lists below.</small></p>
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
	
	<div id="addItemModal" class="modal">
		<div class="text-center"> 
			<img class="close-addItemModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container-fluid">
				<div class="alerts text-center"></div>
				<form autocomplete="off">
					<div class="form-group">
						<input type="text" class="form-control" name="title" placeholder="Title" required>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="author" placeholder="Author" required>
					</div>
					<div class="form-group">
						<input type="number" class="form-control" name="cost" placeholder="Cost" step="0.01" min="0" max="999.99" required>
					</div>
					<div class="form-group">
						<textarea class="form-control" name="description" placeholder="Description"></textarea>
					</div>
					<div class="form-group">
						<label>Miniature Image: </label>
						<input type="file" name="min">
					</div>
					<div class="form-group short_inputs clearfix">
						<div class="input-group">
							<span class="input-group-addon"><input type="radio" name="category" value="1" required checked="checked"></span>
							<div class="form-control">Package</div>
						</div>
						<div class="input-group">
							<span class="input-group-addon"><input type="radio" name="category" value="2"></span>
							<div class="form-control">Slide</div>
						</div>
						<div class="input-group">
							<span class="input-group-addon"><input type="radio" name="category" value="3"></span>
							<div class="form-control">Item</div>
						</div>
					</div>
					<div class="form-group text-center">
						<button type="submit" class="btn btn-success" name="submit"><span class="glyphicon glyphicon-plus"></span> Add item</button>
						<button type="reset" class="btn btn-warning" name="submit"><span class="glyphicon glyphicon-refresh"></span> Reset form</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<script src="js/libs.js"></script>
	<script src="js/templates.js"></script>
	<script src="js/admin.js"></script>
</body>
</html>