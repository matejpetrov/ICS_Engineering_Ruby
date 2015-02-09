

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

	var element = $("div#error_explanation").length;
	
	if(element > 0){

		$("div#verification-form").addClass('form-not-visible');

	}
	else {
		$("div#edit-form").addClass('form-not-visible');
	}

	
	$("#btn-verify-old-password").on("click", function(){


		var old_password = $('#old_password').val();
		var url = $('#verify_url').val();	

		$("#password-notification").removeClass().addClass('fa fa-spinner fa-spin');

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
					$("#btn-verify-old-password").parent().parent().children("div").removeClass("form-not-visible");
					$("#btn-verify-old-password").parent().addClass("form-not-visible");
				}	
				else{
					$("#password-notification").removeClass('fa-spinner fa-spin').addClass('fa-times-circle');
					$("#old_password").parent().addClass('has-error');
					$("#inputPasswordWarning").removeClass('sr-only');
					$("#inputPasswordWarning").html("this password is not valid");
				}
			}

		});

	});


	//ajax call to the server to check the email and send message to that address if the address is right
	//or give notice that it's wrong... 
	$("#btn-submit-email").on("click", function(){

		var url = $("#email_submit_url").val();
		var email = $("#email").val();
				
		$.ajax({

			url: url,
			type: 'POST',
			dataType: 'json',
			cache: 'false',
			data: {
				'email': email				
			},
			success: function(data){
				if(data.success == true){					
					$("#information-message").removeClass().addClass('alert alert-success');
					$("#information-message").html("An email was sent to your address");
					$("#email").val("");
				}	
				else{
					$(".has-feedback").addClass('has-error');
					$(".has-feedback").children("span.form-control-feedback").children("i").addClass('fa-times-circle');
					$("#information-message").removeClass().addClass('alert alert-danger');
					$("#information-message").html("Your email is not valid");
				}
			}

		});

	});

});

