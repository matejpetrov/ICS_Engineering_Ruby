

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


jQuery(document).ready(function() { 

	$("#btn-verify-old-password").on("click", function(){


		var old_password = $('#old_password').val();
		var url = $('#verify_url').val();		

		$.ajax({

			url: url,
			type: 'POST',
			dataType: 'json',
			cache: 'false',
			data: {
				'password': old_password				
			},
			success: function(data){
				if(data.success == true){
					alert("verified");
					$("#btn-verify-old-password").parent().parent().children("div").removeClass("form-not-visible");
					$("#btn-verify-old-password").parent().addClass("form-not-visible");
				}	
				else{
					$("#btn-verify-old-password").html("Not Veryfied");					
					alert("not verified");
				}
			}

		});

	});

});

