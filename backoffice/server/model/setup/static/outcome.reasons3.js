Meteor.startup(function() {
  OutcomeReasons3.remove({});

  if (OutcomeReasons3.find().count() === 0) {
    var reasons = [
        {id:  1, name: 'POSITIVO'},
        {id:  2, name: 'NEGATIVO'},
        {id:  3, name: 'RISERVA'},
        {id:  4, name: 'POSITIVO RINUNCIA'},
        {id:  4, name: 'BLACKLIST'},
    ];

    reasons.forEach(function(reason) {
      OutcomeReasons3.insert(reason);
    });

    console.log('added', OutcomeReasons3.find().count(), 'outcome reasons for phase 3.');
  }
});
