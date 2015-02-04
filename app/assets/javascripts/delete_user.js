jQuery(document).ready(function() { 

	$("button#delete-user").on("click", function (){
		
		var url = $("input#hidden_url").val();

		var id = $(this).parent().parent().attr("id");

		var url_array = url.split("/");

		url_array[url_array.length - 1] = id;

		var new_url = url_array.join("/");

		$("input#hidden_url").val(new_url);		

		console.log("The url is " + new_url);

		$(this).parent().parent().addClass("toDelete");

	});





	$('#modalDelete').on('hidden.bs.modal', function (e) {
	    $(".table-row").removeClass("toDelete");
	});


	$('.modal-footer').on("click", "#delete-user-confirm", function(){

		//send AJAX call to the url in the hidden_url input and if it is successfully destroyed
		//find the row that has a toDelete class and remove it. 

		var url = $("input#hidden_url").val();

		$("#modalDelete").modal('hide');		

		
		$.ajax({

			url: url,
			type: 'DELETE',
			dataType: 'json',
			cache: 'false',

			success: function(data){
				console.log(data)

				if(data){
					$('.toDelete').fadeOut(1000, function() {
						$('.toDelete').remove();
					});	
				}				

			},

			error: function(data){
				alert("There was an error");
			}

		});
		return false;

	});


});

/*
$(function(){


});

function set_delete_id(event){

	var text = $(event).parent().parent().attr("id");

	$(event).parent().parent().addClass("toDelete")

	var classes = $(event).parent().parent().attr("class");

	console.log("The classes of the buttons are " + classes);

}


function delete_user(){

	$("#modalDelete").modal("hide");

}*/