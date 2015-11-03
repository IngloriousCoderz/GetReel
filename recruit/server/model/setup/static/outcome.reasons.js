Meteor.startup(function() {
    OutcomeReasons.remove({});
	if (OutcomeReasons.find().count() === 0) {
		var reasons = [
            {id:  1, name: 'CV NEGATIVO'},
            {id:  2, name: 'FOTO NEGATIVA'},
            {id:  3, name: 'TELEFONATA NEGATIVA'},
            {id:  4, name: 'INTROVABILE'},
            {id:  4, name: 'INTERESSE ALTO'},
            {id:  5, name: 'INTERESSE SUFFIC.'},
            {id:  6, name: 'FUORI ETA\' NO ESP.'},
            {id:  7, name: 'CV POSITIVO DA TEL'},
            {id:  8, name: 'RICHIAMA LUI SE INT.'},
            {id:  9, name: 'POCA DISPONIBILITA\''},
            {id: 10, name: 'BLACK LIST'},
        ];
        console.log("adding ", reasons.length, "outcome reasons...");
		reasons.forEach(function(reason) {
			OutcomeReasons.insert(reason);
		});
        console.log("added ", OutcomeReasons.find().count(), "outcome reasons.");
	}
});
