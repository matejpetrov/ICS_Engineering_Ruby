

function ajax_tryout(){	

	var ajax_url = $("#hidden_url").val();
	var data_to_send = $(".data_to_send").html();

	$.ajax({

		url: ajax_url,
		type: 'post',
		dataType: 'json',
		data: {
			'data_to_send': data_to_send
		},

		success: function(data){		
			
			console.log(data);
			if(data){
				$(".DOM_to_append").append("<p>" + data.back + "</p>");
			}
			else {
				$(".DOM_to_append").html("Success with no data");	
			}

		},
		error: function(){
			$('.DOM_to_append').html('There was an error');
		}


	});

	console.log(ajax_url);

	//alert("AJAX " + ajax_url);

}