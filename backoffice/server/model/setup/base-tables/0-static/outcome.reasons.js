Meteor.startup(function() {
  OutcomeReasons.remove({});

  if (OutcomeReasons.find().count() === 0) {
    var reasons = [
      {id:  1, phase: 1, name: 'CV NEGATIVO'},
      {id:  2, phase: 1, name: 'FOTO NEGATIVA'},
      {id:  3, phase: 1, name: 'TELEFONATA NEGATIVA'},
      {id:  4, phase: 1, name: 'INTROVABILE'},
      {id:  5, phase: 1, name: 'INTERESSE ALTO'},
      {id:  6, phase: 1, name: 'INTERESSE SUFFIC.'},
      {id:  7, phase: 1, name: 'FUORI ETA\' NO ESP.'},
      {id:  8, phase: 1, name: 'CV POSITIVO DA TEL'},
      {id:  9, phase: 1, name: 'RICHIAMA LUI SE INT.'},
      {id: 10, phase: 1, name: 'POCA DISPONIBILITA\''},
      {id: 11, phase: 1, name: 'BLACK LIST'},

      {id:  1, phase: 2, name: 'COLLOQUIO POSITIVO'},
      {id:  2, phase: 2, name: 'COLLOQUIO NEGATIVO'},
      {id:  3, phase: 2, name: 'COLLOQUIO DA FISSARE'},
      {id:  4, phase: 2, name: 'COLLOQUIO FISSATO'},
      {id:  5, phase: 2, name: 'COLLOQUIO NON PRESENTATO'},
      {id:  6, phase: 2, name: 'INTERESSE SUFFIC.'},
      {id:  7, phase: 2, name: 'BLACK LIST'},
      
      {id:  1, phase: 3, name: 'POSITIVO'},
      {id:  2, phase: 3, name: 'NEGATIVO'},
      {id:  3, phase: 3, name: 'RISERVA'},
      {id:  4, phase: 3, name: 'POSITIVO RINUNCIA'},
      {id:  5, phase: 3, name: 'BLACKLIST'},
    ];

    reasons.forEach(function(reason) {
      OutcomeReasons.insert(reason);
    });

    console.log('added', OutcomeReasons.find().count(), 'outcome reasons for phase 1,2,3.');
  }
});
