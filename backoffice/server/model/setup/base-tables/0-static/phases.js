Meteor.startup(function() {
  Phases.remove({});

  if (Phases.find().count() === 0) {
    var phases = [
      {id: 0, name: 'unassigned'},
      {id: 1, name: 'phase 1'},
      {id: 2, name: 'phase 2'},
      {id: 3, name: 'phase 3'},
      {id: 4, name: 'rejected'},
      {id: 5, name: 'approved'},
    ];

    phases.forEach(function(phase) {
      Phases.insert(phase);
    });

    console.log('added', Phases.find().count(), 'phases.');
  }
});
