Meteor.startup(function() {
  RoleEvaluations.remove({});

  if (RoleEvaluations.find().count() === 0) {
    var evaluations = [
      {id: 1, name: 'NEGATIVO'},
      {id: 2, name: 'SUFFICIENTE'},
      {id: 3, name: 'BUONO'},
      {id: 4, name: 'DISCRETO'},
    ];

    evaluations.forEach(function(evaluation) {
      RoleEvaluations.insert(evaluation);
    });

    console.log('added', RoleEvaluations.find().count(), 'role evaluations.');
  }
});
