Meteor.startup(function() {
  if (Statuses.find().count() === 0) {
    var statuses = [
      {id: 0, name: 'unassigned'},
      {id: 1, name: 'pending'},
      {id: 2, name: 'rejected'},
      {id: 3, name: 'ok'},
    ];
    statuses.forEach(function(status) {
      Statuses.insert(status);
    });
  }
});
