$(document).ready(function(){
	getItems();
	recentSearchQueries();
	
	notifyRequestStatus();
	var loc = window.location.pathname;
	var loc = loc.substring(0, loc.lastIndexOf('/'));
    webshims.setOptions('forms-ext', {types: 'date'});
	webshims.polyfill('forms forms-ext');
	
	$(window).resize(function(){$('.search_placeholder').height($('.form_container').height());}).resize();
	
	$('body').on('click', '.item', function(e){
		e.preventDefault();
		showDetails($(this));
	});
	
	
	$('a[data-toggle="tab"]').on('hide.bs.tab', function(e){
		$($(e.target).attr('href')).find('.item_container.active').removeClass('active');
	});
	
	/* BUY HANDLERS */
		$('body').on('click', '[data-act="buy"]', function(e){e.preventDefault(); buyItem($(this));});
	/* BUY HANDLERS */
	
	/* REQUESTS HANDLERS */
		$('#requestOpen').animatedModal({modalTarget: 'requestModal', animatedIn: 'bounceIn', animatedOut: 'bounceOut'});
		$('#requestModal form').submit(function(e){
			e.preventDefault();
			addRequest($(this).serialize());
		});
	/* REQUESTS HANDLERS */
	
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
					$(templateItem(v)).appendTo(container).hide().fadeIn(500).css("display", "inline-block");
				});
			} else {
				var content = '';
				$.each(data.r, function(k,v){
					content += $(templateItem(v)).prop('outerHTML');
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
			$(templateItem(v)).appendTo(container).hide().fadeIn(500).css("display","inline-block");
		});
		container = $('[data-content="popular"] .item_list');
		$.each(data.popular, function(k,v){
			$(templateItem(v)).appendTo(container).hide().fadeIn(500).css("display","inline-block");
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

function addRequest(q){
	var alerts = $('#requestModal .alerts');
	alerts.empty();
	$.post('api/addRequest.php', q, function(data){
		console.log(data);
		if (data.state == 0){
			$(templateAlert("<b>Your request has been submitted.</b>", "success")).appendTo(alerts).fadeIn(500);
			$('#requestModal form textarea, #requestModal form input').val('');
		} else {
			switch (data.state){
				case -1: $(templateAlert("<b>Please fill in all fields.</b>", "danger")).appendTo(alerts).hide().fadeIn(500); break;
				case -2: $(templateAlert("<b>Your budget is too low.</b> Budget must be at least 10$", "danger")).appendTo(alerts).hide().fadeIn(500); break;
				case -3: $(templateAlert("<b>Invalid deadline.</b> Cannot set dates in the past", "danger")).appendTo(alerts).hide().fadeIn(500); break;
				default: $(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).hide().fadeIn(500);
			}
		}
	}, "json").fail(function(){
		$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).fadeIn(500);
	});
}

var notifyRequestLastId = 0;
function notifyRequestStatus(){
	$.post('api/getRequests.php', {lastId: notifyRequestLastId}, function(data){
		$.each(data, function(k,v){
			var type = '';
			var content = '';
			if (v.State == -1){
				type = 'error';
				content = '<div data-reqid="' + v.Id + '">Request was denied: "' + v.Details + '"</div>';
			}
			else if (v.State == 1){
				type = 'success';
				content = '<div data-reqid="' + v.Id + '">Request was accepted: "' + v.Details + '"</div>';
			}
			noty({
				layout: 'topRight',
				text: content,
				type: type,
				animation: {
					open: 'animated fadeInRight',
					close: 'animated fadeOutLeft',
					easing: 'swing',
					speed: 500
				},
				maxVisible: 50,
				callback: {
					afterClose: function(){
						removeRequest($($(this)[0].$message).find('[data-reqid]').data('reqid'));
						noty({
							layout: 'center',
							text: '<strong>File downloaded!</strong>',
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
					}
				}
			});
			notifyRequestLastId = v.Id;
		});
		setTimeout(notifyRequestStatus, 2000);
	}, "json");
}

function removeRequest(id){
	$.post('api/removeRequest.php', {id: id});
}

//HOTFIX
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name, old = {};
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}
	ret = callback.apply( elem, args || [] );
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}
	return ret;
};