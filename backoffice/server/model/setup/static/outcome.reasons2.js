Meteor.startup(function() {
  OutcomeReasons2.remove({});

  if (OutcomeReasons2.find().count() === 0) {
    var reasons = [
      {id: 1, name: 'COLLOQUIO POSITIVO'},
      {id: 2, name: 'COLLOQUIO NEGATIVO'},
      {id: 3, name: 'COLLOQUIO DA FISSARE'},
      {id: 4, name: 'COLLOQUIO FISSATO'},
      {id: 5, name: 'COLLOQUIO NON PRESENTATO'},
      {id: 6, name: 'INTERESSE SUFFIC.'},
      {id: 7, name: 'BLACK LIST'},
    ];

    reasons.forEach(function(reason) {
      OutcomeReasons2.insert(reason);
    });

    console.log('added', OutcomeReasons2.find().count(), 'outcome reasons for phase 2.');
  }
});
