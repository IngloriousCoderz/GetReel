Meteor.startup(function() {
  Stages.remove({});

  if (Stages.find().count() === 0) {
    var stages = [
      {id: 0, name: 'unassigned'},
      {id: 1, name: 'stage 1'},
      {id: 2, name: 'stage 2'},
      {id: 3, name: 'stage 3'},
      {id: 4, name: 'rejected'},
      {id: 5, name: 'approved'},
    ];

    stages.forEach(function(stage) {
      Stages.insert(stage);
    });

    console.log('added', Stages.find().count(), 'stages.');
  }
});
