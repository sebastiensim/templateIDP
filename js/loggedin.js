$(document).ready(function(){
	getItems();
	notifyRequestStatus();
	
	$('body').on('click', '.item', function(e){
		e.preventDefault();
		showDetails($(this));
	});
	
	$('a[data-toggle="tab"]').on('hide.bs.tab', function(e){
		$($(e.target).attr('href')).find('.item_container.active').removeClass('active');
	});
	
	/* REQUESTS HANDLERS */
		$('#requestOpen').animatedModal({modalTarget: 'requestModal', animatedIn: 'bounceIn', animatedOut: 'bounceOut'});
		$('#requestModal form').submit(function(e){
			e.preventDefault();
			addRequest($(this).serialize());
		});
	/* REQUESTS HANDLERS */
	
	/* SEARCHBOX HANDLERS */
		$('#search_container form input').on('input', function(){searchItems($(this).parents('form').serialize());});
		$('#search_container form').submit(function(e){e.preventDefault(); searchItems($(this).parents('form').serialize());});
	/* SEARCHBOX HANDLERS */
});

function searchItems(q){
	var form = $('#search_container form');
	var container = $('#search_container .item_list');
	var alerts = $('#search_container .alerts');
	var request_link = $('#search_container #requestOpen');
	container.find('.item_container').removeClass('active');
	if (q != 'q='){
		form.addClass('selected');
		$.post('api/searchItems.php', q, function(data){
			container.empty();
			alerts.empty();
			if (data.length > 0){
				$.each(data, function(k,v){
					$(templateItem(v)).appendTo(container).hide().fadeIn(500).css("display", "inline-block");
				});
			} else {
				$(templateAlert("<b>We are sorry but nothing was found.</b>", "info")).appendTo(alerts).fadeIn(500);
			}
		}, "json").fail(function(){
			container.empty();
			$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).fadeIn(500);
		});
	} else {
		container.empty();
		alerts.empty();
		form.removeClass('selected');
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
		if (data.state == 0){
			$(templateAlert("<b>Your request has been submitted.</b>", "success")).appendTo(alerts).fadeIn(500);
			$('#requestModal form textarea').value('');
		} else {
			$(templateAlert("<b>There was an error</b>, please try again.", "danger")).appendTo(alerts).fadeIn(500);
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
				content = '<div data-reqid="' + v.Id + '">Request was denied: "' + v.Request + '"</div>';
			}
			else if (v.State == 1){
				type = 'success';
				content = '<div data-reqid="' + v.Id + '">Request was accepted: "' + v.Request + '"</div>';
			}
			noty({
				layout: 'topRight',
				text: content,
				type: type,
				animation: {
					open: 'animated fadeInRight', // Animate.css class names
					close: 'animated fadeOutLeft', // Animate.css class names
					easing: 'swing', // unavailable - no need
					speed: 500 // unavailable - no need
				},
				callback: {
					afterClose: function(){
						removeRequest($($(this)[0].$message).find('[data-reqid]').data('reqid'));
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