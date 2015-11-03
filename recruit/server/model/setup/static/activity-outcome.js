Meteor.startup(function() {
    ActivityOutcomes.remove({});
	if (ActivityOutcomes.find().count() === 0) {
		var outcomes = [
            {id: 1, name: 'POSITIVO'},
            {id: 2, name: 'DA RICHIAMARE'},
            {id: 3, name: 'NEGATIVO'},
            {id: 4, name: 'NON RISPONDE'},
            {id: 4, name: 'MOLTO INTERESSATO'},
            {id: 5, name: 'RICHIAMA LUI'},
        ];
		outcomes.forEach(function(outcome) {
			console.log("inserting activity outcome:", outcome);
			ActivityOutcomes.insert(outcome);
		});
	}
});