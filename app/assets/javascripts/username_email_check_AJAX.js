
jQuery(document).ready(function() { 


	$("#user_email").on("focusout", function(){


		//alert("Focus out email");

	});

	$("#user_username").on("focusout", function(){

		var url = $("#check_username_url").val();
		var username = $(this).val();		

		$.ajax({ 

			url: url,
			type: 'POST',
			dataType: 'json',
			cache: 'false',
			data: {
				'username': username
			},
			success: function(data){

				if(data.result == 'true'){
					$("#user_username").val(data.data);
				}
				else{
					$("#user_username").val(data.data);	
				}

			},

			error: function(data){

			}

		});

		//console.log("The url is " + username);

	});


});
