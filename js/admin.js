$(document).ready(function(){
	getItems();
	recentSearchQueries();
	
	$('body').on('click', '.item', function(e){
		e.preventDefault();
		showDetails($(this));
	});
	
	$(window).resize(function(){$('.search_placeholder').height($('.form_container').height());}).resize();
	
	$('a[data-toggle="tab"]').on('hide.bs.tab', function(e){
		$($(e.target).attr('href')).find('.item_container.active').removeClass('active');
	});
	
	/* BUY HANDLERS */
		$('body').on('click', '[data-act="buy"]', function(e){e.preventDefault(); buyItem($(this));});
	/* BUY HANDLERS */
	
	/* REQUESTS ADMINISTRATION HANDLERS */
		$('#requestListOpen').animatedModal({modalTarget: 'requestListModal', animatedIn: 'bounceIn', animatedOut: 'bounceOut', afterOpen: function(){
			getRequests();
		}});
		$('#requestListModal').on('click', '.buttons button', function(){
			updateRequest($(this));
		});
	
	/* ITEM ADMINISTRATION HANDLERS */
		$('#addItemOpen').animatedModal({modalTarget: 'addItemModal', animatedIn: 'lightSpeedIn', animatedOut: 'lightSpeedOut'});
		$('#addItemModal form').submit(function(e){
			e.preventDefault();
			addItem($(this));
		});
		$('body').on('click', '[data-act="del"]', function(e){e.preventDefault(); deleteItem($(this));});
	/* ITEM ADMINISTRATION HANDLERS */
	
	/* SEARCHBOX HANDLERS */
		$('#search_container form input').on('input', searchTimer(function(){searchItems($(this).parents('form').serialize());}));
		$('#search_container form').submit(function(e){e.preventDefault(); searchItems($(this).serialize());});
		$('#search_container form select').change(function(e){e.preventDefault(); searchItems($(this).parents('form').serialize());});
		$('#search_container .last_searches').on('click', 'button', function(e){e.preventDefault(); $('#search_container form input').val($(this).text()).closest('form').trigger('submit')});
	/* SEARCHBOX HANDLERS */
});

var searchTimerT = null;
function searchTimer(f){
	return function(){
		var context = this, args = arguments;
		clearTimeout(searchTimerT);
		searchTimerT = window.setTimeout(function(){
			f.apply(context, args);
		}, 500);
	};
}

var lastsearch = '';
function searchItems(q){
	clearTimeout(searchTimerT);
	var form = $('#search_container form');
	var container = $('#search_container .item_list');
	var alerts = $('#search_container .alerts');
	container.find('.item_container').removeClass('active');
	if (q.split('&')[0] != 'q=' && q.split('q')[0] != q){
		form.closest('.form_container').addClass('selected');
		$.post('api/searchItems.php', q, function(data){
			container.empty();
			alerts.empty();
			if (data.s > 0){
				$.each(data.r, function(k,v){
					$(templateItem(v,true)).appendTo(container).hide().fadeIn(500).css("display", "inline-block");
				});
			} else {
				var content = '';
				$.each(data.r, function(k,v){
					content += $(templateItem(v,true)).prop('outerHTML');
				});
				$(templateAlert("<b>We are sorry but nothing was found.</b><br> But, check our propositions below</div><div class='item_list'>" + content + "", "info")).appendTo(alerts).fadeIn(500);
			}
			var val = form.find('input[name=q]').val();
			if (lastsearch != val){
				var tmpjson = Cookies.getJSON('search');
				if (typeof tmpjson !== 'undefined'){
					for (var i=4;i>0;i--){
						tmpjson['q' + (i + 1)] = tmpjson['q' + i];
					}
				} else {
					tmpjson = {};
				}
				tmpjson['q1'] = val;
				Cookies.set('search', tmpjson);
				recentSearchQueries(tmpjson['q1']);
				lastsearch = val;
				$('.search_placeholder').height($('.form_container').height());
			}
		}, "json").fail(function(){
			container.empty();
			alerts.empty();
			$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).fadeIn(500);
		});
	} else {
		container.empty();
		alerts.empty();
		form.closest('.form_container').removeClass('selected');
	}
}

function recentSearchQueries(q){
	var container = $('#search_container .last_searches');
	if (typeof q !== 'undefined'){
		container.prepend('<button class="btn btn-info" type="button">' + q + '</button>');
	}
	else {
		var cookie = Cookies.getJSON('search');
		container.empty();
		if (typeof cookie !== 'undefined'){
			for (var i=5; i>0; i--){
				if (typeof cookie['q' + i] !== 'undefined') container.prepend('<button class="btn btn-info" type="button">' + cookie['q' + i] + '</button>');
			}
		}
	}
	container.children('button:nth-of-type(n+6)').remove();
}

function getItems(){
	$.post('api/getItems.php', function(data){
		var container = $('[data-content="recent"] .item_list');
		$.each(data.recent, function(k,v){
			$(templateItem(v,true)).appendTo(container).hide().fadeIn(500).css("display","inline-block");
		});
		container = $('[data-content="popular"] .item_list');
		$.each(data.popular, function(k,v){
			$(templateItem(v,true)).appendTo(container).hide().fadeIn(500).css("display","inline-block");
		});
		$('[data-content] .item_list:empty').append(templateAlert("<b>No items to show</b>", "info"));
	}, "json");
}

