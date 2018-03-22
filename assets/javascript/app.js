//array of buttons
		var topics = ["Fat Bastard", "Dave Chappell", "Bill Clinton", "Milton", "Rose", "Homer Simpson", "Sir Mix a Lot", "Giorgio Tsoukalos", "Marie Antoinette", "ET", "Kim Jung Un"];



		//Event for buttons
		$("button").on("click", function() {
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


	