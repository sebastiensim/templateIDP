$(document).ready(function(){
	getItems();
	
	$('body').on('click', '.item', function(e){
		e.preventDefault();
		showDetails($(this));
	});
	
	$('a[data-toggle="tab"]').on('hide.bs.tab', function(e){
		$($(e.target).attr('href')).find('.item_container.active').removeClass('active');
	});
	
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
		$('body').on('click', '.item [data-act="del"]', function(e){e.preventDefault(); deleteItem($(this));});
	/* ITEM ADMINISTRATION HANDLERS */
	
	/* SEARCHBOX HANDLERS */
		$('#search_container form input').on('input', function(){searchItems($(this).parents('form').serialize());});
		$('#search_container form').submit(function(e){e.preventDefault(); searchItems($(this).parents('form').serialize());});
	/* SEARCHBOX HANDLERS */
});

function searchItems(q){
	var form = $('#search_container form');
	var container = $('#search_container .item_list');
	var alerts = $('#search_container .alerts');
	container.find('.item_container').removeClass('active');
	if (q != 'q='){
		form.addClass('selected');
		$.post('api/searchItems.php', q, function(data){
			console.log(data);
			container.empty();
			alerts.empty();
			if (data.length > 0){
				$.each(data, function(k,v){
					$(templateItem(v, true)).appendTo(container).hide().fadeIn(500).css("display", "inline-block");
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
				$(templateItem(v, true)).appendTo(container).hide().fadeIn(500).css("display","inline-block");
			}
		});
		$(templateAlert("<b>No items to show in this category</b>", "info")).appendTo($('[data-cid] .item_list:empty')).hide().fadeIn(500);
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
	var container = $('.random_items [data-cid=' + $('#addItemModal form input[type=radio]:checked').val() + '] .item_list');
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
								console.log(e);
								container.find('.alerts').empty();
								if (container.find('.item_container').length == 0) container.empty();
								$(templateItem(e, true)).appendTo(container).hide().fadeIn(500).css("display", "inline-block");
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
		console.log(data);
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