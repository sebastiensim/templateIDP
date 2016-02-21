function templateItem(d){
	a = typeof a !== 'undefined' ? a : false;
	return $.parseHTML(`<div class="item" data-itemid="` + d.Id + `">
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
						</div>`);
}

function templateAlert(str, type){
	if ($.inArray(type, ["success", "warning", "danger", "info"]) == -1) type = "info";
	return $.parseHTML(`<div class="alert alert-` + type + `">` + str + `</div>`);
}