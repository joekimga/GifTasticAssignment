//array of buttons After Gene Helped me
		var topics = ["Fat Bastard", "Dave Chappell", "Bill Clinton", "Milton", "Scooby Doo", "Homer Simpson", "Sir Mix a Lot", "Giorgio Tsoukalos", "Marie Antoinette", "ET", "Shaggy"];






		//Event for buttons
		$("document").on("click", "button", function() {
			//this refers to button
			var person = $(this).attr("data-person");

			//URL for Giphy, search quote
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";

			//ajax get request
			$.ajax({
				url: queryURL,
				method: "GET"
			})

			//after data is returned form api
			.done(function(response) {
				//storying array in results varible
				var results = response.data;
				console.log(results);

			//  

				//for loop
				for (var i = 0; i < results.length; i++) {

					//only post photos with appropriate rating
					//buttons do not work when using g andpg
					if (results[i].rating !== "pg-13" && results[i].rating !=="r") {

						//create div with class item
						var gifDiv = $("<div class='item'>");

						//store result rating
						var rating = results[i].rating;

						//create paragraph with the result item's rating
						var p = $("<p>").text("Rating: " + rating);


						//create image tag
						var personImage = $("<img>");

						//image tag src attribute from result item
						personImage.attr("src", results[i].images.fixed_height.url);

						// Adding still/animate
						personImage.attr("data-still", results[i].images.fixed_height_still.url);
          				personImage.attr("data-animate", results[i].images.fixed_height.url);
          				personImage.attr("data-state", "still");


				
						//append the paragraph and personImage to "gifDiv"
						gifDiv.append(p);
						gifDiv.append(personImage);

						//Prepend gifDIv to the "#gifs-go-here"
						$("#gifs-go-here").prepend(gifDiv);


						///////pause gif///////
						$(personImage).on("click", function() {
							//attr jquery method set salue of attribute on html
							var state = $(this).attr("data-state");

							if (state === "still") {
								$(this).attr("src", $(this).attr("data-animate"));
								$(this).attr("data-state", "animate");
							} else {
								$(this).attr("src", $(this).attr("data-still"));
								$(this).attr("data-state", "still");
							}
						});
					} 
				}
			});



		});

/* This is where Gene Helped me*/
function renderButtons() { 
	$("#buttons-view").empty();
	for (var i = 0; i<topics.length; i++) {
		var newButton = $("<button>");
		newButton.text(topics[i]);
		newButton.addClass("newButtonClass");
		newButton.attr("data-person", topics[i]);
		$("#buttons-view").append(newButton);
	};
};

		// This function handles events where a person button is clicked
		//pushes user input to array and makes button for the new item in array
		
	      $("#add-person").on("click", function(event) {
	        event.preventDefault();
	        // This line grabs the input from the textbox
	        var person = $("#person-input").val().trim();

	        // Adding person from the textbox to our array
	        topics.push(person);
	        console.log(topics);
	        $("#person-input").val("");

	        // Calling renderButtons which handles the processing of our person array
	        renderButtons();
	        displayImages();
	      });
	



		//Ready this on the DOM
		$(document).ready(function() {
			//remakeButtons();
 			renderButtons();
  			displayImages();

		});


      // Adding a click event listener to all elements with a class of "person"
      //$(document).on("click", ".person", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      //renderButtons();





     // <div >
       // <input id="add-people" type="submit">
     // </div>

//add new people to array
function remakeButtons() {
	event.preventDafault();

	//get text from input box
	var people = $("#inputDefault").val().trim();

	//input is pushed to the top
	topics.push(people);
	console.log(topics);
	$("#inputDefault").val("");

	//call function to display gifs when pushing buttons
	renderButtons();
	displayImages();

};

//};



	//adding person button does not work
   // <form id="people-form">
     // <label for="people-input">Add a Person</label>
     // <input type="text" id="people-input"><br>

   
     // <input id="add-people" type="submit" value="Add a Person">
   // </form>


	
