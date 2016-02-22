function templateItem(d, a){
	a = (typeof a !== 'undefined') ? a : false;
	var inject = '';
	if (a == true) inject = '<button class="btn btn-danger" data-act="del"><span class="glyphicon glyphicon-remove"></span> Delete</button>';
	return $.parseHTML(`<div class="item_container" data-itemid="` + d.Id + `">
							<div class="item">
								<img class="min" src="uploaded/` + d.Image + `" alt="` + d.Title + `" />
								<div class="hover">
									<div class="details">
										<div class="text">
											<div class="inner">
												<h3>` + d.Title + `</h3>
												<p>` + d.Description + `</p>
											</div>
										</div>
										<div class="stats clearfix">
											<span class="pull-left"><span class="glyphicon glyphicon-usd" aria-hidden="true"></span> ` + parseFloat(d.Cost).toFixed(2) + `</span>
											<span class="pull-right">` + d.Author + ` <span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="full_info">
								<div class="inner">
									<div class="img">
										<img class="min" src="uploaded/` + d.Image + `" alt="` + d.Title + `" />
									</div>
									<div class="text">
										<h3>` + d.Title + `</h3>
										<p>` + d.Description + `</p>
										<p>Author: <b>` + d.Author + `</b></p>
										<p>Price: <b>$` + parseFloat(d.Cost).toFixed(2) + `</b></p>
										<div>
										<button class="btn btn-success"><span class="glyphicon glyphicon-shopping-cart"></span> Buy Now</button>
										` + inject + `
										</div>
									</div>
								</div>
							</div>
						</div>`);
}

function templateAlert(str, type){
	if ($.inArray(type, ["success", "warning", "danger", "info"]) == -1) type = "info";
	return $.parseHTML(`<div class="alert alert-` + type + `">` + str + `</div>`);
}

function templateRequest(d){
	return $.parseHTML(`<div class="request" data-reqid="` + d.Id + `">
							<div class="user">` + d.Username + `(` + d.Uid + `)</div>
							<div class="content">` + d.Request + `</div>
							<div class="buttons">
								<button class="btn btn-success" data-act="accept"><span class="glyphicon glyphicon-ok"></span> Accept</button>
								<button class="btn btn-danger" data-act="decline"><span class="glyphicon glyphicon-remove"></span> Decline</button>
							</div>
						</div>`);
}