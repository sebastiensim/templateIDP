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
	
	/* LOGIN/REGISTER MODALS */
		$('#loginOpen').animatedModal({modalTarget: 'loginModal', animatedIn: 'lightSpeedIn', animatedOut: 'lightSpeedOut'});
		$('#loginModal form').submit(function(e){
			e.preventDefault();
			var submit = $(this).find('button[type=submit]');
			login($(this).serialize() + '&' + encodeURI(submit.attr('name')) + '=' + encodeURI(submit.text()));
		});
		$('#registerOpen').animatedModal({modalTarget: 'registerModal', animatedIn: 'lightSpeedIn', animatedOut: 'lightSpeedOut'});
		$('#registerModal form').submit(function(e){
			e.preventDefault();
			var submit = $(this).find('button[type=submit]');
			register($(this).serialize() + '&' + encodeURI(submit.attr('name')) + '=' + encodeURI(submit.text()));
		});
	/* LOGIN/REGISTER MODALS */
	
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
				$(templateAlert("<b>We are sorry but nothing was found.</b><br> But, check out our recommendations for you</div><div class='item_list'>" + content + "", "info")).appendTo(alerts).fadeIn(500);
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

function showDetails(item){
	var item = item.closest('.item_container');
	item.find('.full_info').width(item.closest('.item_list').width()).css({'left': -item.position().left});
	item.siblings('.active').removeClass('active');
	item.toggleClass('active');
}

function login(q){
	var alerts = $('#loginModal .alerts');
	$.post('api/login.php', q, function(data){
		alerts.empty();
		switch (data.state){
			case 0: alerts.append(templateAlert("<b>You have been logged in</b>, you will be redirected shortly.", "success"));
					setTimeout(function(){location.reload()}, 2000);
					break;
			case 1: alerts.append(templateAlert("<b>Please fill in all fields.</b>", "danger")); break;
			case 2: alerts.append(templateAlert("<b>The details you have entered appear to be incorrect.</b>", "danger")); break;
			default: alerts.append(templateAlert("<b>There was an error</b>, please try again.", "danger"));
		}
	}, "json").fail(function(){
		alerts.empty().append(templateAlert("<b>There was an error</b>, please try again.", "danger"));
	});
}

function register(q){
	var alerts = $('#registerModal .alerts');
	$.post('api/register.php', q, function(data){
		alerts.empty();
		switch (data.state){
			case 0: alerts.append(templateAlert("<b>You have been registered</b>, please sign in now.", "success")); break;
			case 1: alerts.append(templateAlert("<b>Please fill in all fields.</b>", "danger")); break;
			case 2: alerts.append(templateAlert("<b>Invalid login format</b>, login should be 3-15 alphanumeric characters.", "danger")); break;
			case 3: alerts.append(templateAlert("<b>Invalid password format</b>, password should be at least 6 characters.", "danger")); break;
			case 4: alerts.append(templateAlert("<b>Your passwords do not match.</b>", "danger")); break;
			case 5: alerts.append(templateAlert("<b>There already is an user with this username.</b>", "danger")); break;
			default: alerts.append(templateAlert("<b>There was an error</b>, please try again.", "danger"));
		}
	}, "json").fail(function(){
		alerts.empty().append(templateAlert("<b>There was an error</b>, please try again.", "danger"));
	});
}