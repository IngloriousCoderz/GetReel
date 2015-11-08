Meteor.startup(function() {
  OutcomeReasons.remove({});

  if (OutcomeReasons.find().count() === 0) {
    var reasons = [
      {id: 1, name: 'CV NEGATIVO'},
      {id: 2, name: 'FOTO NEGATIVA'},
      {id: 3, name: 'TELEFONATA NEGATIVA'},
      {id: 4, name: 'INTROVABILE'},
      {id: 5, name: 'INTERESSE ALTO'},
      {id: 6, name: 'INTERESSE SUFFIC.'},
      {id: 7, name: 'FUORI ETA\' NO ESP.'},
      {id: 8, name: 'CV POSITIVO DA TEL'},
      {id: 9, name: 'RICHIAMA LUI SE INT.'},
      {id: 10, name: 'POCA DISPONIBILITA\''},
      {id: 11, name: 'BLACK LIST'},
    ];

    reasons.forEach(function(reason) {
      OutcomeReasons.insert(reason);
    });

    console.log('added', OutcomeReasons.find().count(), 'outcome reasons for phase 1.');
  }
});
