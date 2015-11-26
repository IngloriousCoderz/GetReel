Meteor.startup(function() {
  OutcomeReasons.remove({});

  if (OutcomeReasons.find().count() === 0) {
    var reasons = [
      {id:  1, stage: 1, name: 'CV NEGATIVO'},
      {id:  2, stage: 1, name: 'FOTO NEGATIVA'},
      {id:  3, stage: 1, name: 'TELEFONATA NEGATIVA'},
      {id:  4, stage: 1, name: 'INTROVABILE'},
      {id:  5, stage: 1, name: 'INTERESSE ALTO'},
      {id:  6, stage: 1, name: 'INTERESSE SUFFIC.'},
      {id:  7, stage: 1, name: 'FUORI ETA\' NO ESP.'},
      {id:  8, stage: 1, name: 'CV POSITIVO DA TEL'},
      {id:  9, stage: 1, name: 'RICHIAMA LUI SE INT.'},
      {id: 10, stage: 1, name: 'POCA DISPONIBILITA\''},
      {id: 11, stage: 1, name: 'BLACK LIST'},

      {id:  1, stage: 2, name: 'COLLOQUIO POSITIVO'},
      {id:  2, stage: 2, name: 'COLLOQUIO NEGATIVO'},
      {id:  3, stage: 2, name: 'COLLOQUIO DA FISSARE'},
      {id:  4, stage: 2, name: 'COLLOQUIO FISSATO'},
      {id:  5, stage: 2, name: 'COLLOQUIO NON PRESENTATO'},
      {id:  6, stage: 2, name: 'INTERESSE SUFFIC.'},
      {id:  7, stage: 2, name: 'BLACK LIST'},

      {id:  1, stage: 3, name: 'POSITIVO'},
      {id:  2, stage: 3, name: 'NEGATIVO'},
      {id:  3, stage: 3, name: 'RISERVA'},
      {id:  4, stage: 3, name: 'POSITIVO RINUNCIA'},
      {id:  5, stage: 3, name: 'BLACKLIST'},
    ];

    reasons.forEach(function(reason) {
      OutcomeReasons.insert(reason);
    });

    console.log('added', OutcomeReasons.find().count(), 'outcome reasons for stages 1 to 3.');
  }
});
