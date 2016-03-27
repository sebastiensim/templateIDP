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
					<a id="requestListOpen" href="#requestListModal" class="btn btn-info"><span class="glyphicon glyphicon-eye-open"></span> Requests</a>
					<a id="addItemOpen" href="#addItemModal" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> Add item</a>
					<a href="api/logout.php" class="btn btn-warning" data-act="logout"><span class="glyphicon glyphicon-remove"></span> Logout</a>
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
	<div id="addItemModal" class="modal">
		<div class="text-center"> 
			<img class="close-addItemModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container">
				<div class="alerts text-center"></div>
				<form action="api/admin/addItem.php" autocomplete="off" method="POST" enctype='multipart/form-data'>
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
						<textarea class="form-control" name="description" placeholder="Description" required></textarea>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="tags" placeholder="Tags" required>
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
	
	<!-- Modals -->
	<div id="requestListModal" class="modal">
		<div class="text-center"> 
			<img class="close-requestListModal close_button" src="img/closebt.svg" alt="X" />
		</div>
		<div class="modal-content">
			<div class="container text-center">
				<div class="alerts"></div>
				<div class="request_list"></div>
			</div>
		</div>
	</div>
	
	<script src="js/libs.js"></script>
	<script src="js/templates.js"></script>
	<script src="js/admin.js"></script>
</body>
</html>