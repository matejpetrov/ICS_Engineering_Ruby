var url_username;
var url_email


jQuery(document).ready(function() { 

	url_username = $("#check_username_url").val();
	url_email = $("#check_email_url").val();


	$("#user_email").on("focusout", function(){
		
		var email = $(this).val();

		$("#email-notification").removeClass().addClass('fa fa-spinner fa-spin');

		if(email == "" || IsEmail(email) == false){

			$("#email-notification").removeClass('fa-spinner fa-spin').addClass('fa-times-circle');
			$("#user_email").parent().addClass('has-error');
			$("#inputEmailWarning").removeClass('sr-only');
			$("#inputEmailWarning").html("this email is not valid");	

		}
		else{
			
			$.ajax({ 

				url: url_email,
				type: 'POST',
				dataType: 'json',
				cache: 'false',
				data: {
					'email': email
				},

				beforeSend: function(){
					$("#user_email").parent().removeClass('has-success');
					$("#user_email").parent().removeClass('has-error');
				},
				success: function(data){

					if(data.result == 'true'){
						$("#email-notification").removeClass('fa-spinner fa-spin').addClass('fa-times-circle');
						$("#user_email").parent().addClass('has-error');
						$("#inputEmailWarning").removeClass('sr-only');
						$("#inputEmailWarning").html("this email is not valid");
						//$("#user_username").val(data.data);					
					}
					else{														
						//remove the spinner
						//add the has-success class to the parent div element
						//add the success icon to the span element
						//add appropriate value to the span element containing the message...
						$("#email-notification").removeClass('fa-spinner fa-spin').addClass('fa-check');
						$("#user_email").parent().addClass('has-success');
						$("#inputEmailWarning").removeClass('sr-only');
						$("#inputEmailWarning").html("your email is valid");

					}

				},

				error: function(data){

				}

			});
		}


	});

	$("#user_username").on("focusout", function(){
		
		var username = $(this).val();	

		//before i send the AJAX call i will put the spinning icon in the text field so that the user knows
		//something is happening in the background.
		$("#username-notification").removeClass().addClass('fa fa-spinner fa-spin');		

		if(username == ""){

			$("#username-notification").removeClass('fa-spinner fa-spin').addClass('fa-times-circle');
			$("#user_username").parent().addClass('has-error');
			$("#inputUsernameWarning").removeClass('sr-only');
			$("#inputUsernameWarning").html("this username is not valid");

		}

		else{

			$.ajax({ 

				url: url_username,
				type: 'POST',
				dataType: 'json',
				cache: 'false',
				data: {
					'username': username
				},

				beforeSend: function(){
					$("#user_username").parent().removeClass('has-success');
					$("#user_username").parent().removeClass('has-error');
				},
				success: function(data){

					if(data.result == 'true'){
						$("#username-notification").removeClass('fa-spinner fa-spin').addClass('fa-times-circle');
						$("#user_username").parent().addClass('has-error');
						$("#inputUsernameWarning").removeClass('sr-only');
						$("#inputUsernameWarning").html("this username is not valid");
						//$("#user_username").val(data.data);					
					}
					else{														
						//remove the spinner
						//add the has-success class to the parent div element
						//add the success icon to the span element
						//add appropriate value to the span element containing the message...
						$("#username-notification").removeClass('fa-spinner fa-spin').addClass('fa-check');
						$("#user_username").parent().addClass('has-success');
						$("#inputUsernameWarning").removeClass('sr-only');
						$("#inputUsernameWarning").html("your username is valid");

					}

				},

				error: function(data){

				}

			});

		}		

		//console.log("The url is " + username);

	});


});

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
