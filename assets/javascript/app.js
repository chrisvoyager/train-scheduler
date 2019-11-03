$(document).ready(function() {

  var firebaseConfig = {
    apiKey: "AIzaSyBC91hADOjVfE3HsHuTZdzAXESlP1nYTko",
    authDomain: "train-scheduler-51e7b.firebaseapp.com",
    databaseURL: "https://train-scheduler-51e7b.firebaseio.com",
    projectId: "train-scheduler-51e7b",
    storageBucket: "train-scheduler-51e7b.appspot.com",
    messagingSenderId: "447446879263",
    appId: "1:447446879263:web:457606b21c493cce51592a",
    measurementId: "G-HE52MHLD5M"
  };

  firebase.initializeApp(firebaseConfig);

 
  var database = firebase.database();
   
  $("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

	  var trainName = $("#train-name-input").val().trim();
	  var trainDest = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
      var trainFreq = $("#freq-input").val().trim();

	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };

  		database.ref().push(newTrain);


  		alert("Train successfully added");

	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;


  		var trainFreq;

   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

	    var tRemainder = diffTime % trainFreq;
	    console.log(tRemainder);

	    var tMinutesTillTrain = trainFreq - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

})