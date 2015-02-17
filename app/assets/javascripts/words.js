

$(document).ready(function() {
	
	$('#modalDeleteWords').on('show.bs.modal', function (event) {

		//$("#modalDeleteWords").find(".modal-body").html('');

		var clicked_btn = event.relatedTarget;

		//english words
		if(clicked_btn.id == "delete-en-word"){

			if($(".word-list-en :checked").length > 0){
				$("#modalDeleteWords").find(".modal-body").append('<p>Are you sure you want to delete the selected words?</p>');
				$("#modalDeleteWords").find(".modal-body").append('<p>This operation is not reversable...</p>');
				$("#delete-words-confirm").prop("disabled", false);
				$("#delete_lang").val("en");
			}
			else{
				$("#modalDeleteWords").find(".modal-body").append('<p>Please select a word(s) to delete</p>');
				$("#delete-words-confirm").prop("disabled", true);
			}
						
			console.log("English words");
			//console.log("The selected words are " + $(".word-list-en :checked").next("label").text());
		}		

		//macedonian words
		else{			

			if($(".word-list-mk :checked").length > 0){					

				$("#modalDeleteWords").find(".modal-body").append('<p>Are you sure you want to delete the selected words?</p>');
				$("#modalDeleteWords").find(".modal-body").append('<p>This operation is not reversable...</p>');
				$("#delete-words-confirm").prop("disabled", false);
				$("#delete_lang").val("mk");

				
			}
			else{
				$("#modalDeleteWords").find(".modal-body").append('<p>Please select a word(s) to delete</p>');
				$("#delete-words-confirm").prop("disabled", true);
			}

			console.log("Macedonian words");			
		}

		console.log($("#delete_lang").val());
		

	});

	$('#modalDeleteWords').on('hide.bs.modal', function (event) {

		$("#modalDeleteWords").find(".modal-body").html('');

	});



	//depending on the clicked button, give value to the 
	$('#modalAddWords').on('show.bs.modal', function (event) {

		var clicked_btn = event.relatedTarget;

		//adding ENGLISH words
		if(clicked_btn.id == "add-en-word"){
			$("#words_lang").val("en");
		}

		//adding MACEDONIAN words
		else{
			$("#words_lang").val("mk");
		}


	});

	$('#modalAddWords').on('hide.bs.modal', function (event) {
		$("#modalAddWords").find(".modal-body").children('textarea#new-words').val('');
	});


	$("#add-words-confirm").on("click", function(){

		var content = $("textarea#new-words").val();
		var words = content.split("\n");

		var url = $("input#add_words_url").val();

		var lang = $("#words_lang").val();

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			cache: 'false',
			data: {
				words: words,
				lang: lang
			}
		})
		.done(function(data) {
			
			if(data.result == true){
				
				var content = data.content;

				if(data.lang == 0){
					
					$(".word-list-en").html("");

					for(var i=0;i<content.length;i++){												
						li_begin = "<li id='"+ content[i].id +"'>";
							input = "<input type='checkbox' class='en_word_selection[]' value='" + content[i].id  + "' />";
							label = "<label>" + content[i].word_name + "</label>";
						li_end = "</li>";

						$(".word-list-en").append(li_begin + input + label + li_end);
					}

				}
				else{
					$(".word-list-mk").html("");

					for(var i=0;i<content.length;i++){												
						li_begin = "<li id='"+ content[i].id +"'>";
							input = "<input type='checkbox' class='en_word_selection[]' value='" + content[i].id  + "' />";
							label = "<label>" + content[i].word_name + "</label>";
						li_end = "</li>";

						$(".word-list-mk").append(li_begin + input + label + li_end);
					}
				}

			}
			else{

			}

		})
		.fail(function() {
			console.log("error");
		});
		

		console.log("New words: " + words);

	});

	$("#delete-words-confirm").on("click", function(){

		var content = [];
		var lang = $("#delete_lang").val();
		var url = $("input#delete_words_url").val();

		//English words delete
		if(lang == "en"){

			$(".word-list-en :checked").each(function(){
				content.push($(this).val());
				$(this).addClass('toDelete');
			});

		}

		//Macedonian words delete
		else{			

			$(".word-list-mk :checked").each(function(){
				content.push($(this).val());
				$(this).addClass('toDelete');				
			});			

		}


		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			cache: false,
			data: {
				words: content				
			}
		})
		.done(function(data) {

			$("#modalDeleteWords").modal('hide');
			
			if(data.result == true){

				if(lang == "en"){
					
					for(var i=0;i<content.length;i++){																		
						$(".word-list-en").find(".toDelete").parent().remove();																	
					}					
				}

				else{

					for(var i=0;i<content.length;i++){
						$(".word-list-mk").find(".toDelete").parent().remove();
					}
				}								

			}

			else{
				console.log("not deleted successfully");
			}


		})
		.fail(function() {
			console.log("error");
		});
		
	});


	$("#check-all-en").on("click", function(){

		$(".word-list-en").find(".word_checkbox").each(function(){
			$(this).attr("checked", true);
		});

	});

	$("#uncheck-all-en").on("click", function(){

		$(".word-list-en").find(".word_checkbox").each(function(){
			$(this).attr("checked", false);
		});

	});

	$("#check-all-mk").on("click", function(){

		$(".word-list-mk").find(".word_checkbox").each(function(){
			$(this).attr("checked", true);
		});

	});

	$("#uncheck-all-mk").on("click", function(){

		$(".word-list-mk").find(".word_checkbox").each(function(){
			$(this).attr("checked", false);
		});

	});

	


});