function buyItem(elem){
	var parent = elem.parents('.item_container');
	$.post('api/buyItem.php', {id: parent.data('itemid')}, function(data){
		noty({
			layout: 'center',
			text: '<strong>File purchased!</strong>',
			type: 'alert',
			animation: {
				open: 'animated fadeIn',
				close: 'animated fadeOut',
				easing: 'swing',
				speed: 300
			},
			callback: {
				afterShow: function(){var el = $(this)[0]; setTimeout(function(){el.close()},100);}
			}
		});
	}, "json");
}

function showDetails(item){
	var item = item.closest('.item_container');
	item.find('.full_info').width(item.closest('.item_list').width()).css({'left': -item.position().left});
	item.siblings('.active').removeClass('active');
	item.toggleClass('active');
}

function addItem(elem){
	var q = new FormData(elem[0]);
	q.append("submit", $(this).find('button[type=submit]').text());
	var alerts = $('#addItemModal .alerts');
	var container = $('[data-content="recent"] .item_list');
	var e = {};
	var it = $('#addItemModal form input:not([type=radio]), #addItemModal form textarea, #addItemModal form input[type=radio]:checked');
	$.each(it, function(k, v){
		var index = $(v).attr('name');
		index = index.charAt(0).toUpperCase() + index.slice(1);
		e[index] = $(v).val();
	});
	$.ajax({url: 'api/admin/addItem.php',
			type: 'POST',
			data: q,
			success: function(data){
						alerts.empty();
						if (data.state > 0){
							alerts.append(templateAlert("<b>You have successfully added new item.</b>", "success"));
							$('#addItemModal form').find("input:not([type=radio]), textarea").val("");
							if (container.find('.item_container').length < 12){
								e['Id'] = data.state;
								e['Image'] = data.filename;
								var date = new Date(data.add_date * 1000).toISOString().split('T');
								e['Add_Date'] = date[0] + ' ' + date[1].slice(0,8);
								container.find('.alerts').empty();
								if (container.find('.item_container').length == 0) container.empty();
								$(templateItem(e, true)).prependTo(container).hide().fadeIn(500).css("display", "inline-block");
							}
						}
						else {
							switch (data.state){
								case -1: $(templateAlert("<b>Please fill in all fields.</b>", "danger")).appendTo(alerts).hide().fadeIn(500); break;
								case -2: $(templateAlert("<b>Invalid cost specified.</b> Cost must be in range of 0-999.99", "danger")).appendTo(alerts).hide().fadeIn(500); break;
								case -3: $(templateAlert("<b>Invalid category specified.</b> Please select a proper category", "danger")).appendTo(alerts).hide().fadeIn(500); break;
								case -4: $(templateAlert("<b>There was an error uploading file or you haven't selected a file to upload.</b>", "danger")).appendTo(alerts).hide().fadeIn(500); break;
								case -5: $(templateAlert("<b>This file format is not allowed!</b>", "danger")).appendTo(alerts).hide().fadeIn(500); break;
								case -6: $(templateAlert("<b>The file you are trying to upload is too big.</b>", "danger")).appendTo(alerts).hide().fadeIn(500); break;
								case -7: $(templateAlert("<b>Error uploading file to server.</b>", "danger")).appendTo(alerts).hide().fadeIn(500); break;
								default: $(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).hide().fadeIn(500);
							}
						}
					},
			dataType: "json",
			cache: false,
			contentType: false,
			processData: false	
	}).fail(function(){
		$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).hide().fadeIn(500);
	});
}

function deleteItem(elem){
	var parent = elem.parents('.item_container');
	$.post('api/admin/deleteItem.php', {id: parent.data('itemid')}, function(data){
		if (data.state == 0){
			var grandparent = parent.closest('.item_list');
			parent.fadeOut(500, function(){
				$(this).remove();
			});
			if (grandparent.is(':empty')) $(templateAlert("<b>No items to show in this category</b>", "info")).appendTo(alerts).hide().fadeIn(500);
		}
	}, "json");
}

function getRequests(){
	var container = $('#requestListModal .request_list');
	var alerts = $('#requestListModal .alerts');
	container.empty();
	alerts.empty();
	$.post('api/admin/getRequests.php', function(data){
		$.each(data, function(k,v){
			$(templateRequest(v)).appendTo(container).hide().fadeIn(500);
		});
		if (container.is(':empty')) $(templateAlert("<b>No requests left to view</b>", "info")).appendTo(alerts).hide().fadeIn(500);
	}, "json").fail(function(){
		$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).hide().fadeIn(500);
	});
}

function updateRequest(elem){
	var parent = elem.closest('.request');
	var grandparent = parent.closest('.request_list');
	var alerts = $('#requestListModal .alerts');
	alerts.empty();
	$.post('api/admin/setRequestStatus.php', {id: parent.data('reqid'), act: elem.data('act')}, function(data){
		if (data.state == 0){
			parent.fadeOut(500, function(){
				$(this).remove();
				if (grandparent.is(':empty')) $(templateAlert("<b>No requests left to view</b>", "info")).appendTo(alerts).hide().fadeIn(500);
			});
		} else {
			$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).hide().fadeIn(500);
		}
	}, "json").fail(function(){
		$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).hide().fadeIn(500);
	});
}