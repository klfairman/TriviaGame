$(document).ready(function () {
	var options = [
		{
			question: "What is the name of the fictional city in which the original Halloween (1978) is set?", 
			choice: ["Haddonfield, IL", "Deerfield, IL", "Elmhurst, IL", "Lakeview,IL"],
			answer: 0,
			photo: "assets/images/Haddonfield.jpg",
		 },
		 {
			question: "The mask of Michael Myers is a modified version of a mask of which famous actor?", 
			choice: ["Burt Reynolds", "Sean Connery", "William Shatner", "Cary Grant"],
			answer: 2,
			photo: "assets/images/myersShatner.jpg"
		 }, 
		 {
			 question: "Camp Crystal Lake is the setting of which movie?", 
			choice: ["The Night of the Living Dead", "Friday the 13th", "Sleepaway Camp", "The Babadook" ],
			answer: 1,
			photo: "assets/images/Fridaythe13th.jpg"
		}, 
		{
			question: "Ridley Scott is the director of which horror/science fiction film?", 
			choice: ["Predator", "Alien", "The Thing", "The Blob" ],
			answer: 1,
			photo: "assets/images/alien.jpg"
		}, 
		{
			question: "What is the name of the hotel in The Shining?", 
			choice: ["Mountain Lodge", "Holiday Inn", "The Overlook", "The MGM Grand" ],
			answer: 2,
			photo: "assets/images/theShining.jpg"
		}, 
		{
			question: "Anthony Perkins portrayed Norman Bates in which famous Alfred Hitchcock film?", 
			choice: ["Psycho", "Marnie", "North by Northwest", "Vertigo"],
			answer: 0,
			photo: "assets/images/psycho.jpg"
		}, 
		{
			question: "What is the moniker of the killer in the Silence of the Lambs?", 
			choice: ["Buffalo Bill", "Wild Bill", "Billy the Butcher", "Hannibal Lector" ],
			answer: 0,
			photo: "assets/images/buffaloBill.jpg"
		}, 
		{
			question: "What was the original title of Scream?", 
			choice: ["Scary Movie", "Ghost Mask", "Stab", "High School Killers" ],
			answer: 0,
			photo: "assets/images/Scream.jpg"
		},
		{
			question: "What are the names of the priests portrayed by Max von Sydow and Jason Miller in William Peter Blatty’s/William Friedkin's the Exorcist?", 
			choice: ["Father Maskell and Father Robert", "Father McMahon and Father Charles", "Father Merrin and Father Karras", "Father James and Father Doherty" ],
			answer: 2,
			photo: "assets/images/theExorcist.jpg",  
		},
		
		{
			question: "The most profitable horror film of all time, based on ROI (Return on Investment), is which of the following?", 
			choice: ["Saw", "The Conjuring", "A Nightmare on Elm Street", "Paranormal Activity" ],
			answer: 3,
			photo: "assets/images/ParanormalActivity.jpg",
		}];
	
	var correctCount = 0;
	var wrongCount = 0;
	var unanswerCount = 0;
	var timer = 15;
	var intervalId;
	var userGuess ="";
	var running = false;
	var qCount = options.length;
	var pick;
	var index;
	var newArray = [];
	var holder = [];
	
	
	
	$("#reset").hide();
	//click start button to start game
	$("#start").on("click", function () {
			$("#start").hide();
			displayQuestion();
			runTimer();
			for(var i = 0; i < options.length; i++) {
		holder.push(options[i]);
	}
		})
	//timer start
	function runTimer(){
		if (!running) {
		intervalId = setInterval(decrement, 1000); 
		running = true;
		}
	}
	//timer countdown
	function decrement() {
		$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
		timer --;
	
		//stop timer if reach 0
		if (timer === 0) {
			unanswerCount++;
			stop();
			$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
			hidepicture();
		}	
	}
	
	//timer stop
	function stop() {
		running = false;
		clearInterval(intervalId);
	}
	//randomly pick question in array if not already shown
	//display question and loop though and display possible answers
	function displayQuestion() {
		//generate random index in array
		index = Math.floor(Math.random()*options.length);
		pick = options[index];
	
	//	if (pick.shown) {
	//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
	//		displayQuestion();
	//	} else {
	//		console.log(pick.question);
			//iterate through answer array and display
			$("#questionblock").html("<h2>" + pick.question + "</h2>");
			for(var i = 0; i < pick.choice.length; i++) {
				var userChoice = $("<div>");
				userChoice.addClass("answerchoice");
				userChoice.html(pick.choice[i]);
				//assign array position to it so can check answer
				userChoice.attr("data-guessvalue", i);
				$("#answerblock").append(userChoice);
	//		}
	}
	
	
	
	//click function to select answer and outcomes
	$(".answerchoice").on("click", function () {
		//grab array position from userGuess
		userGuess = parseInt($(this).attr("data-guessvalue"));
	
		//correct guess or wrong guess outcomes
		if (userGuess === pick.answer) {
			stop();
			correctCount++;
			userGuess="";
			$("#answerblock").html("<p>Correct!</p>");
			hidepicture();
	
		} else {
			stop();
			wrongCount++;
			userGuess="";
			$("#answerblock").html("<p>Incorrect! The correct answer is: " + pick.choice[pick.answer] + "</p>");
			hidepicture();
		}
	})
	}
	
	
	function hidepicture () {
		$("#answerblock").append("<img src=" + pick.photo + ">");
		newArray.push(pick);
		options.splice(index,1);
	
		var hidpic = setTimeout(function() {
			$("#answerblock").empty();
			timer= 10;
	
		//run the score screen if all questions answered
		if ((wrongCount + correctCount + unanswerCount) === qCount) {
			$("#questionblock").empty();
			$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
			$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
			$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
			$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
			$("#reset").show();
			correctCount = 0;
			wrongCount = 0;
			unanswerCount = 0;
	
		} else {
			runTimer();
			displayQuestion();
	
		}
		}, 5000);
	
	
	}
	
	$("#reset").on("click", function() {
		$("#reset").hide();
		$("#answerblock").empty();
		$("#questionblock").empty();
		for(var i = 0; i < holder.length; i++) {
			options.push(holder[i]);
		}
		runTimer();
		displayQuestion();
	
	})
	
	})
	