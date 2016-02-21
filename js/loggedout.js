$(document).ready(function(){
	getItems();
	
	$('.item').click(function(e){
		e.preventDefault();
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
		$('#searchOpen').animatedModal({modalTarget: 'searchModal', animatedIn: 'bounceIn'});
		$('#searchModal form input').on('input', function(){searchItems($(this).parents('form').serialize());});
		$('#searchModal form').submit(function(e){e.preventDefault();});
	/* SEARCHBOX HANDLERS */
});

function searchItems(q){
	var container = $('#searchModal .item_list');
	var alerts = $('#searchModal .alerts');
	if (q != 'q='){
		$.post('api/searchItems.php', q, function(data){
			container.empty();
			alerts.empty();
			if (data.length > 0){
				$.each(data, function(k,v){
					$(templateItem(v)).appendTo(container).hide().fadeIn(500).css("display", "inline-block");
				});
			} else {
				alerts.append(templateAlert("<b>We are sorry but nothing was found.</b>", "info"));
			}
		}, "json").fail(function(){
			container.empty();
			alerts.append(templateAlert("<b>There was an error</b>, please try again.", "danger"));
		});
	} else {
		container.empty();
		alerts.empty();
	}
}

function getItems(){
	$.post('api/getItems.php', function(data){
		$.each(data, function(k,v){
			var container = $('[data-cid=' + v.Category + '] .item_list');
			if (container.length > 0){
				$(templateItem(v)).appendTo(container).hide().fadeIn(500).css("display","inline-block");
			}
		});
		$('[data-cid] .item_list:empty').append(templateAlert("<b>No items to show in this category</b>", "info"));
	}, "json");
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