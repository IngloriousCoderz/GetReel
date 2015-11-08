Meteor.startup(function() {
  ActivityOutcomes.remove({});

  if (ActivityOutcomes.find().count() === 0) {
    var outcomes = [
      {id: 1, name: 'POSITIVO'},
      {id: 2, name: 'DA RICHIAMARE'},
      {id: 3, name: 'NEGATIVO'},
      {id: 4, name: 'NON RISPONDE'},
      {id: 5, name: 'MOLTO INTERESSATO'},
      {id: 6, name: 'RICHIAMA LUI'},
    ];

    outcomes.forEach(function(outcome) {
      ActivityOutcomes.insert(outcome);
    });

    console.log('added', ActivityOutcomes.find().count(), 'activity outcomes.');
  }
});
