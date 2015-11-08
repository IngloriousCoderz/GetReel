Meteor.startup(function() {
  Selectors.remove({});

  if (Selectors.find().count() === 0) {
    var selectors = [
      {name: 'MARCO M.'},
      {name: 'STEFANIA C.'},
      {name: 'MICHELA M.'},
      {name: 'Federica Gualtieri'},
    ];

    selectors.forEach(function(selector) {
      Selectors.insert(selector);
    });

    console.log('added', Selectors.find().count(), 'selectors.');
  }
});
