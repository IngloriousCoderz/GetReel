Meteor.startup(function() {
  ContactTypes.remove({});

  if (ContactTypes.find().count() === 0) {
    var types = [
      {name: 'Telefonata'},
      {name: 'Segreteria telefonica'},
      {name: 'SMS inviato'},
      {name: 'Email'},
    ];

    types.forEach(function(type) {
      ContactTypes.insert(type);
    });

    console.log('added', ContactTypes.find().count(), 'contact types.');
  }
});
