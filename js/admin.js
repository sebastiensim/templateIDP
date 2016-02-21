$(document).ready(function(){
	getItems();

	$('.item').click(function(e){
		e.preventDefault();
	});
	
	/* ITEM ADMINISTRATION HANDLERS */
		$('#addItemOpen').animatedModal({modalTarget: 'addItemModal', animatedIn: 'lightSpeedIn', animatedOut: 'lightSpeedOut'});
		$('#addItemModal form').submit(function(e){
			e.preventDefault();
			var submit = $(this).find('button[type=submit]');
			addItem($(this).serialize() + '&' + encodeURI(submit.attr('name')) + '=' + encodeURI(submit.text()));
		});
	/* ITEM ADMINISTRATION HANDLERS */
	
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
					$(templateItem(v,true)).appendTo(container).hide().fadeIn(500).css("display", "inline-block");
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

function addItem(q){
	console.log(q);
	var alerts = $('#addItemModal .alerts');
	$.post('api/admin/addItem.php', q, function(data){
		alerts.empty();
		switch (data.state){
			case 0: alerts.append(templateAlert("<b>You have successfully added new item.</b>", "success")); $('#addItemModal form').find("input, textarea").val(""); break;
			case 1: alerts.append(templateAlert("<b>Please fill in all fields.</b>", "danger")); break;
			case 2: alerts.append(templateAlert("<b>Invalid cost specified</b>. Cost must be in range of 0-999.99", "danger")); break;
			case 3: alerts.append(templateAlert("<b>Invalid category specified</b>. Please select a proper category", "danger")); break;
			default: alerts.append(templateAlert("<b>There was an error</b>, please try again.", "danger"));
		}
	}, "json").fail(function(){
		alerts.empty().append(templateAlert("<b>There was an error</b>, please try again.", "danger"));
	});
}